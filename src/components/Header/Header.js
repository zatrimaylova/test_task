import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import brandIcon from '../../img/Header/brand_icon.png';
import cartIcon from '../../img/Header/cart_icon.png';
import currencyIcon from '../../img/Header/currency_icon.png';

import { Container, Navigation, NavItem, BrandIcon, NavOptions, Currencies, CurrencyImg, CurrenciesList, Cart, CartCount } from './styles';

import { ACTION_CHANGE_CURRENCY } from '../../ducks/currency';
import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';
import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';

import CartOverlay from '../CartOverlay/CartOverlay.js';

class HeaderEl extends React.Component {
  state = {
    isCurrencyClicked: false,
    currentCurrency: null,
    //isOverlayOpen: false,
  };

  showCurrencyClick = () => {
    const { isCurrencyClicked } = this.state;
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

  handleCartClick = () => {
    const { isOverlayOpen, changeOverlayState } = this.props;

    isOverlayOpen ? changeOverlayState(false) : changeOverlayState(true);
    document.body.style.overflow = isOverlayOpen ? 'visible' : 'hidden';

    this.setState(prevState => ({
      ...prevState,
      isCurrencyClicked: false,
    }));
  };

  componentDidMount() {
    const { currencies, changeCurrency } = this.props;
    changeCurrency(currencies[0]);
  };

  render() {
    const { isCurrencyClicked, currentCurrency } = this.state;
    const { showCurrencyClick, chooseCurrencyClick } = this;
    const { cart, isOverlayOpen, currencies } = this.props;

    return(
      <header>
        <Container>
          <nav>    
            <Navigation onClick={this.handleCategoryClick} >
              <NavItem id="all">All</NavItem>
              <NavItem id="tech">Tech</NavItem>
              <NavItem id="clothes">Clothes</NavItem>
            </Navigation>
          </nav>
            <BrandIcon src={brandIcon}></BrandIcon>
            <NavOptions>
            <Currencies onClick={showCurrencyClick} >
              <span>{this.props.currencies && (currentCurrency ?  currentCurrency : this.props.currencies[0])}</span>
              <CurrencyImg src={currencyIcon} alt="^" condition={isCurrencyClicked}/>
            </Currencies>
            <Cart onClick={this.handleCartClick}>
              <img src={cartIcon} alt="Cart" />
              <CartCount cart={cart}><p>{cart.length}</p></CartCount>         
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

const mapStateToProps = ({ currency, cart, 
  isOverlayOpen 
}) => ({
  currency: currency.currency,
  cart: cart.cart,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (value) => dispatch(ACTION_CHANGE_CURRENCY(value)),
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
  changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
});

export const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderEl));