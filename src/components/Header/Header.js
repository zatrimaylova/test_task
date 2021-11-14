import React from 'react';
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import Navigation from '../Navigation/Navigation.js';

import brandIcon from '../../img/Header/brand_icon.png';
import cartIcon from '../../img/Header/cart_icon.png';
import currencyIcon from '../../img/Header/currency_icon.png';

import { Container, BrandIcon, NavOptions, Currencies, CurrencyImg, CurrenciesList, Cart, CartCount } from './styles';

import { ACTION_CHANGE_CURRENCY } from '../../ducks/currency';
import { ACTION_CHANGE_CATEGORY, ACTION_CREATE_CATEGORY_LIST } from '../../ducks/category';
import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';

import CartOverlay from '../CartOverlay/CartOverlay.js';

const getProductQuery = gql`
  query {
    category {
      name,
      products {
        category,
      }
    }
  }
`;

class HeaderComponent extends React.Component {
  state = {
    isCurrencyClicked: false,
    currentCurrency: null,
  };

  componentDidMount() {
    const { currencies, changeCurrency } = this.props;

    changeCurrency(currencies[0]);
  };

  createCategories = () => {
    const { createCategoryList } = this.props;
    const category = this.props?.data?.category;
    const categoriesArr = [];

    categoriesArr.push(category?.name);
    category?.products.forEach((item) => {
      if (categoriesArr.indexOf(item.category) === -1) categoriesArr.push(item.category);
    });

    createCategoryList(categoriesArr);
  }

  showCurrencyClick = () => {
    const { isCurrencyClicked } = this.state;
    const { isOverlayOpen } = this.props;
    
    if (isOverlayOpen) return;

    if (isCurrencyClicked) {
      this.setState(prevState => ({
        ...prevState,
        isCurrencyClicked: false,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        isCurrencyClicked: true,
      }));
    }
  };

  chooseCurrencyClick = (e) => {
    const { changeCurrency } = this.props;

    this.setState(prevState => ({
      ...prevState,
      isCurrencyClicked: false,
      currentCurrency: e.target.id,
    }));

    changeCurrency(e.target.id);
  };

  handleCartClick = () => {
    const { isOverlayOpen, changeOverlayState } = this.props;

    isOverlayOpen ? changeOverlayState(false) : changeOverlayState(true);
    document.body.style.overflow = isOverlayOpen ? 'visible' : 'hidden';

    this.setState(prevState => ({
      ...prevState,
      isCurrencyClicked: false,
    }));
  };

  render() {
    const { isCurrencyClicked, currentCurrency } = this.state;
    const { cart, isOverlayOpen, currencies, categories } = this.props;
    const category = this.props?.data?.category;
    const { loading } = this.props.data;

    return(
      <header>
        <Container>
            { !loading && category.name && !categories && this.createCategories() }
            <Navigation />
            <BrandIcon src={brandIcon}></BrandIcon>
            <NavOptions>
            <Currencies onClick={this.showCurrencyClick} >
              <span>{this.props.currencies && (currentCurrency ?  currentCurrency : this.props.currencies[0])}</span>
              <CurrencyImg src={currencyIcon} alt="^" condition={isCurrencyClicked}/>
            </Currencies>
            <Cart onClick={this.handleCartClick}>
              <img src={cartIcon} alt="Cart" />
              {cart.length > 0 && <CartCount cart={cart}><p>{cart.length >= 1 ? cart.length : ''}</p></CartCount>}
            </Cart>
            { isCurrencyClicked && <CurrenciesList onClick={this.chooseCurrencyClick}> 
              {currencies && currencies.map(item => {
                return <li key={item} id={item}>{item}</li> 
              })}
            </CurrenciesList>}
          </NavOptions>
        </Container>
         { isOverlayOpen && <CartOverlay /> } 
      </header>
    )
  };
}

const mapStateToProps = ({ cart, isOverlayOpen, category }) => ({
  cart: cart.cart,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (value) => dispatch(ACTION_CHANGE_CURRENCY(value)),
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
  changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
  createCategoryList: (value) => dispatch(ACTION_CREATE_CATEGORY_LIST(value)),
});

const HeaderEl = graphql(getProductQuery)(HeaderComponent);

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderEl);