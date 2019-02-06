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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import axios from "axios";
import PokeTable from './PokeTable';
import HistoryTable from './HistoryTable';

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
    this.handleClickHistory = this.handleClickHistory.bind(this)
    this.handleClickPokedex = this.handleClickPokedex.bind(this)

    this.state = {
      open: true,
      pokemonsearchname: "",
      name: "",
      types: [],
      imageurl: "",
      baseexp: "",
      order: "",
      weight: "",
      showpoketable: false,
      showPokeResult: true,
      history: [],
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    var str = event.target.value;
    var res = str.toLowerCase();
    this.setState({ pokemonsearchname: res });
  };

  handleSubmit = (event) => {
    axios.get('https://mega-pokedex.herokuapp.com/pokemon?token=' + this.state.pokemonsearchname)
      .then(res => {
        const pokemon = res.data;

        var str = pokemon.name;
        var n = str.toUpperCase();
        this.setState({ name: n });

        this.setState({ types: pokemon.types });
        this.setState({ imageurl: pokemon.imageurl });
        this.setState({ baseexp: pokemon.baseexp });
        this.setState({ height: pokemon.height });
        this.setState({ order: pokemon.order });
        this.setState({ weight: pokemon.weight });

        this.setState({ showPokeResult: true });
        this.setState({ showpoketable: true });
        console.log(pokemon);
      })
  };

  getHistory = (event) => {
    axios.get('https://mega-pokedex.herokuapp.com/history')
      .then(res => {
        const history = res.data;
        this.setState({ history: history });
        console.log(history);
      })
  };

  handleClickPokedex = () => {
    this.setState({ showPokeResult: true });
  }

  handleClickHistory = () => {
    this.setState({ showPokeResult: false });
    this.getHistory();
  }

  componentDidMount() {
    console.log('Test');
  };

  render() {
    const { classes } = this.props;

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
          <List>
            <ListItem button onClick={this.handleClickPokedex} id={"pokedexSearch"}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pokedex" />
            </ListItem>
            <ListItem button onClick={this.handleClickHistory} id={"history"}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
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
          {this.state.showPokeResult ?
            <div>
              {this.state.showpoketable ?
                <PokeTable
                  name={this.state.name}
                  types={this.state.types}
                  imageurl={this.state.imageurl}
                  baseexp={this.state.baseexp}
                  height={this.state.height}
                  order={this.state.order}
                  weight={this.state.weight}
                >
                </PokeTable>
                : null}
            </div>
            : <HistoryTable history={this.state.history}></HistoryTable>}
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);