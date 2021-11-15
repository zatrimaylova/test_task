import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import ProductGallery from '../ProductGallery/ProductGallery';
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
  componentDidMount() {
    const { product, history } = this.props;
    document.title = product;
    if (!product) history.goBack()
  }

  render() {
    const products = this.props?.data?.category?.products;
    const { product, removing, amount } = this.props;
    const { loading } = this.props?.data;

    return(
      <Container>
        { loading && <Loader /> }
        { !loading && <CartManaging /> }
        <div> 
          { products && 
            products.map((item, index) => {
              let galleryEl;
              if (String(item.name).toUpperCase() === String(product).toUpperCase()) {
                galleryEl = <ProductGallery key={index} {...item } products={products}></ProductGallery>
              }
              return galleryEl;
            })
          }
        </div>
        { removing.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
        { amount.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
      </Container>
    )
  }
}

const mapStateToProps = ({ product, cartListStatus }) => ({
  product: product.product,
  removing: cartListStatus.removing,
  amount: cartListStatus.amount,
});

const PDP = graphql(getProductQuery)(PDPEl);

export const PDPComponent = withRouter(connect(mapStateToProps)(PDP));