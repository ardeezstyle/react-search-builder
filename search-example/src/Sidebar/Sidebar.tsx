import * as React from 'react';
import './Sidebar.css';
import * as Images from '../assets/images';

class Sidebar extends React.Component<any, any>  {

  public render() {
    return (
      <div className="Sidebar">
        <div className="TopPanel">
          <div className="Logo"><img src={Images.logo} title="" alt=""></img></div>
          <div className="ExpandCollapseHandle"><img src={Images.expand} title="" alt=""></img></div>
        </div>
        <div className="Navigation">
          <ul>
            <li>
              <img className="active" src={Images.activeLink} title="" alt=""></img>
              <img src={Images.search} title="" alt=""></img>
            </li>
            <li>
              <img src={Images.copy} title="" alt=""></img>
            </li>
            <li>
              <img src={Images.file} title="" alt=""></img>
            </li>
            <li>
              <img src={Images.edit} title="" alt=""></img>
            </li>
            <li>
              <img src={Images.list} title="" alt=""></img>
            </li>
            <li>
              <img src={Images.trash} title="" alt=""></img>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
