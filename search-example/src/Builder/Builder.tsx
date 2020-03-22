import * as React from 'react';
import './Builder.css';

import Autosuggest from '../Autosuggest/Autosuggest';
import * as Images from '../assets/images';
import Slider from '../Slider/Slider';
import FilterSlider from '../FilterSlider/FilterSlider';

const DATA: any = [
    "Johnson and johnson",
    "GTemp",
    "Influenza Vaccines",
    "Viral Vaccines",
    "Flu Vaccines",
    "Pfizer",
    "TheroZ"
];

interface ICondition {
    id: number;
    operator?: string;
    operand: ICondition[];
    focus?: boolean;
    bookmarked?: boolean;
}

interface IState {
    conditions: ICondition[];
    expression?: string;
    excludeExpression?: string;
    valid: boolean;
    showAdvance?: boolean;
    conds?: any[];
    showSlider?: boolean;
    excludeConditions?: any[];
    excludeControlFocus?: any;
    showFilterSlider?: boolean;
}

class Builder extends React.Component<any, IState> {

    state: IState = {
        conditions: [{ id: 1, operand: [] }],
        expression: '',
        excludeExpression: '',
        valid: true,
        showAdvance: true,
        conds: [],
        showSlider: false,
        excludeConditions: [],
        showFilterSlider: false
    };

