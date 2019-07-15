import React from "react";
import { AppState } from "../../reducer/reducer";
import { connect } from "react-redux";

export type ClockProps = {
  name: string,
  loading: boolean
};

type ClockState = {
  time: string;
};

export class RawClock extends React.Component {

  props!: ClockProps;
  state: ClockState;
  timerId: number = -1;

  constructor(props: ClockProps) {
    super(props);
    const now: Date = new Date();
    this.state = {
      time: now.toLocaleString()
    } as ClockState;
  }

  tick() {
    const now: Date = new Date();
    this.setState({
      time: now.toLocaleString()
    });
  }

  componentDidMount() {
    this.timerId = window.setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    if (this.props.loading) {
      return <p className="clock">
        The clock is loading...
      </p>
    }
    else {
      if (this.props.name) {
        return <div className="clock">
          <p>
            {this.props.name} has requested the time.
          </p>
          <p>
            Hi {this.props.name}, the time is {this.state.time}.
          </p>
        </div>;
      }
      else { 
        return <div className="clock">
          <p>
            Nobody has requested the time.
          </p>
          <p>
            The time is {this.state.time}.
          </p>
        </div>;
      }
    }
  }
}

const mapStateToProps = (state: AppState): ClockProps => {
  return {
    name: state.name,
    loading: state.loading
  };
}

export const Clock = connect(mapStateToProps)(RawClock as any);
