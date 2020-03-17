import * as React from 'react';
import './Header.css';
import * as Images from '../assets/images';

class Sidebar extends React.Component<any, any>  {

  public render() {
    return (
      <div className="Header">
        <div className="Spacer"></div>
        <div className="Utility">

          <div className="Notification">
            <img className="count" src={Images.count} title="" alt=""></img>
            <img src={Images.notification} title="" alt=""></img>
          </div>

          <div>
            <img className="photo" src={Images.photo} title="" alt=""></img>
          </div>

          <div className="username">
            Susane Bateson
          </div>

          <div>
            <img src={Images.dots} title="" alt=""></img>
          </div>


        </div>
      </div>
    );
  }
}
export default Sidebar;
