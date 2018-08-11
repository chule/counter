import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { secondsToTime } from '../utils'

export default class ListOfExercises extends Component {
    render() {
        
        const list = this.props.listOfExercises

        console.log(list)
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell numeric>Time</TableCell>
                    <TableCell numeric>Value</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(list).map(date => {
                    return (
                        <TableRow key={date}>
                            <TableCell component="th" scope="row">
                                {date}
                            </TableCell>
                            <TableCell numeric>{secondsToTime(list[date].time)}</TableCell>
                            <TableCell numeric>{list[date].repetitions}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>)
    }
}