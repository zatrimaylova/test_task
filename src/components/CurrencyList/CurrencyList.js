import React from 'react';
import { connect } from 'react-redux';
import { ACTION_CHANGE_CURRENCY } from '../../ducks/currency';

import { CurrenciesList } from './style.js'

class CurrencyEl extends React.Component {
  checkClick = () => {
    console.log('hhhhhhhhhhhhhh');
  }

  render() {
    const { currency } = this.props;
    return (
      <>
        <CurrenciesList> 
          <div onClick={this.checkClick}>SSSSSSSSSSSSSSS</div>
            {this.props.currencies && this.props.currencies.map(item => {
              console.log(item) 
              // return 
            })}
        </CurrenciesList>
      </>
    )
  }
}

const mapStateToProps = ({ currency, 
  //cart, isOverlayOpen 
}) => ({
  currency: currency.currency,
  // cart: cart.cart,
  // isOverlayOpen: isOverlayOpen.isOverlayOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (value) => dispatch(ACTION_CHANGE_CURRENCY(value)),
  // changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
  // changeOverlayState: (value) => dispatch(ACTION_CHANGE_OVERLAY_STATE(value)),
});

export const CurrencyList = connect(mapStateToProps, mapDispatchToProps)(CurrencyEl);
//export const Minicart = withRouter(connect(mapStateToProps, mapDispatchToProps)(MinicartEl));
//export default CurrencyList;