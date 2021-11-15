import React from 'react';
import { connect } from 'react-redux';

import { ACTION_USE_REMOVING } from '../../ducks/cartListStatus';
import { ACTION_USE_AMOUNT } from '../../ducks/cartListStatus';

import { CartManagingCont, ContentHolder, CartButton } from './styles';        
        
class CartManaging extends React.Component {
  openOverlay = (e) => {
    /*listens for click event and uses actions ACTION_USE_REMOVING or ACTION_USE_AMOUNT
    to change visibility of OverlayBackground and render a list of all products in CartList component*/
    const { showRemoving, showAmount, cart } = this.props;
    if (cart.length === 0) return;
    if (e.target.id === 'remove') {
      showRemoving({ isOpen: true, product: 'all' });
    } else if (e.target.id === 'amount') {
      showAmount({ isOpen: true, product: 'all' });
    }
  }

  render() {
    const { cart } = this.props;     
    return (
      <CartManagingCont>
        <ContentHolder visibility={cart.length}>
          <h3>Change the cart</h3>
          <div onClick={this.openOverlay}>
            <CartButton  visibility={cart.length} id="remove">Remove products</CartButton>
            <CartButton visibility={cart.length} id="amount">Change amount</CartButton>
          </div>
        </ContentHolder>
      </CartManagingCont>
    )
  }
};
        
const mapStateToProps = ({ cart }) => ({
  cart: cart.cart,
});
        
const mapDispatchToProps = (dispatch) => ({
  showRemoving: (value) => dispatch(ACTION_USE_REMOVING(value)),
  showAmount: (value) => dispatch(ACTION_USE_AMOUNT(value)),
});
        
export default connect(mapStateToProps, mapDispatchToProps)(CartManaging);