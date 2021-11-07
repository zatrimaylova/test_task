import React from 'react';
import { withRouter } from "react-router";

import icon from '../../img/Minicart/icon.png';
import { Product, ProductImage, Text, Icon, TextDetails, AddSpan, RemoveSpan, AmountSpan, ChangeCart } from './styles';

import { connect } from 'react-redux';
import { ACTION_CHANGE_PRODUCT } from '../../ducks/product';
import { ACTION_USE_ADDING } from '../../ducks/adding';
import { ACTION_USE_REMOVING } from '../../ducks/removing';
import { ACTION_USE_AMOUNT } from '../../ducks/amount';

class MinicartEl extends React.Component { 
  handleCartClick = (e) => {
    if (e.target.tagName.toLowerCase() === 'span') return;
    const { history, name, changeProduct } = this.props;
    history.push(`/product/${name}`);
    changeProduct(name);
  };

  listenAddClick = () => {
    const { showAdding, name, data } = this.props;
    showAdding({ isOpen: true, product: data})
  }

  listenRemoveClick = () => {
    const { showRemoving, name, data } = this.props;
    showRemoving({ isOpen: true, product: name});
  }

  listenAmountClick = () => {
    const { showAmount, name } = this.props;
    showAmount({isOpen: true, product: name});
  }

  render() {
    const { name, link, prices, currency } = this.props; 
    return (
      <Product onClick={this.handleCartClick}>
        <ProductImage url={link} />
        <Icon src={icon} alt="icon" />
        <Text>
          <p>{name}</p>
          <TextDetails>
            <p>{
              prices.map((item) => {
                if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
                  return `${item.amount} ${currency}`
                }
              })
              
            }</p>
            <ChangeCart>
              <div id={name} >
                <AddSpan id="add" onClick={this.listenAddClick}>Add</AddSpan>
                <RemoveSpan onClick={this.listenRemoveClick}>Remove</RemoveSpan>
              </div>
              <AmountSpan onClick={this.listenAmountClick}>Change amount</AmountSpan>
            </ChangeCart>
          </TextDetails>
        </Text>
      </Product>
    )
  }
}

const mapStateToProps = ({ currency }) => ({
  currency: currency.currency,
});

const mapDispatchToProps = (dispatch) => ({
  changeProduct: (value) => dispatch(ACTION_CHANGE_PRODUCT(value)),
  showAdding: (value) => dispatch(ACTION_USE_ADDING(value)),
  showRemoving: (value) => dispatch(ACTION_USE_REMOVING(value)),
  showAmount: (value) => dispatch(ACTION_USE_AMOUNT(value)),
});

export const Minicart = withRouter(connect(mapStateToProps, mapDispatchToProps)(MinicartEl));