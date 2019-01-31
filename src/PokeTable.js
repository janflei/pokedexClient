import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
};

class PokeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
   }

   render() {
    const { classes } = this.props;
    var divStyle = {
      width: '50%',
    };

   return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          <Paper className={classes.root} style={divStyle}>
            <Table className={classes.table}>
              <TableHead>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell>Image: </TableCell>
                    <TableCell align={"center"}>
                        <img src={this.props.imageurl} alt="new"/>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name: </TableCell>
                    <TableCell align={"center"}>{this.props.pokemon.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Base Experience: </TableCell>
                    <TableCell align={"center"}>{this.props.pokemon.base_experience}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Height: </TableCell>
                    <TableCell align={"center"}>{this.props.pokemon.height}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Order: </TableCell>
                    <TableCell align={"center"}>{this.props.pokemon.order}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight: </TableCell>
                    <TableCell align={"center"}>{this.props.pokemon.weight}</TableCell>
                  </TableRow>          
              </TableBody>
            </Table>
          </Paper>
    </div>
  );
}}

PokeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PokeTable);