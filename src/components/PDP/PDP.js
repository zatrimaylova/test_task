import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import ProductGallery from '../ProductGallery/ProductGallery';
import AddingToCartForm from '../AddingToCartForm/AddingToCartForm';
import Loader from '../Loader/Loader.js';
import CartManaging from '../CartManaging/CartManaging.js';
import OverlayBackground from '../OverlayBackground/OverlayBackground.js';
import CartListComponent from '../CartList/CartList.js';


import { Container } from './styles';

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
    const { product, removing, amount } = this.props;
    const { loading } = this.props?.data;

    return(
      <Container>
        { !loading && <CartManaging /> }
        <div> 
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
        </div>
        { removing.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
        { amount.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
      </Container>
    )
  }
}

const mapStateToProps = ({ product, removing, amount }) => ({
  product: product.product,
  removing: removing.removing,
  amount: amount.amount,
});

const PDP = graphql(getProductQuery)(PDPEl);

export const PDPComponent = connect(mapStateToProps)(PDP);