import React from 'react';
import { withRouter } from "react-router";

import icon from '../../img/Minicart/icon.png';
import { 
  Product, 
  ProductImage, 
  Icon, 
  Text,
  NameTitle,
  TextDetails, 
  SwatchList, 
  SwatchEl, 
  ChangeCart, 
  AddSpan, 
  RemoveSpan, 
  AmountSpan,
} from './styles';

import { connect } from 'react-redux';
import { ACTION_CHANGE_PRODUCT } from '../../ducks/product';
import { ACTION_USE_ADDING } from '../../ducks/cartListStatus';
import { ACTION_USE_REMOVING } from '../../ducks/cartListStatus';
import { ACTION_USE_AMOUNT } from '../../ducks/cartListStatus';

class CardEl extends React.Component { 
  handleCartClick = (e) => {
    if (e.target.tagName.toLowerCase() === 'span') return;
    const { history, name, changeProduct } = this.props;
    history.push(`/product/${name}`);
    changeProduct(name);
  };

  /*functions below listen for click event and send new data to store*/
  listenAddClick = () => {
    const { showAdding, data } = this.props;
    showAdding({ isOpen: true, product: data});
  }

  listenRemoveClick = () => {
    const { showRemoving, name } = this.props;
    showRemoving({ isOpen: true, product: name});
  }

  listenAmountClick = () => {
    const { showAmount, name } = this.props;
    showAmount({isOpen: true, product: name});
  }

  render() {
    const { name, link, prices, currency } = this.props; 
    const { attributes } = this.props.data;

    return (
      <Product onClick={this.handleCartClick}>
        <ProductImage url={link} />
        <Icon src={icon} alt="icon" />
        <Text>
          <NameTitle>{name}</NameTitle>
          <TextDetails>
            <div>
              <p>{
                prices.map((item) => {
                  let strAmount = '';
                  if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
                    strAmount = `${item.amount} ${currency}`;
                  }
                  return strAmount;
                })
              }</p>
              { attributes.length > 0 && attributes.map((i) => {
                let SwatchUl;
                if (i.type === 'swatch') {
                SwatchUl = <SwatchList key={i.type}> {i.items.map((item, index) => <SwatchEl color={item.value} key={index}></SwatchEl>)} </SwatchList>
                }
                return SwatchUl;
              })}
            </div>
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

export const ProductCard = withRouter(connect(mapStateToProps, mapDispatchToProps)(CardEl));