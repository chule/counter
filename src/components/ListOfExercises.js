import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ListOfExercises extends Component {
    render() {
        //console.log()
        const list = this.props.listOfExercises
        return (<Table className="table">
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
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
                            <TableCell numeric>{list[date].repetitions}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>)
    }
}