import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class HistoryTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: 0,
        };
    }

    render() {
        const { classes } = this.props;
        var divStyle = {
            width: '50%',
        };
        var listItems = [];

        if (this.props.history) {
            listItems = this.props.history.map((history, index) =>
                <TableRow>
                    <TableCell align={"center"}>
                        <img src={history.imageurl} alt="new" />
                    </TableCell>
                    <TableCell align={"center"}>{history.name.toUpperCase()}</TableCell>
                </TableRow>
            );
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Paper className={classes.root} style={divStyle}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h3 style={{ color: 'gray', align: 'center' }}>{"History"}</h3>
                    </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableCell align={"center"}>{"Image"}</TableCell>
                        <TableCell align={"center"}>{"Name"}</TableCell>
                    </TableHead>
                    <TableBody>
                        {listItems}
                    </TableBody>
                </Table>
                </Paper>
            </div >
        );
    }
}

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles()(HistoryTable);