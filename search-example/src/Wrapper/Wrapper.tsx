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

    componentDidMount() {
        localStorage.removeItem('sbstate');
    }
    onSearch = (data: any) => {
        const results = [...this.state.results, data.result];

        console.log(results);
        if (results && results.length === 1) {
            results[0] = { total: 323, accepted: 22, ignored: 3 };
        } else if (results && results.length === 2) {
            results[1] = { total: 284, new: 8, search: "(\"Pfizer\" AND \"TheroZ\"...)" };
        }
        this.setState({ ...this.state, showSearchResult: data.show, results: results, activeTab: 0 });
    }

    handleSearchTab = () => {
        this.setState({
            ...this.state,
            showSearchResult: false,
            activeTab: -1
        });
    }
    handleResultTab = (id: number) => {
        if (this.state.results.length > 0) {
            this.setState({ ...this.state, showSearchResult: true, activeTab: id });
        }
    }

    getJSXElements = (res: any) => {
        return {
            results: res.new ? <span><b>{res.new}</b> of <b>{res.total}</b> Results</span> : <span><b>{res.total}</b> Results</span>,
            counts: res.search ?
                <div>
                    {res.search}
                </div>
                :
                <div className="result-count-dist">
                    <img src={Images.circleTick} title="" alt=""></img>
                    <span>{res.accepted}</span>
                    <img src={Images.circleCross} title="" alt=""></img>
                    <span>{res.ignored}</span>
                </div>

        }
    }

    removeSearchTab = (idx: number, e: any) => {
        const results = [...this.state.results];
        results.splice(idx, 1);
        this.setState({
            ...this.state,
            activeTab: idx - 1,
            results: results,
            showSearchResult: results.length > 0
        });
        e.stopPropagation();
    }

    extractResultTabs = () => {
        const curState: any = { ...this.state };

        return curState.results.map((res: any, idx: number) =>
            <div key={idx} className={curState.activeTab === idx ? "Tab nopad Active" : "Tab nopad"} onClick={() => this.handleResultTab(idx)}>
                <div className="search-tab">
                    <div><img src={Images.star} title="" alt=""></img></div>
                    <div className="result-count">
                        <div>{this.getJSXElements(res).results}</div>
                        {this.getJSXElements(res).counts}
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={(e:any) => this.removeSearchTab(idx, e)}><img src={Images.BlueClose} title="" alt=""></img></div>
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
                                    <Builder onReceivedSearch={(data: any) => this.onSearch(data)} />
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
