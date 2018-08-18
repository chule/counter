import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { secondsToTime } from '../utils'

const dateStyle = { height: "10px", padding: "5px", textAlign:"left"}
const timeStyle = { height: "10px", padding: "5px", textAlign:"center"}
const stepsReps = { height: "10px", padding: "5px", textAlign:"right"}

export default class ListOfExercises extends Component {
    render() {

        const list = this.props.listOfExercises

        return (<Table>
            <TableHead>
                <TableRow >
                    <TableCell  style={dateStyle}>
                        Date
                        </TableCell>
                    <TableCell style={timeStyle}>Total Time</TableCell>
                    <TableCell style={stepsReps}>Steps</TableCell>
                    <TableCell style={stepsReps}>Reps</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(list).sort((a, b) => list[b].referenceTime - list[a].referenceTime).map(date => {
                    return (
                        <TableRow key={date}>
                            <TableCell  style={dateStyle}>
                                {date}
                            </TableCell>
                            <TableCell style={timeStyle}>{secondsToTime(list[date].time)}</TableCell>
                            <TableCell style={stepsReps}>{list[date].repetitions * 24}</TableCell>
                            <TableCell style={stepsReps}>{list[date].repetitions}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>)
    }
}