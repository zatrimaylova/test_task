import React from 'react';

import { Container, ViewContainer, ImageSlider, PreviewContainer, Preview, View, TextContainer } from './style';

class ProductGallery extends React.Component {
  state = {
    activeImg: 0,
    imgArr: '',
  }

  componentDidMount() {
    this.getImageFetch();
  };

  getImageFetch = () => {
    const { data } = this.props;

    data.map((item) => {
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
    this.setState(prevState => ({
      ...prevState,
      activeImg: e.target.id,
    }));

    const { data } = this.props;
    const maxTop = data.length - 3 * -112 + 'px';
    const sliderEl = e.target.closest('ul');
    const coordToSlide = `-${e.target.closest('li').id * 112}px`;

    if (maxTop < coordToSlide) {
      sliderEl.style.top = 0;
    } else {
      sliderEl.style.top = coordToSlide;
    }
  }

  createMarkup(data) {
    return {__html: data};
  }

  getDescription = (data) => {
    const isTag = new RegExp("(?:</[^<]+>)|(?:<[^<]+/>)");
    const checkingResult = isTag.exec(data);
    if (checkingResult) {
      return <div dangerouslySetInnerHTML={this.createMarkup(data)} />;
    } else {
      return <p>{data}</p>;
    }
  };

  render() {
    const { description } = this.props;
    const { activeImg } = this.state;

    return(
      <Container>
        <ViewContainer>
          <ImageSlider>
            <PreviewContainer  onClick={this.handleGalleryClick}>
              { this.state.imgArr.length > 1 && this.state.imgArr.map((item, index) =>{
                return <Preview key={index} id={index} url={item} />
              })}
              { this.state.imgArr.length === 1 && this.state.imgArr.map((item, index) => {
                return (
                  <>
                    <Preview key={0} id={index} url={item} />
                    <Preview key={1} id={index} url={item} />
                    <Preview key={2} id={index} url={item} />
                  </>
                )
              })}
            </PreviewContainer>
          </ImageSlider>
          <View url={this.state.imgArr[activeImg]} />
        </ViewContainer>
        <div>
          {this.props.children}
          <TextContainer>
            {this.getDescription(description)}
          </TextContainer>
        </div>
      </Container>
    )
  }
}

export default ProductGallery;