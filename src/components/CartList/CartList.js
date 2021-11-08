import React from 'react';
import { connect } from 'react-redux';

import minus_square from '../../img/CartItemComp/minus_square.png';
import plus_square from '../../img/CartItemComp/plus_square.png'; 

import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';
import { ACTION_CHANGE_COUNT, ACTION_DELETE_PRODUCT } from '../../ducks/cart';
import { ACTION_USE_REMOVING } from '../../ducks/removing';
import { ACTION_USE_AMOUNT } from '../../ducks/amount';

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
  AttributesList,
  ChossedAttribute,
  LiContent,
  ButtonContainer,
  ButtonConfirm
} from './styles';


class CartListComponent extends React.Component {
  state = {
    toDelete: [],
    toAdd: [],
    toRender: '',
  }

  componentDidMount() {
    /*gets an array of products in the cart and the name of the active product from removing/amount,
    iterates through the array and adds active products to the state to render the list;
    if there is no active product, the function adds each product from the cart*/
    const { removing, cart, amount } = this.props;
    const itemsToRender = [];

    if (removing.isOpen) {
      if (removing.product === 'all') {
        this.setState(prevState => ({
          ...prevState,
          toRender: cart,
        }));
        return;
      }
      cart.map((item) => {
        if (item.name === removing.product) itemsToRender.push(item);
      });
    } else if (amount.isOpen) {
      if (amount.product === 'all') {
        this.setState(prevState => ({
          ...prevState,
          toRender: cart,
        }));
        return;
      }
      cart.map((item) => {
        if (item.name === amount.product) itemsToRender.push(item);
      });
    }
    this.setState(prevState => ({
      ...prevState,
      toRender: itemsToRender,
    }));

    document.body.style.overflow = 'hidden';
  }
  
  handleCountClick = (e) => {
    /* listens for click event and uses action ACTION_CHANGE_COUNT
    to change amount of product in the cart */
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount } = this.props;

    if (currentTargetEl !== 'img') return;

    const productCartId = e.target.closest('li').id;
    const editingProduct = cart.filter(item => item.cartItemId == Number(productCartId));

    if (e.target.id === 'increase') {
      editingProduct[0].count += 1;
      changeCount(editingProduct);
    } else if (e.target.id === 'decrease') {
      if (editingProduct[0].count > 1) {
        editingProduct[0].count -= 1;
        changeCount(editingProduct);
      }
    }
  }

  renderOptions = (data) => {
    //gets the selected options and returns string for rendering in li
    return data.option === 'One size' 
      ? <ChossedAttribute>One size</ChossedAttribute> 
      : <ChossedAttribute>{data.option}: {data.value}</ChossedAttribute>
  } 

  handleButtonsClick = (e) => {
    /* listens for click event and uses action ACTION_DELETE_PRODUCT
    to remove every selected product */
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const { showRemoving, showAmount, amount } = this.props;

    if (e.target.id === 'confirm') { 
      this.deletingProduct();
      showRemoving({ isOpen: false, product: '' });
    } else if (e.target.id === 'cancel') {
      amount.isOpen 
        ? showAmount({ isOpen: false, product: '' }) 
        : showRemoving({ isOpen: false, product: '' });
    }

    document.body.style.overflow = 'auto'; 
  }

  selectProduct = (e) => {
    /* listens for click event and pushes id of the selected products to toDelete array;
    if user clicked product that has already been selected, the function removes its id from toDelete;
    changes style of each selected product */
    const { removing } = this.props;
    const { toDelete } = this.state;

    if (!removing.isOpen) return;

    const selectedProduct = e.target.closest('li').id;
    if (toDelete.indexOf(selectedProduct) === -1) {
      this.setState(prevState => ({
        ...prevState,
        toDelete:[...prevState.toDelete, selectedProduct],
      }))
      e.target.closest('li').style.backgroundColor = '#ef9b94';
    } else {
      this.setState(prevState => ({
        ...prevState,
        toDelete:[...prevState.toDelete.filter((i) => i !== selectedProduct)],
      }))
      e.target.closest('li').style.backgroundColor = 'white';
    }
  }

  deletingProduct = () => {
    // uses action ACTION_DELETE_PRODUCT to remove every selected product; is used in handleButtonsClick;
    const { deleteProduct } = this.props;
    const { toDelete } = this.state;

    toDelete.map((item) => deleteProduct(item));
  }

  render() {
    const { currency, removing, amount } = this.props;
    const { toRender } = this.state;
   
    return (
      <Container>
        <div>
          <CartTitle> 
            { removing.isOpen && 'Choose products to remove from the cart' }
            { amount.isOpen && 'Сhange the amount of products below' }
          </CartTitle>
          { toRender.length === 0 && <h3>There is no selected product in the cart</h3>}
          { toRender.length > 0 && 
            <CartList>
              {toRender.map((item) => {
                return (
                  <CartEl onClick={this.selectProduct} key={item.cartItemId} id={item.cartItemId}>
                    <LiContent>
                      <div>
                        <CartTitleCont>
                          <h3>{item.name}</h3>
                        </CartTitleCont>  
                        <span>{
                          item.productData.prices.map((i) => {
                            if (String(i.currency).toUpperCase() === String(currency).toUpperCase()) {
                              return `${i.amount} ${currency}`
                            }
                          })
                        }</span>
                      </div>
                      <div>
                        <AttributesList>
                          {item.attributes.map((element) => {
                            return (
                            <ChossedAttribute>
                              {this.renderOptions(element)}
                            </ChossedAttribute> 
                            )
                          })}
                          <ChossedAttribute>Amount: {item.count}</ChossedAttribute>
                        </AttributesList>
                      </div>
                    </LiContent>
                    <ChangingInfo>
                      {amount.isOpen && <CountCont onClick={this.handleCountClick}>
                        <div>
                          <img src={plus_square} alt="+" id="increase" info={item.name} />
                        </div>
                        <CountSpan>{item.count}</CountSpan>
                        <div>
                          <img src={minus_square} alt="-" id="decrease" info={item.name} />
                        </div>
                      </CountCont>}
                      <GalleryItem url={item.productData.gallery[0]} /> 
                    </ChangingInfo>
                  </CartEl>
                )
              })}
            </CartList>
          }
        </div>
        <ButtonContainer onClick={this.handleButtonsClick}>
          { removing.isOpen && toRender.length > 0 && <ButtonConfirm id="confirm">Confirm</ButtonConfirm> }
          <button id="cancel">{ removing.isOpen ? 'Cancel' : 'Close' }</button>         
        </ButtonContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ cart, currency, isOverlayOpen, removing, amount }) => ({
  cart: cart.cart,
  currency: currency.currency,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  removing: removing.removing,
  amount: amount.amount,
});

const mapDispatchToProps = (dispatch) => ({
  changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
  changeCount: (value) => dispatch(ACTION_CHANGE_COUNT(value)),
  deleteProduct: (value) => dispatch(ACTION_DELETE_PRODUCT(value)),
  showRemoving: (value) => dispatch(ACTION_USE_REMOVING(value)),
  showAmount: (value) => dispatch(ACTION_USE_AMOUNT(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartListComponent);