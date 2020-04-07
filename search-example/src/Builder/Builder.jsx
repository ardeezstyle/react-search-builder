import * as React from 'react';
import './Builder.css';

import Autosuggest from '../Autosuggest/Autosuggest';
import * as Images from '../assets/images';
import Slider from '../Slider/Slider';
import FilterSlider from '../FilterSlider/FilterSlider';

const DATA = [
    "Johnson and johnson",
    "GTemp",
    "Influenza Vaccines",
    "Viral Vaccines",
    "Flu Vaccines",
    "Pfizer",
    "TheroZ",
    "Flu Vaccine",
    "Flu Vaccine Effectiveness",
    "Universal Flu Vaccine",
    "Viral",
    "Viral Infection",
    "Viral Pneumonia",
    "Viral Hepatitis",
    "Virus",
    "Influenza Virus",
    "Zika Virus",
    "Corona Virus",
    "Virus Infection"
];

// interface ICondition {
//     id: number;
//     operator?: string;
//     operand: ICondition[];
//     focus?: boolean;
//     bookmarked?: boolean;
// }
//
// interface IState {
//     conditions: ICondition[];
//     tempconditions: ICondition[];
//     excludeConditions?: any[];
//     excludeControlFocus?: any;
//     showSlider?: boolean;
//     showFilterSlider?: boolean;
//     valid: boolean;
//     showAdvance?: boolean;
//     expression?: string;
//
//     // excludeExpression?: string;
//
//     conds?: any[];
//     cnds?: any[];
//     cnds_last?: any[];
// }

const initialState = {
    conditions: [{ id: 1, operand: [] }],
    tempconditions: [{ id: 1, operand: [] }],
    excludeConditions: [],
    excludeControlFocus: false,
    showSlider: false,
    showFilterSlider: false,
    valid: true,
    showAdvance: true,
    expression: '',

    conds: [],
    cnds: [],
    cnds_last: []
};

class Builder extends React.Component {

    state = initialState;
    operatorsRegex = /\bAND\b|\bOR\b|\bNOT\b/g;
    parenthesisRegex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;

    componentDidMount() {
        const sbstate = localStorage.getItem('sbstate');
        if (sbstate) {
            const sbstateObj = JSON.parse(sbstate);
            this.setState({
                ...this.state,
                conditions: sbstateObj.conditions,
                excludeConditions: sbstateObj.exclude
            }, () => {
                this.updateExpression();
            });
        }
    }

    getIdx = (id) => {
        return this.state.conditions.findIndex(c => c.id === id);
    }

    genIdx = () => {
        const len = this.state.conditions.length;
        const lastId = +this.state.conditions[len - 1].id;
        return lastId + 1;
    }

    isLastElement = (c) => {
        if (this.state.conditions.length === this.getIdx(c.id) + 1) return true;
        return false;
    }

    isFirstElement = (c) => {
        if (this.getIdx(c.id) === 0) return true;
        return false;
    }

    removeConditionHandler = (id) => {
        const idx = this.getIdx(id);
        const updatedConditions = [...this.state.conditions];
        if (updatedConditions.length > 1) {
            updatedConditions.splice(idx, 1);
            delete updatedConditions[0].operator;
            this.setState({
                ...this.state,
                conditions: updatedConditions
            })
        }
    }

    addConditionHandler = () => {
        const newCond = {
            id: this.genIdx(),
            operator: 'AND',
            operand: []
        }
        const updatedConditions = [...this.state.conditions, newCond];
        this.setState({
            ...this.state,
            conditions: updatedConditions
        })
    }

    handleOperatorChange = (e, id) => {
        const idx = this.getIdx(id);
        const updatedCondition = { ...this.state.conditions[idx], operator: e.target.value };
        const updatedConditions = [...this.state.conditions];
        updatedConditions[idx] = updatedCondition;
        this.setState({
            ...this.state,
            conditions: updatedConditions
        })
    }

    handleConditionOperatorChange = (e, id, cIdx) => {
        const idx = this.getIdx(id);
        const updatedConditionOperator = { ...this.state.conditions[idx].operand[cIdx], operator: e.target.value };
        const updatedConditions = [...this.state.conditions];
        updatedConditions[idx].operand[cIdx] = updatedConditionOperator;

        this.setState({
            ...this.state,
            conditions: updatedConditions
        }, () => {
            this.updateExpression();
        });
    }

    getOperator(c) {
        if (c.operator) {
            return <div className="operator-top-level">
                <select value={c.operator} onChange={(event) => this.handleOperatorChange(event, c.id)}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                </select>
                <img className="small-icon" src={Images.darrow} alt="darrow" />
            </div>
        }
        else return null
    }

    getConditionOperator(c, cIndex, idx) {
        if (c.operator) {
            return <div className="operator">
                <select value={c.operator} onChange={(event) => this.handleConditionOperatorChange(event, cIndex, idx)}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                </select>
                <img className="small-icon" src={Images.darrow} alt="darrow" />
            </div>
        }
        else return null
    }

    allFieldOptions() {
        return <div className="all-field-options">
            <select>
                <option value="AND">All Fields</option>
                <option value="OR">Option 1</option>
                <option value="OR">Option 2</option>
                <option value="OR">Option 3</option>
            </select>
            <img className="small-icon" src={Images.dropdown} alt="darrow" />
        </div>
    }

    removeSingleCondition = (cIndex, id) => {
        const idx = this.getIdx(cIndex);
        const updatedConditions = [...this.state.conditions];
        const conditions = updatedConditions[idx].operand;

        conditions.splice(id, 1);
        if (conditions.length > 0) {
            delete conditions[0].operator;
        }

        this.setState({
            ...this.state,
            conditions: updatedConditions
        }, () => {
            this.updateExpression();
        });
    }

    removeSingleExcludeCondition = (id) => {
        console.log(id);
        let updatedConditions = [];
        if(this.state.excludeConditions && this.state.excludeConditions.length > 0) {
            updatedConditions = [...this.state.excludeConditions];

            updatedConditions.splice(id, 1);
            if (updatedConditions.length > 0) {
                delete updatedConditions[0].operator;
            }

            this.setState({
                ...this.state,
                excludeConditions: updatedConditions
            }, () => {
                this.updateExpression();
            });
        }
    }

    handleSuggestion = (data, id) => {
        const idx = this.getIdx(id);
        let condition = {
            operand: data
        }

        if (this.state.conditions[idx].operand.length > 0) {
            condition = {
                operand: data,
                operator: 'AND'
            };
        }

        const updatedConditions = [...this.state.conditions];
        updatedConditions[idx].operand = [...updatedConditions[idx].operand, condition];
        this.setState({
            ...this.state,
            conditions: updatedConditions
        }, () => {
            this.updateExpression();
        });

    }

    handleExcludeSuggestion = (data) => {
        console.log(data);
        const prevState = { ...this.state };

        let condition = {
            operand: data
        }

        if (prevState.excludeConditions && prevState.excludeConditions.length > 0) {
            condition = {
                operand: data,
                operator: 'AND'
            };
        } else {
            prevState.excludeConditions = [];
        }

        const updatedState = { ...prevState, excludeConditions: [...prevState.excludeConditions, condition] };
        this.setState(updatedState, () => {
            this.updateExpression();
        });

    }


    // Search expression
    getConditionString = (conditions) => {
        let condString = '';
        conditions.map((condition) => {
            if (Object.keys(condition).length > 0) {
                if (typeof condition['operand'] === 'string') {
                    if (condition['operator']) condString += condition['operator'];
                    condString += ' "' + condition['operand'] + '" ';
                } else {
                    if (condition['operator']) condString += condition['operator'];
                    condString += " (";
                    condString += this.getConditionString(condition['operand']);
                    condString += ") ";
                }
            }
            return condition;
        })
        return condString;
    }

    extractConditionString = () => {
        return this.getConditionString(this.state.conditions);
    }

    extractExcludeConditionString = () => {
        if(this.state.excludeConditions && this.state.excludeConditions.length > 0) {
            return this.getConditionString(this.state.excludeConditions);
        } else {
            return "";
        }
    }

    updateExpression = () => {
        const updatedExpression = this.extractConditionString();
        const updatedExcludeExpression = this.extractExcludeConditionString();
        const prevState = { ...this.state };

        if (updatedExpression !== '') {
            if (updatedExcludeExpression !== '') {
                prevState.expression = updatedExpression + "NOT (" + updatedExcludeExpression + ")"
            } else {
                prevState.expression = updatedExpression;
            }
        }
        this.setState(prevState);
    }

    handleSwitch = () => {
        this.setState({
            ...this.state,
            showAdvance: !this.state.showAdvance
        })
    }

    onSearch() {
        const sbstate = {
            conditions: this.state.conditions,
            exclude: this.state.excludeConditions
        };

        localStorage.setItem('sbstate', JSON.stringify(sbstate));
        this.props.onReceivedSearch({ show: true, result: {} });
    }

    handleSlider = (cn, id) => {
        this.setState({
            ...this.state,
            showSlider: true
        });
        console.log(cn, id);
    }
    handleFilterSlider = () => {
        this.setState({
            ...this.state,
            showFilterSlider: true
        });
    }

    getExcludeConditionOperator(cn, idx) {
        if (cn.operator) {
            return <div className="operator">
                <select defaultValue={cn.operator}>
                    <option value="AND">AND</option>
                </select>
            </div>
        }
        else return null
    }

    handleExcludeConditions() {
        const excludeConditions = this.state.excludeConditions;
        if (excludeConditions && excludeConditions.length > 0) {
            return excludeConditions.map((cn, idx) =>
                <React.Fragment key={Math.random()}>
                    {this.getExcludeConditionOperator(cn, idx)}
                    <div className="condition-wrapper">
                        <div className="condition">
                            <div>
                                <div>{cn.operand}</div>
                                {this.allFieldOptions()}
                            </div>
                            <div>
                                <div style={{cursor: "pointer"}}
                                    onClick={() => this.removeSingleExcludeCondition(idx)}>
                                    <img className="small-icon" src={Images.close} alt="close" /></div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    handleControlFocus = (bool = false, id) => {
        const idx = this.getIdx(id);
        const prevState = { ...this.state };
        prevState.conditions[idx].focus = bool;
        this.setState(prevState);
    }

    handleExcludeControlFocus = (bool = false) => {
        this.setState({ ...this.state, excludeControlFocus: bool });
    }

    closeSlider = () => {
        this.setState({ ...this.state, showSlider: false });
    }
    closeFilterSlider = () => {
        this.setState({ ...this.state, showFilterSlider: false });
    }

    handleBookmark = (cn, id, cIdx) => {
        const idx = this.getIdx(id);
        const prevState = { ...this.state };
        prevState.conditions[idx].operand[cIdx] = { ...prevState.conditions[idx].operand[cIdx], bookmarked: !prevState.conditions[idx].operand[cIdx].bookmarked };
        this.setState(prevState);
    }

    /*
        Code below is for Expression to builder conversion on update
        ----- start -----
    */

    onExpressionChanged = (e) => {
        this.setState({ ...this.state, expression: e.target.value, valid: true });
    }

    handleUpdateCondition = (e)  => {
        if(e.keyCode === 13) {
            this.updateCondition();
        }
    }

    flatenArray = (arr, idx, operator) => {
        if(arr && arr.length > 0) {
            arr.map((o) => {
                return this.flatenArray(o, idx, operator);
            })
        } else if(typeof arr.operand === 'object') {
            return this.flatenArray(arr.operand, idx, operator);
        } else {
            this.setState((oldState) => {
                const tempconditions = [...oldState.tempconditions];
                if(tempconditions) {
                    if(tempconditions[idx]) {
                        tempconditions[idx].operand.push(arr);
                    } else {
                        const newIdx = tempconditions.length + 1;
                        const obj = {id: newIdx, operand: [arr], operator: operator};
                        tempconditions.push(obj);
                    }
                }
                return {...oldState, tempconditions: tempconditions};
            })
        }

        return true;
    }

    updateCondition = () => {

        this.setState({...this.state, conds: [], tempconditions: [], cnds: [] });

        setTimeout(() => {
            try {
                if(this.state.conds && this.state.conds[0].operand && typeof this.state.conds[0].operand !== "string") {
                    this.state.conds && this.state.conds.map((c, idx) => {
                        this.flatenArray(c, idx, c.operator);
                        return true;
                    })
                } else {
                    this.setState((oldState) => {
                        return {...oldState, tempconditions: [{id: 1, operand: this.state.conds, focus: false}]};
                    })
                }

                this.setState({...this.state, conditions: this.state.tempconditions});

            } catch(e) {
                console.log("Looks like there are parenthesis in the expression", e.message);
                // this.setState({...this.state, valid: false});
            }
        }, 1);

        if (this.state.expression !== '') {
            this.extractCObject(this.state.expression);
        } else {
            this.setState({
                ...this.state,
                valid: false
            });
        }

    }

//("Test" AND "OK") OR ("Invalid") AND ("Test" AND "OK") OR ("Invalid")
    getConditionObject = (str, o = '') => {
        let condition;
        let regex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
        const result = regex.exec(str);
        let operator, operand, newStr;

        if (result !== null) {
            operand = result[0];
            newStr = str.substring(result['index'] + operand.length).trim();
            operator = newStr.slice().split(' ')[0];

            if (o && o.length > 0) {
                condition = { operand: operand, operator: o };
            } else {
                condition = { operand: operand };
            }
            this.setState((oldState) => {
                const cnds = oldState.cnds && oldState.cnds.length > 0 ? oldState.cnds : [] ;
                return {...oldState, cnds: [...cnds, condition]};
            });
            this.getConditionObject(newStr, operator);
        } else {
            setTimeout(() => {
                const cnds_last = this.state.cnds && [...this.state.cnds];
                this.setState({ ...this.state, cnds_last: cnds_last});
                this.state.cnds && this.state.cnds.map((c, idx) => {
                    this.extractCO(this.cleanQuotes(c.operand), idx);
                    return true;
                });
                this.setState((oldState) => {
                    const cnds_last = oldState.cnds_last && [...oldState.cnds_last];
                    const conditions = cnds_last.filter((c) => c.operator !== 'NOT');
                    const excludeConditionsArray = cnds_last.filter((c) => c.operator === 'NOT');
                    const excludeConditions = [];
                    excludeConditionsArray.map((ec) => {
                        excludeConditions.push(...ec.operand);
                        return true;
                    });
                    excludeConditions.map((ec, idx) => ec.operator = idx !== 0 ?  'AND' : '');
                    return { ...oldState, valid: true, conditions: conditions, excludeConditions: excludeConditions};
                })
            }, 1);
        }
    }
    extractCO = (str, idx, o = '') => {
        const regex = /\bAND\b|\bOR\b|\bNOT\b/g;
        let condition;

        const result = regex.exec(str);
        let operator, operand, newStr;
        if (result !== null) {
            operator = result[0];
            newStr = str.substring(result['index'] + operator.length).trim();
            operand = str.substring(0, result['index']).trim();

            if (o && o.length > 0) {
                condition = { operand: this.cleanQuotes(operand), operator: o };
            } else {
                condition = { operand: this.cleanQuotes(operand) };
            }
            this.setState((oldState) => {
                const cnds_last = oldState.cnds_last ? [...oldState.cnds_last] : [];
                cnds_last[idx].id = idx + 1;
                if(typeof cnds_last[idx].operand === 'object') {
                    cnds_last[idx].operand.push(condition);
                } else {
                    cnds_last[idx].operand = [condition];
                }
                return {...oldState, cnds_last: [...cnds_last]}
            });
            this.extractCO(newStr, idx, operator);
        } else {
            condition = { operand: this.cleanQuotes(str), operator: o };
            this.setState((oldState) => {
                const cnds_last = oldState.cnds_last ? [...oldState.cnds_last] : [{operand: []}];
                cnds_last[idx].id = idx + 1;
                if(typeof cnds_last[idx].operand === 'object') {
                    cnds_last[idx].operand.push(condition);
                } else {
                    cnds_last[idx].operand = [condition];
                }
                return {...oldState, cnds_last: [...cnds_last]};
            });
        }
    }

    cleanQuotes(str) {
        const s = str.trim()
        const len = s.length;
        return s.substring(1, len - 1);
    }

    formCObject = (str, o = '') => {
        const regex = /\bAND\b|\bOR\b|\bNOT\b/g;
        let condition;

        const result = regex.exec(str);
        let operator, operand, newStr;
        if (result !== null) {
            operator = result[0];
            newStr = str.substring(result['index'] + operator.length).trim();
            operand = str.substring(0, result['index']).trim();

            if (o && o.length > 0) {
                condition = { operand: this.cleanQuotes(operand), operator: o };
            } else {
                condition = { operand: this.cleanQuotes(operand) };
            }
            this.setState((oldState) => {
                const conds = oldState.conds && oldState.conds.length > 0 ? oldState.conds : [] ;
                return {...oldState, conds: [...conds, condition]}
            });
            this.formCObject(newStr, operator);
        } else {
            condition = { operand: this.cleanQuotes(str), operator: o };
            this.setState((oldState) => {
                const conds = oldState.conds && oldState.conds.length > 0 ? oldState.conds : [] ;
                return {...oldState, conds: [...conds, condition]}
            });
        }
    }

    extractCObject = (str = '') => {
        const regex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
        try{
            if (regex.exec(str) === null) { // When there is not parenthesis
                this.formCObject(str);
            } else { // When there is parenthesis
                this.getConditionObject(str);
            }
        } catch(error) {
            console.log('Error', error);
        }
    }


    /*
        Code above is for Expression to builder conversion on update
        ----- end -----
    */





    render() {
        return (
            <div className="SearchComponent">
                {this.state.showSlider ? <Slider status="open" closed={this.closeSlider} /> : <Slider status="close" />}
                {this.state.showFilterSlider ? <FilterSlider status="open" closed={this.closeFilterSlider} /> : <FilterSlider status="close" />}
                <input
                    className={this.state.valid ? "editor" : "editor error"}
                    value={this.state.expression}
                    placeholder="Enter Text"
                    onKeyUp={this.handleUpdateCondition}
                    onChange={this.onExpressionChanged} />
                <div className="flexbox">
                    <div className="flexbox">
                        <div className="button-switch">
                            <input type="checkbox" id="switch-blue" className="switch" checked={this.state.showAdvance} onChange={this.handleSwitch} />
                        </div>
                        <div>Show Advance</div>
                    </div>
                    <button className="primary" onClick={this.updateCondition}>Update</button>
                </div>

                {this.state.showAdvance ?
                    <React.Fragment>
                        <div className="heading">Medical Terms</div>
                        <div className="condition-group">
                            {this.state.conditions.map((c) => (
                                <div key={c.id} className="row-wrapper">
                                    {this.getOperator(c)}
                                    <div className="row">
                                        <div className={c.focus ? "conditions focus" : "conditions"}>
                                            {c.operand.map((cn, idx) => (
                                                <React.Fragment key={Math.random()}>
                                                    {this.getConditionOperator(cn, c.id, idx)}
                                                    <div className="condition-wrapper">
                                                        <div className="condition">
                                                            <div>
                                                                <div className="cursor-handle" onClick={() => this.handleSlider(cn, idx)}>{cn.operand}</div>
                                                                {this.allFieldOptions()}
                                                            </div>
                                                            <div>
                                                                <div onClick={() => this.removeSingleCondition(c.id, idx)}><img className="small-icon" src={Images.close} alt="close" /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                            <Autosuggest
                                                data={DATA}
                                                onFocus={(data) => this.handleControlFocus(data, c.id)}
                                                onReceived={(data) => this.handleSuggestion(data, c.id)} />
                                        </div>
                                        {this.isLastElement(c) ? this.isFirstElement(c) ? <button className="button-add" onClick={this.addConditionHandler}><img src={Images.add} alt="add" /></button> : <React.Fragment>
                                            <button className="button-remove" onClick={() => this.removeConditionHandler(c.id)}><img src={Images.remove} alt="remove" /></button>
                                            <button className="button-add" onClick={this.addConditionHandler}><img src={Images.add} alt="add" /></button>
                                        </React.Fragment> : <button className="button-remove" onClick={() => this.removeConditionHandler(c.id)}><img src={Images.remove} alt="remove" /></button>}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="heading">Exclude</div>
                        <div className={this.state.excludeControlFocus ? "conditions focus" : "conditions"}>
                            {this.handleExcludeConditions()}
                            <Autosuggest
                                data={DATA}
                                onFocus={(data) => this.handleExcludeControlFocus(data)}
                                onReceived={(data) => this.handleExcludeSuggestion(data)} />
                        </div>
                        <div className="Actions" style={{display: 'flex', alignItems: 'center'}}>
                            <button className="secondary" onClick={this.handleFilterSlider}>Add Filters</button>

                            <div style={{padding: '10px', display: 'flex', alignItems: 'center', color: '#666', justifyContent: 'space-around'}}>
                                <div style={{margin: '0 10px'}}>Language: <strong>English</strong></div>
                                <div style={{margin: '0 10px'}}>Term: <strong>In Vivo</strong></div>
                                <div style={{margin: '0 10px'}}>Duration: <strong>5 years</strong></div>
                            </div>
                        </div>
                    </React.Fragment>
                    : null
                }

                <div className="Actions">
                    <button className="primary" onClick={() => this.onSearch()}>Search</button>
                </div>
            </div>
        );
    }
}

export default Builder;
