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
import { ACTION_USE_AMOUNT } from '../../ducks/amount';

class CartListComponent extends React.Component {
  state = {
    toDelete: [],
    toAdd: [],
    toRender: '',
  }

  componentDidMount() {
    const { removing, cart, amount } = this.props;
    const itemsToRender = [];
    if (removing.isOpen) {
      cart.map((item) => {
        if (item.name === removing.product) itemsToRender.push(item);
      });
    } else if (amount.isOpen) {
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
    const currentTargetEl = e.target.tagName.toLowerCase();
    const { cart, changeCount, deleteProduct, showWarning } = this.props;

    if (currentTargetEl !== 'img') return;

    const productCartId = e.target.closest('li').id;

    const editingProduct = cart.filter(item => item.cartItemId == Number(productCartId));
    //console.log(productCartId, editingProduct)
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
    return data.option === 'One size' 
      ? <ChossedAttribute>One size</ChossedAttribute> 
      : <ChossedAttribute>{data.option}: {data.value}</ChossedAttribute>
  } 

  handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const { showRemoving, showAmount } = this.props;

    if (e.target.id === 'confirm') { 
      this.deleteProduct();
      showRemoving({ isOpen: false, product: '' });
    } else if (e.target.id === 'cancel') {
      showAmount({ isOpen: false, product: '' });
    }

    document.body.style.overflow = 'auto'; 
  }

  selectProduct = (e) => {
    const { removing } = this.props;
    const { toDelete } = this.state;

    if (!removing.isOpen) return;
    console.log('e.target.id')

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
    const { cart, currency, warning, adding, removing, amount } = this.props;
    const { toDelete, toAdd } = this.state;
    const { toRender } = this.state;
   
    return (
      <Container>
        <div>
          <CartTitle> 
            {removing.isOpen && 'Choose products to remove from the cart' }
            {amount.isOpen && 'Сhange the amount of products below' }
          </CartTitle>
          {toRender.length === 0 && <h3>There is no selected product in the cart</h3>}
          {toRender.length > 0 && <CartList>
            {toRender.map((item, index) => {
              const cartListEl =
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
              return cartListEl;
            })}
          </CartList>}
        </div>
        <ButtonContainer onClick={this.handleClick}>
          {removing.isOpen && <ButtonConfirm id="confirm">Confirm</ButtonConfirm>}
          <button id="cancel">{removing.isOpen ? 'Cancel' : 'Close'}</button>         
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