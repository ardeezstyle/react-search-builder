import * as React from 'react';
import './Wrapper.css';
import * as Images from '../assets/images';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Builder from '../Builder/Builder';

class Wrapper extends React.Component<any, any>  {
  state = {
    showSearchResult: false,
    results: [],
    activeTab: 0
  }

  onSearch = (data: any) => {
    const results = [...this.state.results, data.result];
    this.setState({...this.state, showSearchResult: data.show, results: results, activeTab: 0});
  }

  handleSearchTab = () => {
    this.setState({...this.state, showSearchResult: false, activeTab: -1});
  }
  handleResultTab = (id: number) => {
    this.setState({...this.state, showSearchResult: true, activeTab: id});
  }

  extractResultTabs = () => {
    const curState: any = {...this.state};

    return curState.results.map((res: any, idx: number) =>
      <div key={idx} className={curState.activeTab === idx ? "Tab nopad Active" : "Tab nopad"} onClick={() => this.handleResultTab(idx)}>
        <div className="search-tab">
          <div><img src={Images.star} title="" alt=""></img></div>
          <div className="result-count">
            <div>25 Results</div>
            <div className="result-count-dist">
              <img src={Images.circleTick} title="" alt=""></img>
              <span>22</span>
              <img src={Images.circleCross} title="" alt=""></img>
              <span>3</span>
            </div>
          </div>
          <div><img src={Images.BlueClose} title="" alt=""></img></div>
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div className="Wrapper">
        <Sidebar />
        <div className="Content">
          <Header />
          <div className="Body">
            <div className="TabComponent">
              <div className="Tabs">
                {this.state.showSearchResult ?
                  <React.Fragment>
                    <div className="Tab" onClick={this.handleSearchTab}>
                      <img src={Images.search} title="" alt=""></img>
                    </div>
                    {this.extractResultTabs()}
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div className="Tab Active">
                      <img src={Images.search} title="" alt=""></img>
                      <span>Search</span>
                    </div>
                    {this.extractResultTabs()}
                  </React.Fragment>

                }
              </div>
              <div className="TabContent">
                {this.state.showSearchResult ?
                  <img className="search-result" src={Images.searchResult} title="" alt="" />
                  :
                  <Builder onReceivedSearch={(data: any) => this.onSearch(data)}/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Wrapper;
