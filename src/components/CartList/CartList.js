import React from 'react';
import { connect } from 'react-redux';

import minus_square from '../../img/CartItemComp/minus_square.png';
import plus_square from '../../img/CartItemComp/plus_square.png'; 

import { ACTION_CHANGE_OVERLAY_STATE } from '../../ducks/overlay';
import { ACTION_CHANGE_COUNT, ACTION_DELETE_PRODUCT } from '../../ducks/cart';
import { ACTION_USE_REMOVING } from '../../ducks/removing';
//import { ACTION_DELETE_PRODUCT } from '../../ducks/cart';

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
    toRender: null,
  }

  componentDidMount() {
    const { removing, cart } = this.props;
    const itemsToRender = [];
    cart.map((item) => {
      if (item.name === removing.product) {
        itemsToRender.push(item)
      }
    });
    this.setState(prevState => ({
      ...prevState,
      toRender: itemsToRender,
    }));

    document.body.style.overflow = 'hidden';
  }
  
  // handleCountClick = (e) => {
  //   const currentTargetEl = e.target.tagName.toLowerCase();
  //   const { cart, changeCount, deleteProduct, showWarning } = this.props;

  //   if (currentTargetEl !== 'img') return;

  //   const productName = e.target.closest('li').id;
  //   const cartArrIndex = e.target.closest('li').getAttribute('data-tag');

  //   const editingProduct = cart.filter(item => item.id !== productName && Number(item.cartItemId) === Number(cartArrIndex));
    
  //   if (e.target.id === 'increase') {
  //     editingProduct[0].count += 1;
  //     changeCount(editingProduct);
  //   } else if (e.target.id === 'decrease') {
  //     if (editingProduct[0].count > 1) {
  //       editingProduct[0].count -= 1;
  //       changeCount(editingProduct);
  //     } else {
  //       this.setState(prevState => ({
  //         ...prevState,
  //         toDelete: Number(editingProduct[0].cartItemId),
  //       }))
  //       showWarning(true)
  //     }
  //   }
  // }

  renderOptions = (data) => {
    return data.option === 'One size' 
      ? <ChossedAttribute>One size</ChossedAttribute> 
      : <ChossedAttribute>{data.option}: {data.value}</ChossedAttribute>
  } 

  handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    if (e.target.id === 'confirm') this.deleteProduct();

    const { showRemoving } = this.props;
    showRemoving({ isOpen: false, product: '' });
    document.body.style.overflow = 'auto'; 
  }

  selectProduct = (e) => {
    const { toDelete } = this.state;
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

  deleteProduct = () => {
    const { deleteProduct } = this.props;
    const { toDelete } = this.state;
    toDelete.map((item) => {
      deleteProduct(item);
    })
  }

  render() {
    const { cart, currency, warning, adding, removing } = this.props;
    const { toDelete, toAdd } = this.state;
    const { toRender } = this.state;
    console.log(this.state.toDelete)
    return (
      <Container>
        <div>
          <CartTitle>Choose products to {removing.isOpen && 'remove from the cart' }</CartTitle>
          <CartList>
            {cart.length === 0 && <h3>Cart is empty</h3>}
            { toRender && toRender.map((item, index) => {
              const cartListEl =
                <CartEl onClick={this.selectProduct} key={item.cartItemId} id={item.cartItemId} 
                bgColor={toDelete.indexOf(item.cartItemId) === -1 ? 'white' : '#5ECE7B' }>
                  {console.log(toDelete.indexOf(item.cartItemId),item.cartItemId, toDelete)}
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
                    {!removing && <CountCont onClick={this.handleCountClick}>
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
              return cartListEl;
            })}
          </CartList>
        </div>
        <ButtonContainer onClick={this.handleClick}>
          <ButtonConfirm id="confirm">Confirm</ButtonConfirm>
          <button id="cansel">Cancel</button>
        </ButtonContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ cart, currency, isOverlayOpen, removing }) => ({
  cart: cart.cart,
  currency: currency.currency,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
  removing: removing.removing,
});

const mapDispatchToProps = (dispatch) => ({
  changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
  changeCount: (value) => dispatch(ACTION_CHANGE_COUNT(value)),
  deleteProduct: (value) => dispatch(ACTION_DELETE_PRODUCT(value)),
  showRemoving: (value) => dispatch(ACTION_USE_REMOVING(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartListComponent);