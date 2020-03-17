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
      <div key={idx} className={curState.activeTab === idx ? "Tab Active" : "Tab"} onClick={() => this.handleResultTab(idx)}>
        Search {idx + 1}
        <img src={Images.tick} title="" alt=""></img>
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
                  <div>Show Results</div>
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
