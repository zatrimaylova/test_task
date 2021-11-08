import React from 'react';
import { connect } from 'react-redux';

import { ACTION_USE_REMOVING } from '../../ducks/removing';
import { ACTION_USE_AMOUNT } from '../../ducks/amount';

import { CartManagingCont, ContentHolder } from './styles';        
        
class CartManaging extends React.Component {
  openOverlay = (e) => {
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
      <CartManagingCont >
        <ContentHolder visibility={cart.length}>
          <h3>Change cart</h3>
          <div onClick={this.openOverlay}>
            <button id="remove">Remove products</button>
            <button id="amount">Change amount</button>
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