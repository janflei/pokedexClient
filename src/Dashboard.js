import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import { mainListItems, secondaryListItems } from './listItems';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      pokemon: [],
      pokemonsearchname: "",
      imageurl: "",
      name: "",
      pokeb: false,
    };
   }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange  = (event) => {
    var str = event.target.value;
    var res = str.toLowerCase();
      this.setState({pokemonsearchname: res});
  };

  handleSubmit = (event) => {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemonsearchname + '/')
      .then(res => {
        const pokemon = res.data;
        this.setState({pokemon: pokemon });
        this.setState({imageurl: pokemon.sprites["front_default"]});
        console.log(pokemon.types);
        var str = pokemon.name;
        var n = str.toUpperCase();
        this.setState({name: n});
        this.setState({pokeb: true});
      })    
      console.log('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemonsearchname + '/')
  };

  componentDidMount() {
    console.log('Test');
  };

  render() {
    const { classes } = this.props;
    var divStyle = {
      width: '50%',
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Pokedex
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/*<Typography variant="h4" gutterBottom component="h2">
            Products
        </Typography>*/}
          <TextField
          id="filled-name"
          label="Search Pokemon by Name or Number"
          className={classes.textField}
          value={this.state.pokemonsearchname}
          onChange={this.handleChange}
          fullWidth
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit()
            }
          }}
          margin="normal"
          variant="filled"
        />
        {this.state.pokeb ?
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          <Paper className={classes.root} style={divStyle}>
      <Table className={classes.table}>
        <TableHead>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>Image: </TableCell>
              <TableCell align={"center"}>
                  <img src={this.state.imageurl} alt="new"/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name: </TableCell>
              <TableCell align={"center"}>{this.state.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Experience: </TableCell>
              <TableCell align={"center"}>{this.state.pokemon.base_experience}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height: </TableCell>
              <TableCell align={"center"}>{this.state.pokemon.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Order: </TableCell>
              <TableCell align={"center"}>{this.state.pokemon.order}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Weight: </TableCell>
              <TableCell align={"center"}>{this.state.pokemon.weight}</TableCell>
            </TableRow>          
        </TableBody>
      </Table>
    </Paper>
    </div>
    : null }
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);