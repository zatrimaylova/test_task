import React from 'react';
import { withRouter } from "react-router";

import icon from '../../img/Minicart/icon.png';
import { Product, ProductImage, Text, RoundIcon, Icon } from './styles';

import { connect } from 'react-redux';
import { ACTION_CHANGE_PRODUCT } from '../../ducks/product';

class MinicartEl extends React.Component { 
  handleCartClick = () => {
    const { history, name, changeProduct } = this.props;
    history.push(`/product/${name}`);
    changeProduct(name);
  };

  render() {
    const { name, link, prices, currency } = this.props;
    
    return(
      <Product onClick={this.handleCartClick}>
        <ProductImage url={link} />
        <RoundIcon>
          <Icon src={icon} alt="icon" />
        </RoundIcon>
        <Text>
          <p>{name}</p>
          <p>{
            prices.map((item) => {
              if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
                return `${item.amount} ${currency}`
              }
            })
          }</p>
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
});

export const Minicart = withRouter(connect(mapStateToProps, mapDispatchToProps)(MinicartEl));