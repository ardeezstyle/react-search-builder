import * as React from 'react';
import './Builder.css';

import close from '../assets/close.png';
import bookmark from '../assets/bookmark.png';
import dropdown from '../assets/dropdown.png';
import darrow from '../assets/darrow.png';
import add from '../assets/add.png';
import remove from '../assets/remove.png';

class Builder extends React.Component<any, any>  {

  state = {
    conditions: [
      {
        id: 1,
        input: '',
        operand: [
          {
            operand: 'Johnson and johnson'
          }
        ]
      }
    ]
  }

  getIdx = (id: any) => {
    return this.state.conditions.findIndex(c => c.id === id);
  }

  genIdx = () => {
    const len = this.state.conditions.length;
    const lastId = +this.state.conditions[len - 1].id;
    return lastId + 1;
  }


  handleKeyUp = (e: any, id: any) => {
    const idx = this.getIdx(id);

    if(e.keyCode === 13) {
      let condition:any = {
        operand: this.state.conditions[idx].input
      }

      if(this.state.conditions[idx].operand.length > 0) {
        condition = {
          operand: this.state.conditions[idx].input,
          operator: 'AND'
        };
      }

      const updatedConditions = [...this.state.conditions];

      updatedConditions[idx].operand = [...updatedConditions[idx].operand, condition];
      updatedConditions[idx].input = '';


      this.setState({
        ...this.state,
        conditions: updatedConditions
      })
    }

  }

  handleChange = (e: any, id: any) => {
    const idx = this.getIdx(id);
    const updatedCondition = {...this.state.conditions[idx], input: e.target.value };
    const updatedConditions = [...this.state.conditions];
    updatedConditions[idx] = updatedCondition;
    this.setState({
      ...this.state,
      conditions: updatedConditions
    })
  }

  isLastElement = (c: any) => {
    if(this.state.conditions.length === this.getIdx(c.id) + 1) return true;
    return false;
  }

  removeConditionHandler = (id: any) => {
    const idx = this.getIdx(id);
    const updatedConditions = [...this.state.conditions];
    updatedConditions.splice(idx, 1);
    this.setState({
      ...this.state,
      conditions: updatedConditions
    })
  }

  addConditionHandler = () => {
    const newCond = {
      id: this.genIdx(),
      input: '',
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
    const updatedCondition = {...this.state.conditions[idx], operator: e.target.value };
    const updatedConditions = [...this.state.conditions];
    updatedConditions[idx] = updatedCondition;
    this.setState({
      ...this.state,
      conditions: updatedConditions
    })
  }

  handleConditionOperatorChange = (e: any, id: any, cIdx: any) => {
    const idx = this.getIdx(id);
    const updatedConditionOperator = {...this.state.conditions[idx].operand[cIdx], operator: e.target.value };
    const updatedConditions = [...this.state.conditions];
    updatedConditions[idx].operand[cIdx] = updatedConditionOperator;

    this.setState({
      ...this.state,
      conditions: updatedConditions
    })
  }

  getOperator(c: any) {
    if(c.operator) {
      return <div className="operator-top-level">
              <select value={c.operator} onChange={(event) => this.handleOperatorChange(event, c.id)}>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
              </select>
              <img className="small-icon" src={darrow} alt="darrow"/>
            </div>
    }
    else  return null
  }

  getConditionOperator(c: any, cIndex: any, idx: any) {
    if(c.operator) {
      return <div className="operator">
              <select value={c.operator} onChange={(event) => this.handleConditionOperatorChange(event, cIndex, idx)}>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
              </select>
              <img className="small-icon" src={darrow} alt="darrow"/>
            </div>
    }
    else  return null
  }

  allFieldOptions () {
    return <div className="all-field-options">
            <select>
              <option value="AND">All Fields</option>
              <option value="OR">Option 1</option>
              <option value="OR">Option 2</option>
              <option value="OR">Option 3</option>
            </select>
            <img className="small-icon" src={dropdown} alt="darrow"/>
          </div>
  }

  removeSingleCondition = (cIndex: any, id: any) => {
    const idx = this.getIdx(cIndex);
    const updatedConditions = [...this.state.conditions];
    const conditions = updatedConditions[idx].operand;
    conditions.splice(id, 1);
    this.setState({
      ...this.state,
      conditions: updatedConditions
    })
  }

  public render() {
    return (
      <div>
        {this.state.conditions.map((c: any) => (
          <div key={c.id} className="row-wrapper">
            {this.getOperator(c)}
            <div className="row">
              <div className="conditions">
                {c.operand.map((cn: any, idx: any) => (
                  <React.Fragment key={Math.random()}>
                    {this.getConditionOperator(cn, c.id, idx)}
                    <div className="condition">
                      <div>
                        <div>{cn.operand}</div>
                        {this.allFieldOptions()}
                      </div>
                      <div>
                        <div onClick={() => this.removeSingleCondition(c.id, idx)}><img className="small-icon" src={close} alt="close"/></div>
                        <div><img className="small-icon" src={bookmark} alt="bookmark"/></div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <input className="input" onKeyUp={(event: any) => this.handleKeyUp(event, c.id)} value={c.input} onChange={(event: any) => this.handleChange(event, c.id)}/>
              </div>
              {this.isLastElement(c) ? <React.Fragment>
                  <button className="button-remove" onClick={() => this.removeConditionHandler(c.id)}><img src={remove} alt="remove"/></button>
                  <button className="button-add" onClick={this.addConditionHandler}><img src={add} alt="add"/></button>
                </React.Fragment> : <button className="button-remove" onClick={() => this.removeConditionHandler(c.id)}><img src={remove} alt="remove"/></button>}
            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default Builder;
