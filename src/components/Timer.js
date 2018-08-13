import React, { Component } from "react"
import { secondsToTime } from '../utils'
import Button from '@material-ui/core/Button'
import { smallButton } from '../utils/muiTheme'

export default class Timer extends Component {
    render() {
        return (<div>
            <div>
                Current time: {secondsToTime(this.props.time)}
            </div>
            <Button variant="contained" size="small" color="primary" style={smallButton} onClick={this.props.startStopTimer}> 
            start timer / stop timer 
            </Button>
        </div>)
    }
}