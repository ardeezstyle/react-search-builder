import * as React from 'react';
import './Autosuggest.css';

class Autosuggest extends React.Component<any, any>  {

  state = {
    value: '',
    suggestions: [],
    selected: ''
  }

  onChange = (e: any) => {
    this.setState({value: e.target.value});
  }

  onKeyUp = (e: any) => {
    const suggestions = this.props.data.filter((item: string) => item.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1);
    this.setState({suggestions: [...suggestions]});
  }

  onKeyDown = (e: any) => {
    if(e.keyCode === 9) {
      this.doPassInfo();
    }
  }

  doPassInfo = (e?: any) => {
    let value = this.state.value;
    if(e) {
      value = e.target.textContent
    }
    this.props.onReceived(value);

    this.setState({
      value: '',
      suggestions: [],
      selected: ''
    });
  }



  getSuggestions() {
    return <ul>
      {this.state.suggestions && this.state.suggestions.length ?
        this.state.suggestions.map((s, i) => <li key={i} onClick={this.doPassInfo}>{s}</li>) : null}
    </ul>
  }
  public render() {
    return (
      <div className="auto-suggest-combo">
        <input
          value={this.state.value}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown} />
        {this.state.value.length > 1 && this.state.suggestions.length > 0 ? this.getSuggestions() : null}
      </div>
    );
  }
}
export default Autosuggest;