    componentDidMount() {
        const sbstate: any = localStorage.getItem('sbstate');
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

    getIdx = (id: any) => {
        return this.state.conditions.findIndex(c => c.id === id);
    }

    genIdx = () => {
        const len = this.state.conditions.length;
        const lastId = +this.state.conditions[len - 1].id;
        return lastId + 1;
    }

    isLastElement = (c: any) => {
        if (this.state.conditions.length === this.getIdx(c.id) + 1) return true;
        return false;
    }

    isFirstElement = (c: any) => {
        if (this.getIdx(c.id) === 0) return true;
        return false;
    }

    removeConditionHandler = (id: any) => {
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

    handleOperatorChange = (e: any, id: any) => {
        const idx = this.getIdx(id);
        const updatedCondition = { ...this.state.conditions[idx], operator: e.target.value };
        const updatedConditions = [...this.state.conditions];
        updatedConditions[idx] = updatedCondition;
        this.setState({
            ...this.state,
            conditions: updatedConditions
        })
    }

    handleConditionOperatorChange = (e: any, id: any, cIdx: any) => {
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

    getOperator(c: any) {
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

    getConditionOperator(c: any, cIndex: any, idx: any) {
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

    removeSingleCondition = (cIndex: any, id: any) => {
        const idx = this.getIdx(cIndex);
        const updatedConditions = [...this.state.conditions];
        const conditions = updatedConditions[idx].operand;

        conditions.splice(id, 1);
        if (conditions.length > 0) {
            delete conditions[0].operator;
        }

        //
        this.setState({
            ...this.state,
            conditions: updatedConditions
        }, () => {
            this.updateExpression();
        });
    }

    removeSingleExcludeCondition = (id: any) => {
        console.log(id);
        let updatedConditions:any = [];
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

    handleSuggestion = (data: any, id: number) => {
        const idx = this.getIdx(id);
        let condition: any = {
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

    handleExcludeSuggestion = (data: any) => {
        console.log(data);
        const prevState: any = { ...this.state };

        let condition: any = {
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
    getConditionString = (conditions: ICondition[]) => {
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

    onExpressionChanged = (e: any) => {
        this.setState({ ...this.state, expression: e.target.value, valid: true });
    }

    updateExpression = () => {
        const updatedExpression: any = this.extractConditionString();
        const updatedExcludeExpression: any = this.extractExcludeConditionString();
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

    updateCondition = () => {
        if (this.state.expression !== '') {

        } else {
            this.setState({
                ...this.state,
                valid: false
            });
        }

    }

    getConditionObject = (str: any) => {
        const regex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
        let conditions: any[] = [];
        let m;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match) => {
                let op: string = ''; // operator: op
                let tempOperator = str.replace(match, '').trim().split(' ')[0];
                if (tempOperator === 'AND' || tempOperator === 'OR' || tempOperator === 'NOT') {
                    op = tempOperator;
                }

                const len = match.length;
                let newStr = match.substring(1, len - 1);
                if (conditions.length > 0) {
                    conditions.push({ operator: op, operand: this.getConditionObject(newStr) });
                } else {
                    conditions.push({ operand: this.getConditionObject(newStr) });
                }
                return conditions;
            });

            // console.log('operator', operator);
        }

        if (regex.exec(str) === null) {
            let cnds: string[] = [];
            let operator: string;

            if (str.indexOf('AND') > -1) {
                operator = 'AND';
                cnds = str.split('AND');
            }

            if (str.indexOf('OR') > -1) {
                operator = 'OR';
                cnds = str.split('OR');
            }

            if (str.indexOf('NOT') > -1) {
                operator = 'NOT';
                cnds = str.split('NOT');
            }

            cnds = cnds.map(cnd => this.cleanQuotes(cnd));

            const formatted: any = [];
            cnds.map((cnd, idx) => {
                let obj;
                if (idx === 0) {
                    obj = { operand: cnd, id: idx + 1 };
                } else {
                    obj = { operator: operator, operand: cnd, id: idx + 1 };
                }
                formatted.push(obj);
                return null;
            })

            if (cnds.length === 0) {
                conditions.push({ operand: this.cleanQuotes(str) });
            } else {
                conditions.push({ operand: [...formatted] });
            }
        }

        const cnds = conditions.map((c, i) => {
            return { ...c, id: i + 1 }
        });

        return cnds;
    }


    cleanQuotes(str: string) {
        const s = str.trim()
        const len = s.length;
        return s.substring(1, len - 1);
    }

    formCObject = (str: string, o: string = '') => {
        const regex = /\bAND\b|\bOR\b|\bNOT\b/g;
        let condition: any;

        let updatedConditions: any[] = [];

        const result: any = regex.exec(str);
        let operator, operand, newStr;

        // console.log(conditions);
        // console.log(result);

        if (result !== null) {
            operator = result[0];
            newStr = str.substring(result['index'] + operator.length).trim();
            operand = str.substring(0, result['index']).trim();

            if (o && o.length > 0) {
                condition = { operand: operand, operator: o };
            } else {
                condition = { operand: operand };
            }

            const prevState: any = { ...this.state };
            // console.log(prevState);
            const updatedState = { ...prevState, conds: [...prevState.conds, condition] }

            console.log('updatedConditions =>', updatedConditions, updatedState);
            this.formCObject(newStr, operator);
        }
    }

    extractCObject = (str: string) => {
        const regex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
        if (regex.exec(str) === null) {
            this.formCObject(str);
            return this.state.conds;
        } else {
            return 'Parenthesis'
        }
    }

    sampleFunction() {
        const str = 'A AND B';
        let obj = this.extractCObject(str);
        console.log(obj);
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

    handleSlider = (cn: any, id: any) => {
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

    handleExcludeConditionOperatorChange = (e: any, cIdx: any) => {
        // const updatedConditionOperator = { ...this.state.conditions[idx].operand[cIdx], operator: e.target.value };
        // const updatedConditions = [...this.state.conditions];
        // updatedConditions[idx].operand[cIdx] = updatedConditionOperator;
        //
        // this.setState({
        //   ...this.state,
        //   conditions: updatedConditions
        // })
        // this.updateExpression();
    }

    getExcludeConditionOperator(cn: any, idx: number) {
        if (cn.operator) {
            return <div className="operator">
                <select defaultValue={cn.operator}>
                    <option value="OR">OR</option>
                </select>
            </div>
        }
        else return null
    }

    handleExcludeConditions() {
        const excludeConditions: any = this.state.excludeConditions;
        if (excludeConditions && excludeConditions.length > 0) {
            return excludeConditions.map((cn: any, idx: any) =>
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

    handleControlFocus = (bool: boolean = false, id: number) => {
        const idx = this.getIdx(id);
        const prevState: any = { ...this.state };
        prevState.conditions[idx].focus = bool;
        this.setState(prevState);
    }

    handleExcludeControlFocus = (bool: boolean = false) => {
        this.setState({ ...this.state, excludeControlFocus: bool });
    }

    closeSlider = () => {
        this.setState({ ...this.state, showSlider: false });
    }
    closeFilterSlider = () => {
        this.setState({ ...this.state, showFilterSlider: false });
    }

    handleBookmark = (cn: any, id: number, cIdx: number) => {
        const idx = this.getIdx(id);
        const prevState = { ...this.state };
        prevState.conditions[idx].operand[cIdx] = { ...prevState.conditions[idx].operand[cIdx], bookmarked: !prevState.conditions[idx].operand[cIdx].bookmarked };
        this.setState(prevState);
    }

    public render() {
        this.sampleFunction();

        return (
            <div className="SearchComponent">
                {this.state.showSlider ? <Slider status="open" closed={this.closeSlider} /> : <Slider status="close" />}
                {this.state.showFilterSlider ? <FilterSlider status="open" closed={this.closeFilterSlider} /> : <FilterSlider status="close" />}
                <input
                    className={this.state.valid ? "editor" : "editor error"}
                    value={this.state.expression}
                    placeholder="Enter Text"
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
                            {this.state.conditions.map((c: any) => (
                                <div key={c.id} className="row-wrapper">
                                    {this.getOperator(c)}
                                    <div className="row">
                                        <div className={c.focus ? "conditions focus" : "conditions"}>
                                            {c.operand.map((cn: any, idx: any) => (
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
                                                                <div onClick={() => this.handleBookmark(cn, c.id, idx)}>
                                                                    <img className="small-icon" src={cn && cn.bookmarked ? Images.bookmarkSelected : Images.bookmark} alt="bookmark" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                            <Autosuggest
                                                data={DATA}
                                                onFocus={(data: any) => this.handleControlFocus(data, c.id)}
                                                onReceived={(data: string) => this.handleSuggestion(data, c.id)} />
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
                                onFocus={(data: any) => this.handleExcludeControlFocus(data)}
                                onReceived={(data: string) => this.handleExcludeSuggestion(data)} />
                        </div>
                        <div className="Actions">
                            <button className="secondary" onClick={this.handleFilterSlider}>Add Filters</button>
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
