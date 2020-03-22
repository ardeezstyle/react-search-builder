import * as React from 'react';
import './Autosuggest.css';

class Autosuggest extends React.Component<any, any>  {
    ref: any;
    state = {
        value: '',
        suggestions: [],
        selected: '',
        control: null
    }



    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
    }

    onChange = (e: any) => {
        this.setState({ value: e.target.value, control: e.target });
    }

    onKeyUp = (e: any) => {
        const suggestions = this.props.data.filter((item: string) => item.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1);
        const key = e.keyCode;
        this.setState({ suggestions: [...suggestions] }, () => {
            if (key === 40 && this.state.suggestions.length > 0) {
                console.log(this.ref);
                this.ref.current.childNodes[0].focus();
            }
        });
    }

    onKeyDown = (e: any) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
            if (this.state.value !== '') {
                this.doPassInfo();
            } else {
                this.setFocusOnControl();
            }
        }
    }

    doPassInfo = (e?: any) => {
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
                const control: any = this.state.control;
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

    check = (e: any) => {
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
    public render() {
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
