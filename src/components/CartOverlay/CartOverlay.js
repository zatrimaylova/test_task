import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import minus_image from '../../img/Overlay/minus_image.png';
import plus_image from '../../img/Overlay/plus_image.png'; 

import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';
import { ACTION_CHANGE_COUNT, ACTION_DELETE_PRODUCT } from '../../ducks/cart';

import {
  CartBody,
  ViewBagButton,
  CheckOutButton,
  CartTitle,
  ChangingInfo,
  CountCont,
  CountSpan,
  GalleryItem,
  ListItem,
  CartContainer,
  ButtonsContainer,
} from './styles';

class CartOverlay extends React.Component {
  totalCostCounter = () => {
    const { cart, currency } = this.props;
    console.log(cart)
    console.log(currency)
  }

  renderList = () => {
    const { cart, currency } = this.props;
    console.log(cart)
    if (cart.length === 1) {
      const product = cart[0];
      console.log(product)
      const listEl =  
        <ListItem data-tag={product.cartItemId}>
          <p>{product.name}</p>
          <p>{
            product.productData.prices.map((i) => {
              if (String(i.currency).toUpperCase() === String(currency).toUpperCase()) {
                return `${i.amount} ${currency}`
              }
            })
          }</p>

          <ChangingInfo>
            <CountCont onClick={this.handleCountClick}>
              <div>
                <img src={plus_image} alt="+" id="increase" info={product.name} onClick={this.handleCountClick} />
              </div>
              <CountSpan>{product.count}</CountSpan>
              <div>
                <img src={minus_image} alt="-" id="decrease" info={product.name} onClick={this.handleCountClick} />
              </div>
            </CountCont>
            <GalleryItem url={product.productData.gallery[0]} /> 
          </ChangingInfo> 
        </ListItem>
      return listEl;
    }
  }

  totalPriceCount = () => {
    const { cart, currency } = this.props;
    let totalPrice = null;
    cart.map((el) => { 
      el.productData.prices.forEach((element) => {
        if (element.currency === currency) totalPrice += element.amount;   
      })
    })
    return `${currency} ${totalPrice}`;
  }

  handleCountClick = (e) => {
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount, deleteProduct } = this.props;

    if (currentTargetEl !== 'img') {
      return;
    }

    const productName = e.target.closest('li').id;
    const cartArrIndex = e.target.closest('li').getAttribute('data-tag');

    const editingProduct = cart.filter(item => item.id !== productName && Number(item.cartItemId) === Number(cartArrIndex));
    
    if (e.target.id === 'increase') {
      editingProduct[0].count += 0.5;
      changeCount(editingProduct);
    } else if (e.target.id === 'decrease') {
      editingProduct[0].count === 0 ? editingProduct[0].count = 0 : editingProduct[0].count -= 0.5;
      editingProduct[0].count !== 0 ? changeCount(editingProduct) : deleteProduct(editingProduct[0].cartItemId);
    }
  }
  
  viewBagClick = () => {
    const { history, changeOverlayState } = this.props;
    history.push(`/cart`);
    changeOverlayState(false);
    document.body.style.overflow = 'visible';
  };

  checkOutClick = () => {
    const { changeOverlayState } = this.props;
    changeOverlayState(false);
    document.body.style.overflow = 'visible';
  };

  closeOverlayClick = (e) => {
    const { changeOverlayState } = this.props;
    
    if (e.target.id === 'overlay_container') {
      changeOverlayState(false);
      document.body.style.overflow = 'visible';
    }
  };

  render() {
    const { cart, currency } = this.props;
    console.log(cart)
    return (
      <CartContainer id="overlay_container" onClick={this.closeOverlayClick}>
        <CartBody>
          <CartTitle>
            <p><span>My Bag</span>, { cart.length === 1 ? '1 item' : `${cart.length} items` }</p>
          </CartTitle>
          { cart.length > 0 && <ul>{this.renderList()}</ul>
          }
          <div>
            <span>
              {
                this.totalPriceCount()
              }
            </span>
            {/* total cost */}
          </div>
          <ButtonsContainer>
            <ViewBagButton onClick={this.viewBagClick} >VIEW BAG</ViewBagButton>
            <CheckOutButton onClick={this.checkOutClick}>CHECK OUT</CheckOutButton> 
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