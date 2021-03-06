import React from 'react';

import { connect } from 'react-redux';

import { ACTION_DELETE_PRODUCT } from '../../ducks/cart';
import { ACTION_USE_WARNING } from '../../ducks/warning';

import {
  OverlayContainer,
  Overlay,
  ButtonContainer,
  ButtonConfirm,
} from './styles';

class WarningOverlay extends React.Component {
  confirmDeleting = (e) => {
    /* listens for click event, closes WarningOverlay in case user clics "Cancel" button or OverlayContainer, 
    deletes clicked product from the cart in case user clics "Confirm" button */
    const { deleteProduct, toDelete, showWarning } = this.props;
    if (e.target.id === 'overlay_container') {
      showWarning(false);
      document.body.style.overflow = 'visible';
    };

    const currentTargetEl = e.target.tagName.toLowerCase();

    if (currentTargetEl !== 'button') return;
    if (e.target.id === 'true') deleteProduct(toDelete);
    document.body.style.overflow = 'visible';
    showWarning(false);
  }

  render() {
    return (
      <OverlayContainer id='overlay_container' onClick={this.confirmDeleting}>
        <Overlay>
          <h3>This action will remove the product from the cart. <br /> Are you sure you want to continue?</h3>
          <ButtonContainer>
            <ButtonConfirm id="true">Confirm</ButtonConfirm>
            <button id="false">Cancel</button>
          </ButtonContainer>
        </Overlay>
      </OverlayContainer>
    )
  }
}

const mapStateToProps = ({ cart }) => ({
  cart: cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (value) => dispatch(ACTION_DELETE_PRODUCT(value)),
  showWarning: (value) => dispatch(ACTION_USE_WARNING(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningOverlay);