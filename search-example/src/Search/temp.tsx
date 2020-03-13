import * as React from 'react';
import './Search.css';

class Condition {
  operator?: string;
  operand!: any;
};

class Search extends React.Component<any, any>  {
  state = {
    title: "Search Component",
    conditions: '',
    conditions_array: []
  }

  conditions = "((“Johnson and johnson” AND “GTemp”) AND (”Influenza Vaccines” OR “Flu Vaccines” OR “Viral Vaccines”)) OR ((”Pfizer” AND “TheroZ”) AND (”influenza Vaccines” OR “Flu Vaccines” OR “Viral Vaccines”))";
  _conditions: Condition[] = [
    {
      operand: [
        {
          operand: [
            {
              operand: "Johnson and johnson"
            },
            {
              operator: 'AND',
              operand: "GTemp"
            }
          ]
        },
        {
          operator: 'AND',
          operand: [
            {
              operand: "Influenza Vaccines"
            },
            {
              operator: 'OR',
              operand: "Flu Vaccines"
            },
            {
              operator: 'OR',
              operand: "Viral Vaccines"
            }
          ]
        }
      ]
    },
    {
      operator: 'OR',
      operand: [
        {
          operand: [
            {
              operand: "Pfizer"
            },
            {
              operator: 'AND',
              operand: "TheroZ"
            }
          ]
        },
        {
          operator: 'AND',
          operand: [
            {
              operand: "Influenza Vaccines"
            },
            {
              operator: 'OR',
              operand: "Flu Vaccines"
            },
            {
              operator: 'OR',
              operand: "Viral Vaccines"
            }
          ]
        }
      ]
    },
  ]


  getConditionString = (conditions: Condition[]) => {
    let condString = '';

    conditions.map(condition => {
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
    console.log(this.getConditionString(this._conditions));
  }

  getConditionObject = (str: string) => {
    const regex = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;
    let conditions: any[] = [];
    let op: string = ''; // operator: op
    let m;

    // console.log(str);

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        let tempOperator = str.replace(match, '').trim().split(' ')[0];
        if(tempOperator === 'AND' || tempOperator === 'OR' || tempOperator === 'NOT') {
          op = tempOperator;
        }

        const len = match.length;
        let newStr = match.substring(1, len - 1);

        if(conditions.length > 0) {
          conditions.push({operator: op, operand: this.getConditionObject(newStr)});
        } else {
          conditions.push({operand: this.getConditionObject(newStr)});
        }
        return conditions;
      });

      // console.log('operator', operator);
    }

    if(regex.exec(str) === null) {
      let cnds: string[] = [];
      let operator: string;

      if(str.indexOf('AND') > -1) {
        operator = 'AND';
        cnds = str.split('AND');
      }

      if(str.indexOf('OR') > -1) {
        operator = 'OR';
        cnds = str.split('OR');
      }

      if(str.indexOf('NOT') > -1) {
        operator = 'NOT';
        cnds = str.split('NOT');
      }


      cnds = cnds.map(cnd => {
        return this.cleanQuotes(cnd);
      });

      cnds.map((cnd, idx) => {
        let obj;
          if(idx === 0) {
            obj = {operand: cnd};
          } else {
            obj = {operator: operator, operand: cnd};
          }

          conditions.push(obj);
          return conditions;
      })

      if(cnds.length === 0) {
        conditions.push({operand: this.cleanQuotes(str)});
      }

    }

