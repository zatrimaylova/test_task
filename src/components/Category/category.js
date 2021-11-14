import React from 'react';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
 
import { Minicart } from '../Minicart/Minicart.js';
import { OutOfStockCart } from '../OutOfStockCart/OutOfStockCart.js';
import Loader from '../Loader/Loader.js';
import ShortAddingForm from '../ShortAddingForm/ShortAddingForm.js';
import OverlayBackground from '../OverlayBackground/OverlayBackground.js';
import CartListComponent from '../CartList/CartList.js';
import CartManaging from '../CartManaging/CartManaging.js';

import { Container, Title, ProductList } from './styles';

import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';
import { ACTION_USE_ADDING } from '../../ducks/adding';

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
        attributes {
          id, name, type, items {
            displayValue, value, id
          }
        }
      }
    }
  }
`;

class CategoryComponent extends React.Component {
  render() {
    const category = this.props;
    const products = this.props?.data?.category?.products;
    const name = this.props?.data?.category?.name;
    const { loading } = this.props?.data;
    const { adding, removing, amount } = this.props;
    
    return (
      <Container>
        { loading && <Loader /> }
        { !loading && !category.category && <Title>{name[0].toUpperCase() + name.slice(1).toLowerCase()}</Title> }
        { !loading && category.category && <Title>{category.category[0].toUpperCase() + category.category.slice(1).toLowerCase()}</Title> }
        { !loading && <CartManaging /> }
        <ProductList>
          { products && category.category === 'all' && products.map((item) => {
            const renderItem = item.inStock 
              ? <Minicart data={item} prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                : <OutOfStockCart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />
            return renderItem;
          })}
          { products && category.category !== 'all' && products.map((item) => {
            let renderItem;
            if (item.category === category.category) {
              renderItem = item.inStock 
              ? <Minicart data={item} prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                : <OutOfStockCart prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />
            }
            return renderItem;
          })}
        </ProductList>
        { adding.isOpen && <OverlayBackground><ShortAddingForm /></OverlayBackground>}
        { removing.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
        { amount.isOpen && <OverlayBackground><CartListComponent /></OverlayBackground>}
      </Container>
    )
  }
};

const mapStateToProps = ({ category, isOverlayOpen, adding, removing, amount }) => ({
  category: category.category,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  adding: adding.adding,
  removing: removing.removing,
  amount: amount.amount,
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
  showAdding: (value) => dispatch(ACTION_USE_ADDING(value)),
});

const Category = graphql(getListQuery)(CategoryComponent);

export default connect(mapStateToProps, mapDispatchToProps)(Category);