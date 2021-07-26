import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import ProductGallery from '../ProductGallery/ProductGallery';
import AddingToCartForm from '../AddingToCartForm/AddingToCartForm';
import Loader from '../Loader/Loader.js';

import { Container } from './style';

const getProductQuery = gql`
  query {
    category {
      products {
        name,
        gallery,
        prices {
          currency,
          amount,
        },
        attributes {
          id, name, type, items {
            displayValue, value, id
          },
        },
        description,
      }
    }
  }
`;

class PDPEl extends React.Component { 

  render() {
    const products = this.props?.data?.category?.products;
    const { product } = this.props;
    const { loading } = this.props?.data;

    return(
      <Container>
        { loading && <Loader /> }
        { products && 
          products.map((item, index) => {
            if (String(item.name).toUpperCase() === String(product).toUpperCase()) {
              return (
                <ProductGallery key={index} data={item.gallery} name={item.name} description={item.description}>
                  <AddingToCartForm {...this.props} />
                </ProductGallery>
              )
            }
          })
        }
      </Container>
    )
  }
}

const mapStateToProps = ({ product }) => ({
  product: product.product,
});

const PDP = graphql(getProductQuery)(PDPEl);

export const PDPComponent = connect(mapStateToProps)(PDP);