import React from 'react';

import { Container, ViewContainer, PreviewContainer, Preview, View, TextContainer } from './style';

class ProductGallery extends React.Component {

  state = {
    activeImg: 0,
  }

  handleGalleryClick = (e) => {
    this.setState(prevState => ({
      ...prevState,
      activeImg: e.target.id,
    }));
  }

  createMarkup(data) {
    return {__html: data};
  }

  getDescription = (data) => {
    const isTag = new RegExp("(?:</[^<]+>)|(?:<[^<]+/>)");
    const checkingResult = isTag.exec(data)
    if (checkingResult) {
      return <div dangerouslySetInnerHTML={this.createMarkup(data)} />
    } else {
      return <p>{data}</p>
    }
  };

  render() {
    const { data, description } = this.props;
    const { activeImg } = this.state;
    console.log(data)
    return(
      <Container>
        <ViewContainer>
          <div>
            {
              data.map((item, index) => {
                if (data.length === 1) {
                  return (
                    <PreviewContainer>
                      <Preview key={0} id={index} url={item} onClick={this.handleGalleryClick}/>
                      <Preview key={1} id={index} url={item} onClick={this.handleGalleryClick}/>
                      <Preview key={2} id={index} url={item} onClick={this.handleGalleryClick}/>
                    </PreviewContainer>
                  )
                } else {
                  return <Preview key={index} id={index} url={item} onClick={this.handleGalleryClick}/>;
                }
              })
            } 
          </div>
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