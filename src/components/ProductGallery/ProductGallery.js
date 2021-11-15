import React from 'react';

import { Container, ViewContainer, ImageSlider, PreviewContainer, Preview, View, TextContainer } from './styles.js';

import AddingToCartForm from '../AddingToCartForm/AddingToCartForm.js';

class ProductGallery extends React.Component {
  state = {
    activeImg: 0,
    imgArr: '',
  }

  componentDidMount() {
    this.getImageFetch();
  };

  getImageFetch = () => {
    /* fetches images and adds it's links to arr in state if response status is 200 */
    const { gallery } = this.props;

    gallery.map((item) => {
      try {
        fetch(item)
        .then((data) => {
          if (data.ok) {
            this.setState(prevState => ({
              ...prevState,
              imgArr: [...prevState.imgArr, item],
            }));
          }
        })
      } catch (error) {
        console.log("Error Reading data " + error);
      }
    })  
  } 

  handleGalleryClick = (e) => {
    // listens for click event, changes style of PreviewContainer, sets active image in state
    this.setState(prevState => ({
      ...prevState,
      activeImg: e.target.id,
    }));

    const { imgArr } = this.state;
    const maxTop = `${(imgArr.length - 3) * -112}px`;
    const sliderEl = e.target.closest('ul');
    const coordToSlide = `${Number(e.target.closest('li').id) * -112}px`;

    sliderEl.style.top = (maxTop < coordToSlide) ? 0 : coordToSlide;
  }

  createMarkup(data) {
    // parses data and returns html format
    return {__html: data};
  }

  getDescription = (data) => {
    // checks description, parse if its needed, returns elements to render
    const isTag = new RegExp("(?:</[^<]+>)|(?:<[^<]+/>)");
    const checkingResult = isTag.exec(data);
    if (checkingResult) {
      return <div dangerouslySetInnerHTML={this.createMarkup(data)} />;
    } else {
      return <p>{data}</p>;
    }
  };

  render() {
    const { description, children } = this.props;
    const { activeImg, imgArr } = this.state;

    return(
      <Container>
        <ViewContainer>
          <ImageSlider>
            <PreviewContainer  onClick={this.handleGalleryClick}>
              { imgArr.length > 1 && imgArr.map((item, index) =>{
                return <Preview key={index} id={index} url={item} />
              })}
              { imgArr.length === 1 && imgArr.map((item, index) => {
                let listEl;
                for (let i = 0; i < 3; i++) {
                  listEl = <Preview key={i} id={index} url={item} />
                }
                return listEl;
              })}
            </PreviewContainer>
          </ImageSlider>
          <View url={imgArr[activeImg]} />
        </ViewContainer>
        <div>
          <AddingToCartForm toRender={imgArr} {...this.props} />
            { children }
          <TextContainer>
            {this.getDescription(description)}
          </TextContainer>
        </div>
      </Container>
    )
  }
}

export default ProductGallery;