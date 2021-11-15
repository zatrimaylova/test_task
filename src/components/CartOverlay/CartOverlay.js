import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import minus_image from '../../img/Overlay/minus_image.png';
import plus_image from '../../img/Overlay/plus_image.png'; 

import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';
import { ACTION_CHANGE_COUNT, ACTION_DELETE_PRODUCT } from '../../ducks/cart';

import {
  CartContainer,
  CartBody,
  CartTitle,
  OverlayListEl,
  ListItem,
  ProductInfoCont,
  OptionsList,
  ChangingInfo,
  CountCont,
  CountSpan,
  DecreaseImg,
  GalleryItem,
  TotalPriceCont,
  TextSpan,
  ButtonsContainer,
  ViewBagButton,
  CheckOutButton,
} from './styles';

class CartOverlay extends React.Component {
  renderListItem = product => { 
    //gets product info and returns li with all information needed to render
    const { currency } = this.props; 
    return (
      <ListItem data-tag={product.cartItemId} key={product.cartItemId}>
        <ProductInfoCont>
          <div>
            <h3>{product.name}</h3>
            <p>{
              product.productData.prices.map((i) => {
                let str ='';
                if (String(i.currency).toUpperCase() === String(currency).toUpperCase()) {
                  str = `${i.amount} ${currency}`;
                }
                return str;
              })
            }</p>
          </div>
          <OptionsList>{ product.attributes.map((el, index) => this.renderOptions(el, index)) }</OptionsList>
        </ProductInfoCont>
        <ChangingInfo>
          <CountCont onClick={this.handleCountClick}>
            <div>
              <img src={plus_image} alt="+" id="increase" info={product.name} />
            </div>
            <CountSpan>{product.count}</CountSpan>
            <div>
              <DecreaseImg src={minus_image} alt="-" id="decrease" info={product.name} color={product.count}/>
            </div>
          </CountCont>
          <GalleryItem url={product.productData.gallery[0]} /> 
        </ChangingInfo> 
      </ListItem>
    )
  }

  renderOptions = (data, index) => { 
    //returns string for every choosed option; is used in renderListItem
    return data.option === 'One size' 
      ? <li key={index}>One size</li> 
      : <li key={index}>{data.option}: {data.value}</li>
  }

  totalPriceCount = () => {
    /* counts total price for all products in cart; 
    returns price or `0.00 ${currency}` in case of empty cart */
    const { cart, currency } = this.props;
    if (cart.length === 0) return `0.00 ${currency}`;
    let totalPrice = 0;
    cart.forEach((el) => { 
      el.productData.prices.forEach((element) => {
        if (element.currency === currency) totalPrice += element.amount * el.count;   
      })
    })
    return `${totalPrice.toFixed(2)} ${currency}`;
  }

  countStaff = () => {
    /* counts sum of all products in cart 
    returns sum of all items in cart (products) and sum of products amount */
    const { cart } = this.props;
    if (cart.length === 0) return `the cart is empty`;
    let itemsCount = 0;
    cart.map((el) => itemsCount += el.count);
    return `${cart.length} product${cart.length > 1 ? 's' : ''}, ${itemsCount} item${cart.length > 1 ? 's' : ''}`;
  }

  handleCountClick = (e) => {
    // listens for click event and changes amount of product in the cart
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount, deleteProduct } = this.props;

    if (currentTargetEl !== 'img') return;

    const productName = e.target.closest('li').id;
    const cartArrIndex = e.target.closest('li').getAttribute('data-tag');

    const editingProduct = cart.filter(item => item.id !== productName && Number(item.cartItemId) === Number(cartArrIndex));
    
    if (e.target.id === 'increase') {
      editingProduct[0].count += 1;
      changeCount(editingProduct);
    } else if (e.target.id === 'decrease') {
      if (editingProduct[0].count === 1) return;
      editingProduct[0].count === 0 ? editingProduct[0].count = 0 : editingProduct[0].count -= 1;
      editingProduct[0].count !== 0 ? changeCount(editingProduct) : deleteProduct(editingProduct[0].cartItemId);
    }
  }
  
  viewBagClick = () => {
    //listens for click event and uses history to direct user to the cart page
    const { history, changeOverlayState } = this.props;
    history.push(`/cart`);
    changeOverlayState(false);
    document.body.style.overflow = 'visible';
  };

  closeOverlayClick = (e) => {
    //listens for click event and uses action CHANGE_OVERLAY_STATE to hide current component
    const { changeOverlayState } = this.props;

    if (e.target.id === 'overlay_container' || e.target.id === 'close_overlay') {
      changeOverlayState(false);
      document.body.style.overflow = 'visible';
    };
  };

  render() {
    const { cart } = this.props;
    return (
      <CartContainer id="overlay_container" onClick={this.closeOverlayClick}>
        <CartBody>
          <CartTitle>
            <p><span>My Bag</span>, { this.countStaff() }</p>
          </CartTitle>
          { cart.length === 1 && <OverlayListEl>{this.renderListItem(cart[0])}</OverlayListEl> }
          { cart.length >= 2 && <OverlayListEl>{this.renderListItem(cart[0])} {this.renderListItem(cart[1])}</OverlayListEl> }
          <TotalPriceCont>
            <TextSpan>Total</TextSpan>
            <span> { this.totalPriceCount() }</span>
          </TotalPriceCont>
          <ButtonsContainer>
            <ViewBagButton onClick={this.viewBagClick}>VIEW BAG</ViewBagButton>
            <CheckOutButton id="close_overlay">CHECK OUT</CheckOutButton> 
          </ButtonsContainer>
        </CartBody>
      </CartContainer>
    )
  }
}

const mapStateToProps = ({ cart, currency, isOverlayOpen }) => ({
  cart: cart.cart,
  currency: currency.currency,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
  changeCount: (value) => dispatch(ACTION_CHANGE_COUNT(value)),
  deleteProduct: (value) => dispatch(ACTION_DELETE_PRODUCT(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartOverlay));