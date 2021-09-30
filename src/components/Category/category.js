import React from 'react';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
 
import { Minicart } from '../Minicart/minicart.js';
import { OutOfStockCart } from '../OutOfStockCart/OutOfStockCart.js';
import Loader from '../Loader/Loader.js';
import CartOverlay from '../CartOverlay/CartOverlay.js';

import { Container, Title, ProductList } from './styles';

import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';

const getListQuery = gql`
  query {
    category {
      name,
      products {
        name,
        gallery,
        inStock,
        prices {
          currency,
          amount
        },
        category,
      }
    }
  }
`;

class CategoryComponent extends React.Component {
  render() {
    const category = this.props;
    const { isOverlayOpen } = this.props;
    const products = this.props?.data?.category?.products;
    const name = this.props?.data?.category?.name;
    const { loading } = this.props?.data;
    console.log(isOverlayOpen)
    
    return (
      <Container>
        {/* { isOverlayOpen && <CartOverlay /> } */}
        { loading && <Loader /> }
        { !loading && !category.category && <Title>{name[0].toUpperCase() + name.slice(1).toLowerCase()}</Title> }
        { !loading && category.category && <Title>{category.category[0].toUpperCase() + category.category.slice(1).toLowerCase()}</Title> }
        <ProductList>
          {
            products && !category.category && products.map((item) => {
              const renderItem = item.inStock 
                ? <Minicart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                  : <OutOfStockCart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />

              return renderItem;
            })
          }

          {
            products && category.category && products.map((item) => {
              if (item.category !== category.category) {
                return;
              }

              const renderItem = item.inStock 
                ? <Minicart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                  : <OutOfStockCart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />

              return renderItem;
            })
          }
        </ProductList>
      </Container>
    )
  }
};

const mapStateToProps = ({ category, isOverlayOpen }) => ({
  category: category.category,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
});

const Category = graphql(getListQuery)(CategoryComponent);

export default connect(mapStateToProps, mapDispatchToProps)(Category);