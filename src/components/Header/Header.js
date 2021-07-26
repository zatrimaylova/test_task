import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import brandIcon from '../../img/Header/brand_icon.png';
import cartIcon from '../../img/Header/cart_icon.png';
import currencyIcon from '../../img/Header/currency_icon.png';

import { Container, Navigation, NavItem, BrandIcon, NavOptions, Currencies, CurrencyImg, CurrenciesList, Cart, CartCount } from './styles';

import { ACTION_CHANGE_CURRENCY } from '../../ducks/currency';
import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';



class HeaderEl extends React.Component {
  state = {
    isCurrencyClicked: false,
    currentCurrency: null,
  };

  showCurrencyClick = () => {
    this.setState(prevState => ({
      ...prevState,
      isCurrencyClicked: true,
    }));
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

  handleCategoryClick = (e) => {
    const { history, changeCategory } = this.props;
    const targetName = e.target.tagName.toLowerCase();
    if (targetName !== 'li') {
      return;
    }
    const newCategory = e.target.id;
    if (newCategory === 'all') {
      history.push(`/`);
      changeCategory(null);
    } else {
      history.push(`/${newCategory}`);
      changeCategory(newCategory);
    }
  }

  handleToCartClick = () => {
    const { history } = this.props;
    history.push(`/cart`);
  };

  componentDidMount() {
    const { currencies, changeCurrency } = this.props;
    changeCurrency(currencies[0]);
  };

  render() {
    const { isCurrencyClicked, currentCurrency } = this.state;
    const { showCurrencyClick, chooseCurrencyClick } = this;
    const { cart } = this.props;

    return(
      <Container>    
        <Navigation onClick={this.handleCategoryClick}>
          <NavItem id="all">All</NavItem>
          <NavItem id="tech">Tech</NavItem>
          <NavItem id="clothes">Clothes</NavItem>
        </Navigation>
        <BrandIcon src={brandIcon}></BrandIcon>
        <NavOptions>
          <Currencies onClick={showCurrencyClick} >
            <span>{this.props.currencies && (currentCurrency ?  currentCurrency : this.props.currencies[0])}</span>
            <CurrencyImg src={currencyIcon} alt="^" condition={isCurrencyClicked}/>
          </Currencies>
          <Cart onClick={this.handleToCartClick}>
            <img src={cartIcon} alt="Cart" />
            <CartCount cart={cart}><p>{cart.length}</p></CartCount>         
          </Cart>
          <CurrenciesList condition={isCurrencyClicked} > 
            {this.props.currencies && this.props.currencies.map(item => {
              return <li key={item} id={item} onClick={chooseCurrencyClick} >{item}</li>
            })}
          </CurrenciesList>
        </NavOptions>
      </Container>
    )
  };
}

const mapStateToProps = ({ currency, cart }) => ({
  currency: currency.currency,
  cart: cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (value) => dispatch(ACTION_CHANGE_CURRENCY(value)),
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
});

export const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderEl));