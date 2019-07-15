import React, { Dispatch } from "react";
import "./NameChange.scss";
import { connect } from "react-redux";
import { AppState } from "../../reducer/reducer";
import { Action } from "redux";
import { setNameThunk } from "../../actions/actions";

export type NameChangeProps = {
  error: string;
  submitting: boolean;
  submit: (value: string) => void
};

type NameChangeState = {
  value: string;
  localError: string;
};

export class RawNameChange extends React.Component {

  props!: NameChangeProps;
  state: NameChangeState;
  timerId: number = -1;

  constructor(props: NameChangeProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      localError: '',
      value: ''
    };
  }

  hasError(str: string) {
    let error = '';

    const validators = [
      {
        test: (val: string) => (val.length >= 15),
        error: 'Name is too long'
      },
      {
        test: (val: string) => (val.trim() === ""),
        error: 'Name field is empty'
      },
      {
        test: (val: string) => (val.match(/^[A-Za-z \-\u00C0-\u017F']+$/) === null),
        error: 'Name can only contain alphabet and some special characters'
      }
    ];
    
    for (const validator of validators) {
      if (!error && validator.test(str)) {
        error = validator.error;
      }
    }

    return error;
  }

  onClick(event: any) {
    const properCase = (str: string) => str.replace(/\w\S*/g,
      (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    event.preventDefault();
    const err = this.hasError(this.state.value)
    if (!err) {
      this.props.submit(properCase(this.state.value));
    }
    this.setState({ localError: err });
    if (event.target) event.target.blur();
  }

  handleChange(event: InputElementEvent) {
    this.setState({
      value: event.target.value,
      error: this.hasError(event.target.value)
    });
  }

  render() {
    return <form className="name-change" onSubmit={this.onClick}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <p>{ this.state.localError || this.props.error }</p>
        <button type="submit" disabled={this.props.submitting}>Submit</button>
      </form>;
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    error: state.error,
    submitting: state.submitting
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    submit: (value: string) => dispatch(setNameThunk(value) as any)
  };
};

export const NameChange = connect(mapStateToProps, mapDispatchToProps)(RawNameChange as any);
