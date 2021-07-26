import React from 'react';
import { connect } from 'react-redux';

import { Container, Button, VarietyList, ListEl, ValidationTitle, OneSize, ProductName, OptionTitle, PriceContainer } from './style';

import { ACTION_ADD_PRODUCT } from '../../ducks/cart';

class AddingToCartForm extends React.Component {
  state = {
    currentProduct: null,
    toCart: {
      name: null,
      attributes: [],
      count: null,
      cartItemId: null,
      productData: null,
    },
    isSwatch: false,
    isUnvalid: false,
  };

  componentDidMount() {
    const products = this.props?.data?.category?.products;
    const loading = this.props?.data?.loading;
    const { product } = this.props;

    if (!loading) {
      products.map((item) => {
        if (String(item.name).toUpperCase() === String(product).toUpperCase()) {
          this.setState(prevState => ({
            ...prevState,
            currentProduct: item,
            toCart: {
              ...prevState.toCart,
              name: item.name,
              productData: item,
            }
          }));
          
          item.attributes.map((i) => {
            if (i.type === 'swatch') {
              this.setState(prevState => ({
                ...prevState,
                isSwatch: true,
              }));
            };
          });
        };
      });
    };
  };

  handleAttributeClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'li') {
      return;
    };

    const { toCart } = this.state;
    const selectedValue = e.target.id;
    const selectedOption = e.target.closest('ul').id;
    let optionsData = toCart.attributes ? toCart.attributes.slice() : [];
    const selected = { option: selectedOption, value: selectedValue };


    if (optionsData.length) {
      optionsData.forEach((element) => {
        if (element.option === selectedOption) {
          optionsData = optionsData.filter((item) => item.option !== selectedOption);
        };
      });
      optionsData.push(selected);
    } else if (optionsData.length === 0) {
      optionsData.push(selected);
    };

    this.setState(prevState => ({
      ...prevState,
      toCart: {
        ...prevState.toCart,
        attributes: optionsData,
        count: 1,
        cartItemId: this.getCartElementId(),
      },
    }));
  };

  getCartElementId = () => {
    const date = new Date;
    return date.getTime();
  };

  handleAddToCartClick = () => {
    const { currentProduct, toCart } = this.state;
    const { addToCart } = this.props;

    if (currentProduct.attributes.length === 0 && toCart.cartItemId) {
      addToCart(toCart);
    };

    if (toCart.attributes.length === 0) {
      this.setState(prevState => ({
        ...prevState,
        isUnvalid: true,
      }));
      return;
    };

    this.setState(prevState => ({
      ...prevState,
      isUnvalid: false,
      toCart: {
        ...prevState.toCart,
      },
    }));

    const attributesCount = currentProduct.attributes.length;
    const selectedAttributesCount = toCart.attributes.length;

    if (attributesCount === selectedAttributesCount) {
      addToCart(toCart);
    };
  };

  createAttributes = (data) => {
    if (data.length === 0) {
      return (
        <>
          <OptionTitle>SIZE:</OptionTitle>
          <VarietyList id='One size' onClick={this.handleAttributeClick}>
            <OneSize id='One size' value='One size'>One size</OneSize>
          </VarietyList>
        </>
      )
    } else if (data.length === 1) {
      const sizeEl = 
      <div> 
        <OptionTitle>{data[0].id.toUpperCase()}:</OptionTitle>
        <VarietyList id={data[0].id} onClick={this.handleAttributeClick}>
          {data[0].items.map((item) => {
            const result = item.type === 'swatch'
            ? <ListEl type={item.type} color={item.value} value={item.value} id={item[0].id} key={item.id}>{item.displayValue}</ListEl> 
            : <ListEl id={item.id} value={item.value} key={item.id}>{item.displayValue}</ListEl>
            return result;
          })}
        </VarietyList> 
      </div>
      return sizeEl;
    } else {
      const variety = <div>
        {data.map((item, index) => {
          const list = <div key={index}> 
            <OptionTitle>{item.id}:</OptionTitle>
            <VarietyList id={item.id} onClick={this.handleAttributeClick}>
              {item.items.map((i) => {
                if (item.type === 'swatch') {
                  return (
                    <ListEl id={i.id} value={i.value} key={i.id} color={i.value}>
                      {i.displayValue}
                    </ListEl>
                  )
                } else {
                  return (
                  <ListEl id={i.id} value={i.value} key={i.id}>
                    {i.displayValue}
                  </ListEl>
                  )
                };
              })}
            </VarietyList>
          </div>
          return list;
        })}
      </div>
      return variety;
    }
  }

  render() {
    const { currency, product } = this.props;
    const { currentProduct, isUnvalid } = this.state;
    const attributes = currentProduct?.attributes;

    return(
      <Container>
        <ProductName>{currentProduct && currentProduct.name}</ProductName>
        {isUnvalid && <ValidationTitle>Please select options below</ValidationTitle>}
        <div>
          {attributes && this.createAttributes(attributes)}
        </div>

        <PriceContainer>
          <h3>PRICE:</h3>
          {currentProduct && currentProduct.prices.map((item, index) => {
            if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
              return <h2 key={index}>{item.amount} {currency}</h2>
            }
          })}
        </PriceContainer>
        <Button onClick={this.handleAddToCartClick} >ADD TO CART</Button>
      </Container>
    )
  };
};

const mapStateToProps = ({ product, currency }) => ({
  product: product.product,
  currency: currency.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (value) => dispatch(ACTION_ADD_PRODUCT(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddingToCartForm);