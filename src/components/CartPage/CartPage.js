import React from 'react';
import { connect } from 'react-redux';

import minus_square from '../../img/CartPage/minus_square.png';
import plus_square from '../../img/CartPage/plus_square.png';
import chevron_left from '../../img/CartPage/chevron_left.png';
import chevron_right from '../../img/CartPage/chevron_right.png';

import { ACTION_CHANGE_COUNT } from '../../ducks/cart';
import { ACTION_USE_WARNING } from '../../ducks/warning';
import { ACTION_USE_ADDING } from '../../ducks/adding';

import WarningOverlay from '../WarningOverlay/WarningOverlay.js';
import ShortAddingForm from '../ShortAddingForm/ShortAddingForm.js';
import OverlayBackground from '../OverlayBackground/OverlayBackground.js';

import {
  Container,
  CartTitle,
  CartEl,
  LiContent,
  CartTitleCont,
  ButtonsHolder,
  AttributesList,
  ChoosedAttribute,
  ChangingInfo,
  CountCont,
  CountSpan, 
  GalleryItem,
  DecreaseImg, 
  ChevronLeft, 
  ChevronRight,  
} from './styles';

class CartPage extends React.Component {
  state = {
    toDelete: null,
  }

  componentDidMount() {
    document.title = 'Cart';  
  }

  handleCountClick = (e) => {
    /* listens for click event and changes amount of product in the cart,
    uses action ACTION_USE_WARNING to show WarningOverlay if the customer tries to decrease 1*/
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount, showWarning } = this.props;

    if (currentTargetEl !== 'img') return;

    const productName = e.target.closest('li').id;
    const cartArrIndex = e.target.closest('li').getAttribute('data-tag');

    const editingProduct = cart.filter(item => item.id !== productName && Number(item.cartItemId) === Number(cartArrIndex));
    
    if (e.target.id === 'increase') {
      editingProduct[0].count += 1;
      changeCount(editingProduct);
    } else if (e.target.id === 'decrease') {
      if (editingProduct[0].count > 1) {
        editingProduct[0].count -= 1;
        changeCount(editingProduct);
      } else {
        this.setState(prevState => ({
          ...prevState,
          toDelete: Number(editingProduct[0].cartItemId),
        }));
        showWarning(true);
      }
    }
  }

  renderOptions = (data) => {
    //gets the selected options and returns string for rendering in li
    return data.option === 'One size' 
      ? <ChoosedAttribute>One size</ChoosedAttribute> 
      : <ChoosedAttribute>{data.option}: {data.value}</ChoosedAttribute>
  } 

  changeGalleryImgClick = (e) => {
    //listens for click event and changes active gallery image
    const { cart } = this.props;
    const clickedImg = e.target;
    const productId = e.target.closest('li').getAttribute('data-tag');
    const currentTargetName = e.target.tagName.toLowerCase();
    const backgroundImg = e.target.closest('div');

    if (currentTargetName !== 'img') return;

    const imgData = cart.map((item) => {
      let itemElement;
      if (Number(item.cartItemId) === Number(productId)) itemElement = item.toRender;
      return itemElement;
    }).filter((item) => item)[0];

    if (clickedImg.id === 'right') {
      const imgInd = (imgData.length - 1) === Number(backgroundImg.id) ? 0 : Number(backgroundImg.id) + 1;
      backgroundImg.id = imgInd;
      backgroundImg.style.backgroundImage = `url(${imgData.filter((item, index) => item && Number(index) === Number(imgInd))[0]})`;
    } else if (clickedImg.id === 'left') {
      const imgInd = Number(backgroundImg.id) === 0 ? imgData.length - 1 : Number(backgroundImg.id) - 1;
      backgroundImg.id = imgInd;
      backgroundImg.style.backgroundImage = `url(${imgData.filter((item, index) => item && Number(index) === Number(imgInd))[0]})`;
    }
  }

  deleteCartElement = (e) => {
    /* listens for click event and uses action ACTION_USE_WARNING
    to show WarningOverlay if the customer tries to delete a product */
    const { showWarning } = this.props;
    this.setState(prevState => ({
      ...prevState,
      toDelete: Number(e.target.closest('div').id),
    }));
    showWarning(true);
    document.body.style.overflow = 'hidden';
  }

  addProduct = (e) => {
    /* listens for click event and uses action ACTION_USE_WARNING
    to show WarningOverlay if the customer tries to delete a product */
    const { cart, showAdding } = this.props;
    const currentAddingProduct = cart.filter((item) => item.cartItemId === Number(e.target.closest('div').id));

    showAdding({isOpen: true, product: currentAddingProduct[0].productData});
  }

  render() {
    const { cart, currency, warning, adding } = this.props;
    const { toDelete } = this.state;

    return (
      <Container>
        <CartTitle>CART</CartTitle>
        <ul>
          {cart.length === 0 && <h3>The cart is empty</h3>}
          {cart && cart.map((item, index) => {
            return (
              <CartEl key={item.name + index} id={item.name} data-tag={item.cartItemId}>
                <LiContent>
                  <div>
                    <CartTitleCont>
                      <div>
                        <h3>{item.name}</h3>
                        <span></span>
                      </div>
                      <ButtonsHolder id={item.cartItemId}>
                        <button onClick={this.deleteCartElement} >Remove</button>
                        <button onClick={this.addProduct}>Add product</button>
                      </ButtonsHolder>
                    </CartTitleCont>  
                    <span>{
                      item.productData.prices.map((i) => {
                        let str = '';
                        if (String(i.currency).toUpperCase() === String(currency).toUpperCase()) str = `${i.amount} ${currency}`;
                        return str;
                      })
                    }</span>
                  </div>
                  <div>
                    {item.attributes.map((element, index) => {
                      return (
                        <AttributesList key={index}>
                          { this.renderOptions(element) }
                        </AttributesList>
                      )
                    })}
                  </div>
                </LiContent>
                <ChangingInfo>
                  <CountCont onClick={this.handleCountClick}>
                    <div>
                      <img src={plus_square} alt="+" id="increase" info={item.name} />
                    </div>
                    <CountSpan>{item.count}</CountSpan>
                    <div>
                      <DecreaseImg src={minus_square} alt="-" id="decrease" info={item.name} color={item.count}/>
                    </div>
                  </CountCont>
                    <GalleryItem url={item.toRender[0]} id="0" onClick={this.changeGalleryImgClick} > 
                      {
                        item.toRender.length > 1 && 
                        <>
                          <ChevronLeft src={chevron_left} id="left"/>
                          <ChevronRight src={chevron_right} id="right"/>
                        </>
                      }
                    </GalleryItem>
                </ChangingInfo>
              </CartEl>
            )
          })}
        </ul>
        { Boolean(warning) && toDelete && <WarningOverlay toDelete={toDelete} /> }
        { adding.isOpen && <OverlayBackground><ShortAddingForm /></OverlayBackground> }
      </Container>
    )
  }
}

const mapStateToProps = ({ cart, currency, warning, adding }) => ({
  cart: cart.cart,
  currency: currency.currency,
  warning: warning.warning,
  adding: adding.adding,
});

const mapDispatchToProps = (dispatch) => ({
  changeCount: (value) => dispatch(ACTION_CHANGE_COUNT(value)),
  showWarning: (value) => dispatch(ACTION_USE_WARNING(value)),
  showAdding: (value) => dispatch(ACTION_USE_ADDING(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);