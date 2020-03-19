import * as React from 'react';
import './Slider.css';

import * as Images from '../assets/images';

class Slider extends React.Component<any, any>  {
  onClose = () => {
    this.props.closed();
  }
  public render() {
    return (
      <div className={this.props.status === 'open' ? "Slider Open" : "Slider"}>
        <div onClick={this.onClose}>
          <img src={Images.slider_top} alt="darrow" />
        </div>
        <div>
          <img src={Images.slider_body} alt="darrow" />
        </div>
      </div>
    );
  }
}
export default Slider;
