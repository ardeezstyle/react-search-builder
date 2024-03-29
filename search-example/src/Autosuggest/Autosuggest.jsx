import * as React from 'react';
import './Autosuggest.css';

class Autosuggest extends React.Component  {
    ref;
    state = {
        value: '',
        suggestions: [],
        selected: '',
        control: null
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    onChange = (e) => {
        this.setState({ value: e.target.value, control: e.target });
    }

    onKeyUp = (e) => {
        const suggestions = this.props.data.filter((item) => item.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1);
        const key = e.keyCode;

        let suggestionsToBeShown = suggestions;
        if(suggestions.length > 6) {
            suggestionsToBeShown = suggestions.slice(0,6);
        }
        this.setState({ suggestions: [...suggestionsToBeShown] }, () => {
            if (key === 40 && this.state.suggestions.length > 0) {
                this.ref.current.childNodes[0].focus();
            }
        });
    }

    onKeyDown = (e) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
            if (this.state.value !== '') {
                this.doPassInfo();
            } else {
                this.setFocusOnControl();
            }
        }
    }

    doPassInfo = (e) => {
        let value = this.state.value;
        if (e) {
            value = e.target.textContent;
        }
        this.props.onReceived(value);
        this.setFocusOnControl();
        this.setState({
            ...this.state,
            value: '',
            suggestions: [],
            selected: ''
        });
    }

    setFocusOnControl = () => {
        if (this.state.control != null) {
            window.setTimeout(() => {
                const control = this.state.control;
                control.focus();
            }, 0);
        }
    }

    onControlFocus = () => {
        this.props.onFocus(true);
    }
    onControlBlur = () => {
        this.props.onFocus(false);
    }

    check = (e) => {
        console.log(e.keyCode);
        if(e.keyCode === 13) {
            this.setState({ ...this.state, value: e.target.textContent}, () => {
                    this.doPassInfo();
            });
        } else if (e.keyCode === 40) {
            if(e.target.nextElementSibling) {
                    e.target.nextElementSibling.focus();
            }

        } else if (e.keyCode === 38) {
            if(e.target.previousElementSibling) {
                    e.target.previousElementSibling.focus();
            }

        }
    }

    getSuggestions() {
        return <ul ref={this.ref}>
            {this.state.suggestions && this.state.suggestions.length ?
                this.state.suggestions.map((s, i) =>
                    <li key={i} onClick={this.doPassInfo} onKeyUp={this.check} tabIndex={i}>{s}</li>) : null}
        </ul>
    }
    render() {
        return (
            <div className="auto-suggest-combo">
                <input
                    placeholder="Enter Text"
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onControlBlur}
                    onFocus={this.onControlFocus} />
                {this.state.value.length > 0 && this.state.suggestions.length > 0 ? this.getSuggestions() : null}
            </div>
        );
    }
}
export default Autosuggest;
