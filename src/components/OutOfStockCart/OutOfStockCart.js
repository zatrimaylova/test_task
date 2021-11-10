import React from 'react';

import { Product, ProductImage, Title, TextInfo } from './styles';
import { connect } from 'react-redux';

class OutOfStockEl extends React.Component { 
  render() {
    const { name, link, prices, currency } = this.props;

    return(
      <Product>
        <ProductImage url={link} >
          <Title>OUT OF STOCK</Title>
        </ProductImage>
        <TextInfo>
          <p>{name}</p>
          <p>{
              prices.map((item) => {
                let currencyStr = '';
                if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
                  currencyStr = `${item.amount} ${currency}`;
                }
                return currencyStr;
              })
          }</p>
        </TextInfo>

      </Product>
    )
  }
}

const mapStateToProps = ({ currency }) => ({
  currency: currency.currency,
});

export const OutOfStockCart = connect(mapStateToProps)(OutOfStockEl);