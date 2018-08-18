import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { secondsToTime } from '../utils'

const gunnarStyle = { height: "10px", padding: "5px"}

export default class ListOfExercises extends Component {
    render() {

        const list = this.props.listOfExercises

        return (<Table>
            <TableHead>
                <TableRow >
                    <TableCell  style={gunnarStyle}>
                        Date
                        </TableCell>
                    <TableCell style={gunnarStyle}>Total Time</TableCell>
                    <TableCell style={gunnarStyle}>Steps</TableCell>
                    <TableCell style={gunnarStyle}>Reps</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(list).sort((a, b) => list[b].referenceTime - list[a].referenceTime).map(date => {
                    return (
                        <TableRow key={date}>
                            <TableCell  style={gunnarStyle}>
                                {date}
                            </TableCell>
                            <TableCell style={gunnarStyle}>{secondsToTime(list[date].time)}</TableCell>
                            <TableCell style={gunnarStyle}>{list[date].repetitions * 24}</TableCell>
                            <TableCell style={gunnarStyle}>{list[date].repetitions}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>)
    }
}