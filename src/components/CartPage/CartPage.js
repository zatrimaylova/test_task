import React from 'react';
import { connect } from 'react-redux';

import minus_square from '../../img/CartPage/minus_square.png';
import plus_square from '../../img/CartPage/plus_square.png';
import chevron_left from '../../img/CartPage/chevron_left.png';
import chevron_right from '../../img/CartPage/chevron_right.png';

import { ACTION_CHANGE_COUNT, ACTION_DELETE_PRODUCT } from '../../ducks/cart';
import { ACTION_USE_WARNING } from '../../ducks/warning';

import WarningOverlay from '../WarningOverlay/WarningOverlay.js';

import {
  Container, 
  CountCont, 
  CartList, 
  CartEl, 
  CartTitleCont,
  CartTitle, 
  CountSpan, 
  ChangingInfo, 
  GalleryItem, 
  ChevronLeft, 
  ChevronRight,
  AttributesList,
  ChossedAttribute,
} from './styles';

class CartPage extends React.Component {
  state = {
    toDelete: null,
  }

  handleCountClick = (e) => {
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount, deleteProduct, showWarning } = this.props;

    if (currentTargetEl !== 'img') {
      return;
    }

    const productName = e.target.closest('li').id;
    const cartArrIndex = e.target.closest('li').getAttribute('data-tag');

    const editingProduct = cart.filter(item => item.id !== productName && Number(item.cartItemId) === Number(cartArrIndex));
    
    if (e.target.id === 'increase') {
      editingProduct[0].count += 1;
      changeCount(editingProduct);
    } else if (e.target.id === 'decrease') {
      //if (editingProduct[0].count === 0)
      //editingProduct[0].count === 0 ? editingProduct[0].count = 0 : editingProduct[0].count -= 1;
      if (editingProduct[0].count > 1) {
        editingProduct[0].count -= 1;
        changeCount(editingProduct);
      } else {
        this.setState(prevState => ({
          ...prevState,
          toDelete: Number(editingProduct[0].cartItemId),
        }))
        showWarning(true)
      }
      //editingProduct[0].count !== 0 ? changeCount(editingProduct) : showWarning(true);
      //deleteProduct(editingProduct[0].cartItemId);
    }
  }

  renderOptions = (data) => {
    return data.option === 'One size' 
      ? <ChossedAttribute>One size</ChossedAttribute> 
      : <ChossedAttribute>{data.option}: {data.value}</ChossedAttribute>
  } 

  changeGalleryImgClick = (e) => {
    const { cart } = this.props;
    const clickedImg = e.target;
    const productId = e.target.closest('li').getAttribute('data-tag');
    const currentTargetName = e.target.tagName.toLowerCase();
    const backgroundImg = e.target.closest('div');

    if (currentTargetName !== 'img') {
      return;
    };

    const imgData = cart.map((item) => {
      if (Number(item.cartItemId) === Number(productId)) {
        return item.productData.gallery;
      }
    }).filter((item) => item)[0];

    if (clickedImg.id === 'right') {
      const imgInd = (imgData.length - 1) === Number(backgroundImg.id) ? 0 : Number(backgroundImg.id) + 1;
      backgroundImg.id = imgInd;
      backgroundImg.style.backgroundImage = `url(${imgData.filter((item, index) => item && Number(index) === Number(imgInd))[0]})`;
    } else if (clickedImg.id === 'left') {
      const imgInd = Number(backgroundImg.id) === 0 ? imgData.length - 1 : Number(backgroundImg.id) - 1;
      backgroundImg.id = imgInd;
      backgroundImg.style.backgroundImage = `url(${imgData.filter((item, index) => item && Number(index) == imgInd)[0]})`;
    }
  }

  deleteCartElement = (e) => {
    const { showWarning } = this.props;
    this.setState(prevState => ({
      ...prevState,
      toDelete: Number(e.target.id),
    }));
    showWarning(true);
    document.body.style.overflow = 'hidden';
    console.log(e.target.getBoundingClientRect())
  }

  render() {
    const { cart, currency, warning } = this.props;
    const { toDelete } = this.state;
    console.log('warning', this.props.warning, this.state.toDelete, currency)
    return (
      <Container>
        <CartTitle>CART</CartTitle>
        <CartList>
          {cart.length === 0 && <h3>Cart is empty</h3>}
          {cart && cart.map((item, index) => {
            const cartListEl =
              <CartEl key={item.name + index} id={item.name} data-tag={item.cartItemId}>
                <div>
                  <CartTitleCont>
                    <h3>{item.name}</h3>
                    <button id={item.cartItemId} onClick={this.deleteCartElement} >Delete</button>
                  </CartTitleCont>  
                  <span>{
                    item.productData.prices.map((i) => {
                      if (String(i.currency).toUpperCase() === String(currency).toUpperCase()) {
                        return `${i.amount} ${currency}`
                      }
                    })
                  }</span>
                  <div>
                    {item.attributes.map((element, index) => {
                      return (
                        <AttributesList key={index}>
                          { this.renderOptions(element) }
                        </AttributesList>
                      )
                    })}
                  </div>
                </div>
                <ChangingInfo>
                  <CountCont onClick={this.handleCountClick}>
                    <div>
                      <img src={plus_square} alt="+" id="increase" info={item.name} />
                    </div>
                    <CountSpan>{item.count}</CountSpan>
                    <div>
                      <img src={minus_square} alt="-" id="decrease" info={item.name} />
                    </div>
                  </CountCont>
                  <GalleryItem url={item.productData.gallery[0]} id="0" onClick={this.changeGalleryImgClick} > 
                    <ChevronLeft src={chevron_left} id="left"/>
                    <ChevronRight src={chevron_right} id="right"/>
                  </GalleryItem>
                </ChangingInfo>
              </CartEl>
            return cartListEl;
          })}
        </CartList>
        { Boolean(warning) && toDelete && <WarningOverlay toDelete={toDelete} />}
      </Container>
    )
  }
}

const mapStateToProps = ({ cart, currency, isOverlayOpen, warning }) => ({
  cart: cart.cart,
  currency: currency.currency,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  warning: warning.warning,
});

const mapDispatchToProps = (dispatch) => ({
  changeCount: (value) => dispatch(ACTION_CHANGE_COUNT(value)),
  deleteProduct: (value) => dispatch(ACTION_DELETE_PRODUCT(value)),
  showWarning: (value) => dispatch(ACTION_USE_WARNING(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);