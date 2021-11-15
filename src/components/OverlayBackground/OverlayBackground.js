import React from 'react';

import { connect } from 'react-redux';

import { ACTION_USE_ADDING } from '../../ducks/cartListStatus';
import { ACTION_USE_REMOVING } from '../../ducks/cartListStatus';
import { ACTION_USE_AMOUNT } from '../../ducks/cartListStatus';

import {
  Overlay,
  OverlayBody,
} from './styles';

class OverlayBackground extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden'; 
  }

  confirmDeleting = (e) => {
    /*listens for click event, checks status of different windows and renders active one*/
    const { adding, removing, amount, showAdding, showRemoving, showAmount } = this.props;
    if (e.target.id !== 'overlay_background') return;

    if (adding) showAdding({isOpen: false, product: ''});
    if (removing) showRemoving({isOpen: false, product: ''});
    if (amount) showAmount({isOpen: false, product: ''});

    document.body.style.overflow = 'visible';
  }

  render() {
    const { children } = this.props;
    return (
      <Overlay id="overlay_background" onClick={this.confirmDeleting}>
        <OverlayBody>
          { children }
        </OverlayBody>
      </Overlay>
    )
  }
}

const mapStateToProps = ({ cartListStatus }) => ({
  adding: cartListStatus.adding.isOpen,
  removing: cartListStatus.removing.isOpen,
  amount: cartListStatus.amount.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  showAdding: (value) => dispatch(ACTION_USE_ADDING(value)),
  showRemoving: (value) => dispatch(ACTION_USE_REMOVING(value)),
  showAmount: (value) => dispatch(ACTION_USE_AMOUNT(value)),
});


export default connect(mapStateToProps, mapDispatchToProps)(OverlayBackground);