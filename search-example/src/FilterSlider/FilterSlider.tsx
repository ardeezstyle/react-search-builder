import * as React from 'react';
import './FilterSlider.css';

import * as Images from '../assets/images';

class FilterSlider extends React.Component<any, any>  {
  onClose = () => {
    this.props.closed();
  }
  public render() {
    return (
      <div className={this.props.status === 'open' ? "Slider Open" : "Slider"}>
        <div onClick={this.onClose}>
          <img src={Images.filterSlider} alt="darrow" />
        </div>
      </div>
    );
  }
}
export default FilterSlider;