    return conditions;
  }

  // Returns array of conditions
  parseConditionString = () => {
    const updatedConditions = {
      ...this.state,
      conditions_array: this.getConditionObject(this.state.conditions)
    };
    this.setState(updatedConditions, () => console.log(this.state.conditions_array));
  }

  cleanQuotes(str: string) {
    const s = str.trim()
    const len = s.length;
    return s.substring(1, len - 1);
  }

  update = () => {
    this.parseConditionString();
  }

  search = () => {
    const title = { ...this.state, title: "Changing Search Title" };
    this.setState(title);
  }

  onChanged = (event: any) => {
    const updatedConditions = {
      ...this.state,
      conditions: event.target.value
    };

    this.setState(updatedConditions);
  }


  getOperator(cn: any, idx: any) {
    const key_prefix = '_' + idx;
    // return cn.operator;
    console.log('cn.operator', cn.operator);
    if(cn.operator) {
      return (
        <select key={key_prefix} value={cn.operator}>
          <option value='AND'>AND</option>
          <option value='OR'>OR</option>
          <option value='NOT'>NOT</option>
        </select>
      )
    } else {
      return null;
    }

  }


  getConditionGroup(cn: any, idx: any) {
    let dom:any = [];
    let cn_dom: any = [];
    const key_prefix = '_' + idx;

    cn.operand.map((c: any, _id: any) => {
      if(c.operator) {
        cn_dom.push(
          <select key={key_prefix + 'o' +_id} value={c.operator}>
            <option value='AND'>AND</option>
            <option value='OR'>OR</option>
            <option value='NOT'>NOT</option>
          </select>
        );
        cn_dom.push(<input key={key_prefix + 'f' +_id} type="text" value={c.operand} />);
      } else {
        cn_dom.push(<input key={key_prefix + 'f' +_id} type="text" value={c.operand} />)
      }

      return c;
    });

    dom.push(
      <div key={idx} className="condition-group">
        <div className="conditions">
        {cn_dom}
        </div>
      </div>
    )

    return dom;
  }

  /*
  return (
    <div className="condition-group">
      <div className="conditions">
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <select>
          <option>AND</option>
          <option>OR</option>
          <option>NOT</option>
        </select>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <button>Remove</button>
    </div>
  )
  */

  createCondition() {
    let dom:any = [];
    this.state.conditions_array.map((condition: Condition, idx) => {
      if(typeof condition.operand === 'object' && condition.operand.length > 0) {
        dom.push(
          <div key={idx} className="condition-horizontal">
            {this.getOperator(condition, idx)}
            {this.getConditionGroup(condition, idx)}
          </div>
        )
      } else {
        console.log(condition);
      }
    });
    return dom;
  }

  public render() {

    return (
      <div>

<div className="hide">
        <button onClick={this.extractConditionString}>Extract</button>
        <button onClick={this.parseConditionString}>Parse</button>
</div>

        {this.conditions}

        <hr />
        <textarea className="editor" defaultValue={this.state.conditions} onChange={this.onChanged} />
        <button className="primary" onClick={this.update}>Update</button>

        <br /><br />
        <hr />
        <br /><br />
        <div className="builder">{this.createCondition()}</div>

        <div className="hide">
        <br /><br />
        <hr />
        <br /><br />
        <div className="builder">
          {this.state.conditions_array.map((condition, idx) => (
            <div key={idx} className="condition-horizontal">
              {this.getOperator(condition, idx)}
              <div className="condition-group">
                <div className="conditions">
                  <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <select>
                    <option>AND</option>
                    <option>OR</option>
                    <option>NOT</option>
                  </select>
                  <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <button>Remove</button>
              </div>
            </div>
          ))}



<br /><br /><br /><br />
          <div className="condition-horizontal">
            <div>Operator If Present</div>
            <div className="condition-group">
              <div className="conditions">
                <select>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
                <select>
                  <option>AND</option>
                  <option>OR</option>
                  <option>NOT</option>
                </select>
                <select>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <button>Remove</button>
            </div>
          </div>
          <div className="condition-horizontal">
            <div></div>
            <button>Remove</button>
          </div>
          <div className="condition-horizontal">
            <div></div>
            <button>Remove</button>
            <button>Add</button>
          </div>
        </div>


        <button onClick={() => this.search()}>Search</button>
        </div>
      </div>

    );
  }
}

export default Search;
