import React from 'react';

import {
  Overlay,
  OverlayBody,
} from './styles';

class OverlayBackground extends React.Component {
  render() {
    return (
      <Overlay>
        <OverlayBody>
          {this.props.children}
        </OverlayBody>
      </Overlay>
    )
  }
}

export default OverlayBackground;