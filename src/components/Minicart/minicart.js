import React from 'react';
import { withRouter } from "react-router";

import icon from '../../img/Minicart/icon.png';
import { Product, ProductImage, Text, Icon, TextDetails, AddSpan, RemoveSpan } from './styles';

import { connect } from 'react-redux';
import { ACTION_CHANGE_PRODUCT } from '../../ducks/product';
import { ACTION_USE_ADDING } from '../../ducks/adding';

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
    console.log(this.props)
  }

  render() {
    const { name, link, prices, currency } = this.props; 
    console.log(this.props)
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
            <div id={name} onClick={this.listenAddClick}>
              <AddSpan >Add</AddSpan>
              <RemoveSpan>Remove</RemoveSpan>
            </div>
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
});

export const Minicart = withRouter(connect(mapStateToProps, mapDispatchToProps)(MinicartEl));