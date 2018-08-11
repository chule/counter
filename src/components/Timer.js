import React, { Component } from "react"
import { secondsToTime } from '../utils'

export default class Timer extends Component {
    render() {
        return (<div>
            <div>
                Current time: {secondsToTime(this.props.time)}
            </div>
            <button onClick={this.props.startStopTimer}> start/stop </button>
        </div>)
    }
}