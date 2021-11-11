import React from 'react';

import { Container, ViewContainer, ImageSlider, PreviewContainer, Preview, View, TextContainer } from './style';

class ProductGallery extends React.Component {

  state = {
    activeImg: 0,
  }

  handleGalleryClick = (e) => {
    this.setState(prevState => ({
      ...prevState,
      activeImg: e.target.id,
    }));
    const { data } = this.props;
    const maxTop = data.length - 3;
    const sliderEl = e.target.closest('ul');
    const a = `-${e.target.id * 112}px`;
    if (maxTop * -112 + 'px' < `-${e.target.closest('li').id * 112}px`) {
      sliderEl.style.top = 0;
    } else {
      sliderEl.style.top = `-${e.target.closest('li').id * 112}px`;
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
    const { data, description } = this.props;
    const { activeImg } = this.state;

    return(
      <Container>
        <ViewContainer>
          <ImageSlider>
            <PreviewContainer  onClick={this.handleGalleryClick}>
              { data.length > 1 && data.map((item, index) =>{
                return <Preview key={index} id={index} url={item} />
              })}
              { data.length === 1 && data.map((item, index) => {
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
          <View url={data[activeImg]} />
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