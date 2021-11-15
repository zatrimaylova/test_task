import React from 'react';
import { connect } from 'react-redux';

import { Container, HeaderForm, ProductName, Counter, DecreaseImg, CountSpan, CloseImg, ValidationTitle, OptionTitle, VarietyList, OneSize, ListEl, PriceContainer, Button, } from './styles.js';
import { ACTION_ADD_PRODUCT } from '../../ducks/cart';
import { ACTION_USE_ADDING } from '../../ducks/adding';

import close_icon from '../../img/ShortAddingForm/close.png';
import minus_image from '../../img/ShortAddingForm/minus_image.png';
import plus_image from '../../img/ShortAddingForm/plus_image.png';

class ShortAddingForm extends React.Component {
  state = {
    currentProduct: null,
    toCart: {
      name: null,
      attributes: [],
      count: 1,
      cartItemId: null,
      productData: null,
      toRender: [],
    },
    isSwatch: false,
    isUnvalid: false,
    clickedAttributes: [],
  };

  componentDidMount() {
    /* adds default product options to state */
    const { adding } = this.props;
    const productToAdd = adding.product;
    this.setState(prevState => ({
      ...prevState,
        currentProduct: productToAdd,
        toCart: {
          ...prevState.toCart,
          name: productToAdd.name,
          productData: productToAdd,
        }
    }));
          
    productToAdd.attributes.forEach((i) => {
      if (i.type === 'swatch') {
        this.setState(prevState => ({
          ...prevState,
          isSwatch: true,
        }));
      };
    })
    this.getImageFetch();
  };

  getImageFetch = () => {
    /* fetches images and adds it's links to arr in state if response status is 200 */
    const { gallery } = this.props.adding.product;
    gallery.map((item) => {
      try {
        fetch(item)
        .then((data) => {
          if (data.ok) {
            this.setState(prevState => ({
              ...prevState,
              toCart: {
                ...prevState.toCart,
                toRender: [...prevState.toCart.toRender, item],
              },  
            }));
          }
        })
      } catch (error) {
        console.log("Error Reading data " + error);
      }
    })  
  }

  handleAttributeClick = (e) => {
    /* listens for click event and adds selected options to state */
    if (e.target.tagName.toLowerCase() !== 'li') {
      return;
    };

    const { toCart } = this.state;
    const attributes = this.props.adding.product.attributes;
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
        cartItemId: this.getCartElementId(),
      },
      clickedAttributes: attributes.length === 1 ?[selectedValue] : [...prevState.clickedAttributes, selectedValue],
    }));
  };

  getCartElementId = () => {
    //creates and returns a unique ID
    const date = new Date();
    return date.getTime();
  };

  handleAddToCartClick = () => {
    /* listens for click event and uses action ACTION_ADD_PRODUCT to sent the product to the cart;
    checks form validation and and changes the validation status if options are not selected;
    sends the product to the cart and chandes a product info in state to default state*/
    const { currentProduct, toCart } = this.state;
    const { addToCart } = this.props;

    if (currentProduct.attributes.length === 0 && toCart.cartItemId) {
      addToCart(toCart);
    };

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

    if (attributesCount === selectedAttributesCount) {
      addToCart(toCart);
    };

    this.setState(prevState => ({
      ...prevState,
      toCart: {
        ...prevState.toCart,
        attributes: [],
        cartItemId: null,
      },
      isUnvalid: false,
    }));
    this.closeOverlay();
  };

  closeOverlay = () => {
    /* listens for click event and hides overlay by changing it's status in redux,
    doesn't delete products */
    const { showWarning } = this.props;
    showWarning({ isOpen: false, product: ''});
  }

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

  createAttributes = (data) => {
    /* gets product data and returns items with the option name and
    a list of available options to add to the cart*/
    if (data.length === 0) {
      return (
        <>
          <OptionTitle>SIZE:</OptionTitle>
          <VarietyList id='One size' onClick={this.handleAttributeClick}>
            <OneSize id='One size' value='One size' isActive={this.state.toCart.attributes.length !== 0 ? true : false}>
              One size
            </OneSize>
          </VarietyList>
        </>
      )
    } else if (data.length === 1) {
      const sizeEl = 
        <div> 
          <OptionTitle>{data[0].id.toUpperCase()}:</OptionTitle>
          <VarietyList id={data[0].id} onClick={this.handleAttributeClick}>
            { data[0].items.map((item) => {
              if (item.type === 'swatch') {
                return (
                  <ListEl type={item.type} 
                    isActive={this.state.toCart.attributes.filter((i) => i.value === item.id).length ? false : true}    
                    color={item.value} value={item.value} id={item[0].id} key={item.id}>
                    {item.displayValue}
                  </ListEl>
                ) 
              } else {
                return (
                  <ListEl id={item.id} 
                    isActive={this.state.toCart.attributes.filter((i) => i.value === item.value).length ? true : false} 
                    value={item.value} key={item.id}>
                    {item.displayValue}
                  </ListEl>
                )
              }
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
                    <ListEl id={i.id} value={i.value} key={i.id} color={i.value}
                      isActive={this.state.toCart.attributes.filter((item) => item.option !== i.id && item.value === i.id).length === 0 ? false : true}>
                      {i.displayValue}
                    </ListEl>
                  )
                } else {
                  return (
                    <ListEl id={i.id} value={i.value} key={i.id} 
                      isActive={this.state.toCart.attributes.filter((el) => item.id === el.option && el.value === i.id).length === 0 ? false : true}>
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
    const { currency, adding } = this.props;
    const { isUnvalid, toCart } = this.state;
    const productToAdd = adding.product;

    return(
      <>
        <Container>
          <HeaderForm>
            <ProductName>{productToAdd && productToAdd.name}</ProductName>
            <Counter onClick={this.changeCount}>
              <div>
                <DecreaseImg src={minus_image} alt="-" id="decrease" />
              </div>
              <CountSpan>{this.state.toCart.count}</CountSpan>
              <div>
                <img visibility={toCart.count} src={plus_image} alt="+" id="increase" />
              </div>
            </Counter>
          </HeaderForm>
          <CloseImg onClick={this.closeOverlay} src={close_icon} alt="✕" />
          {isUnvalid && <ValidationTitle>Please select options below</ValidationTitle>}
          <div>
            {productToAdd && this.createAttributes(productToAdd.attributes)}
          </div>
          <PriceContainer>
            <h3>PRICE:</h3>
            {productToAdd && productToAdd.prices.map((item, index) => {
              let countTitle;
              if (String(item.currency).toUpperCase() === String(currency).toUpperCase()) {
                countTitle = <h2 key={index}>{item.amount} {currency}</h2>;
              }
              return countTitle;
            })}
          </PriceContainer>
          <Button onClick={this.handleAddToCartClick} >ADD TO CART</Button>
        </Container> 
      </>  
    )
  };
};

const mapStateToProps = ({ currency, adding }) => ({
  currency: currency.currency,
  adding: adding.adding,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (value) => dispatch(ACTION_ADD_PRODUCT(value)),
  showWarning: (value) => dispatch(ACTION_USE_ADDING(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortAddingForm);