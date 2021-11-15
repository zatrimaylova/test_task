import React from 'react';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
 
import { ProductCard } from '../ProductCard/ProductCard.js';
import { OutOfStockCard } from '../OutOfStockCard/OutOfStockCard.js';
import Loader from '../Loader/Loader.js';
import ShortAddingForm from '../ShortAddingForm/ShortAddingForm.js';
import OverlayBackground from '../OverlayBackground/OverlayBackground.js';
import CartListComponent from '../CartList/CartList.js';
import CartManaging from '../CartManaging/CartManaging.js';

import { Container, Title, ProductList } from './styles';

import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';
import { ACTION_USE_ADDING } from '../../ducks/cartListStatus';

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

class PLPEl extends React.Component {
  componentDidMount() {
    const { category } = this.props;
    document.title = `${category[0].toUpperCase() + category.slice(1)}`; 
  }

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
              ? <ProductCard data={item} prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                : <OutOfStockCard prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />
            return renderItem;
          })}
          { products && category.category !== 'all' && products.map((item) => {
            let renderItem;
            if (item.category === category.category) {
              renderItem = item.inStock 
              ? <ProductCard data={item} prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} /> 
                : <OutOfStockCard prices={item.prices} name={item.name} link={item.gallery[0]} key={item.name} />
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

const mapStateToProps = ({ category, isOverlayOpen, cartListStatus }) => ({
  category: category.category,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  adding: cartListStatus.adding,
  removing: cartListStatus.removing,
  amount: cartListStatus.amount,
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
  showAdding: (value) => dispatch(ACTION_USE_ADDING(value)),
});

const PLP = graphql(getListQuery)(PLPEl);

export default connect(mapStateToProps, mapDispatchToProps)(PLP);