import React from 'react';
import { connect } from 'react-redux';

import { Container, HeaderForm, ProductName, Counter, DecreaseImg, CountSpan, ValidationTitle, OptionTitle, VarietyList, ListEl, OneSize, PriceContainer, Button, } from './style';
import { ACTION_ADD_PRODUCT } from '../../ducks/cart';

import minus_image from '../../img/AddingToCartForm/minus_image.png';
import plus_image from '../../img/AddingToCartForm/plus_image.png';

class AddingToCartForm extends React.Component {
  state = {
    currentProduct: null,
    toCart: {
      name: null,
      attributes: [],
      count: 1,
      cartItemId: null,
      productData: null,
      toRender: null,
    },
    isSwatch: false,
    isUnvalid: false,
    clickedAttributes: [],
  };

  componentDidMount() {
    /* adds default product options to state */
    const loading = this.props?.data?.loading;
    const { product, products } = this.props;

    if (loading) return; 
    products.forEach((item) => {
      if (String(item.name).toUpperCase() === String(product).toUpperCase()) {
        this.setState(prevState => ({
          ...prevState,
          currentProduct: item,
          toCart: {
            ...prevState.toCart,
            name: item.name,
            productData: item,
            toRender: this.props.toRender,
          }
        }));
          
        item.attributes.forEach((i) => {
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

  handleAttributeClick = (e) => {
    /* listens for click event and adds selected options to state */
    if (e.target.tagName.toLowerCase() !== 'li') return;

    const { toCart } = this.state;
    const selectedValue = e.target.id;
    const selectedOption = e.target.closest('ul').id;
    let optionsData = toCart.attributes ? toCart.attributes.slice() : [];
    const selected = { option: selectedOption, value: selectedValue };

    if (optionsData.length) {
      optionsData.forEach((element) => {
        if (element.option === selectedOption) optionsData = optionsData.filter((item) => item.option !== selectedOption);
      });
      optionsData.push(selected);
    } else if (optionsData.length === 0) optionsData.push(selected);

    this.setState(prevState => ({
      ...prevState,
      toCart: {
        ...prevState.toCart,
        attributes: optionsData,
        cartItemId: this.getCartElementId(),
        toRender: this.props.toRender,
      },
      clickedAttributes: [...prevState.clickedAttributes, selectedValue],
    }));
  };

  getCartElementId = () => {
    //creates and returns a unique ID
    const date = new Date();
    return date.getTime();
  };

  changeCount = (e) => {
    /* listens for click event and changes amount in state */
    const currentClick = e.target.tagName;
    if (currentClick.toLowerCase() !== 'img') return;
    let currentCount = this.state.toCart.count;
    if (e.target.id === 'increase') {
      currentCount++;
    } else {
      if (currentCount === 1) return;
      currentCount--;
    }
    this.setState(prevState => ({
      ...prevState,
      toCart: {
        ...prevState.toCart,
        count: currentCount,
      },
    }));
  }

  handleAddToCartClick = () => {
    /* listens for click event and uses action ACTION_ADD_PRODUCT to sent the product to the cart;
      checks form validation and and changes the validation status if options are not selected;
      sends the product to the cart and chandes a product info in state to default state*/
    const { currentProduct, toCart } = this.state;
    const { addToCart } = this.props;

    if (currentProduct.attributes.length === 0 && toCart.cartItemId) addToCart(toCart);

    if (toCart.attributes.length === 0 || toCart.attributes.length < currentProduct.attributes.length) {
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

    if (attributesCount === selectedAttributesCount) addToCart(toCart);

    this.setState(prevState => ({
      ...prevState,
      toCart: {
        ...prevState.toCart,
        attributes: [],
        cartItemId: null,
        count: 1,
      },
      isUnvalid: false,
    }));
  };

  createAttributes = (data) => {
    /* gets product data and returns items with the option name and
     a list of available options to add to the cart*/
    const { attributes } = this.state.toCart;
    if (data.length === 0) {
      return (
        <>
          <OptionTitle>SIZE:</OptionTitle>
          <VarietyList id='One size' onClick={this.handleAttributeClick}>
            <OneSize id='One size' value='One size'
              isActive={attributes.filter((item) => item.option === 'One size' && item.value === 'One size').length ? true : false}>
              One size
            </OneSize>
          </VarietyList>
        </>
      )
    } else if (data.length === 1) {
      return (
        <div> 
          <OptionTitle>{data[0].id.toUpperCase()}:</OptionTitle>
          <VarietyList id={data[0].id} onClick={this.handleAttributeClick}>
            {data[0].items.map((item) => {
              if (item.type === 'swatch') {
                return (
                  <ListEl type={item.type} color={item.value} value={item.value} id={item[0].id} key={item.id}
                  isActive={attributes.filter((i) => i.value === item.id).length ? false : true} >
                    {item.displayValue}
                  </ListEl> 
                )
              } else {
                return (
                  <ListEl id={item.id} value={item.value} key={item.id}
                  isActive={attributes.filter((i) => i.value === item.value).length ? true : false} >
                    {item.displayValue}
                  </ListEl>
                )
              }
            })}
          </VarietyList> 
        </div>
      )
    } else {
      return (
        <div>
          {data.map((item, index) => {
            return (
              <div key={index}> 
                <OptionTitle>{item.id}:</OptionTitle>
                <VarietyList id={item.id} onClick={this.handleAttributeClick}>
                  {item.items.map((i) => {
                    if (item.type === 'swatch') {
                      return (
                        <ListEl id={i.id} value={i.value} key={i.id} color={i.value}
                        isActive={attributes.filter((item) => item.option !== i.id && item.value === i.id).length === 0 ? false : true} >
                          {i.displayValue}
                        </ListEl>
                      )
                    } else {
                      return (
                      <ListEl id={i.id} value={i.value} key={i.id} 
                        isActive={attributes.filter((el) => item.id === el.option && el.value === i.id).length === 0 ? false : true} >
                        {i.displayValue}
                      </ListEl>
                      )
                    };
                  })}
                </VarietyList>
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    const { currency } = this.props;
    const { currentProduct, isUnvalid, toCart } = this.state;
    const attributes = currentProduct?.attributes;

    return(
      <Container>
        <HeaderForm>
          <ProductName>{currentProduct && currentProduct.name}</ProductName>
          <Counter onClick={this.changeCount}>
            <div>
              <DecreaseImg src={minus_image} alt="-" id="decrease" color={toCart.count > 1 ? 1 : 0} />
            </div>
            <CountSpan>{this.state.toCart.count}</CountSpan>
            <div>
              <img src={plus_image} alt="+" id="increase" />
            </div>
          </Counter>
        </HeaderForm>
        {isUnvalid && <ValidationTitle>Please select options below</ValidationTitle>}
        <div> {attributes && this.createAttributes(attributes)} </div>
        <PriceContainer>
          <h3>PRICE:</h3>
          {currentProduct && currentProduct.prices.map((item, index) => {
            let countTitle;
            if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
              countTitle = <h2 key={index}>{item.amount} {currency}</h2>;
            }
            return countTitle;
          })}
        </PriceContainer>
        <Button onClick={this.handleAddToCartClick}>ADD TO CART</Button>
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