import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Player from './Player';
import _ from 'lodash';

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
});

class Dashboard extends React.Component {
  state = {
    open: false,
    playerList: [],
    draftedPlayers: [],
    showDrafted: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  async componentDidMount() {
    const draftRankings = await this.getServerData('draft-rankings', 'DraftRankings');
    const depthCharts = await this.getServerData('depth-charts', 'DepthCharts');
    const teams = await this.getServerData('nfl-teams', 'NFLTeams');
    const tiers = await this.getServerData('tiers');
    const playerList = _.chain(draftRankings)
      .map(p => ({
        ...p,
        ..._.find(depthCharts[p.team][p.position], { playerId: p.playerId }),
        team: _.find(teams, { code: p.team }),
        tier: _.find(tiers, { playerId: p.playerId }),
        drafted: false,
      }))
      .value();
    this.setState({...this.state, playerList, tiers });
  }

  async getServerData(url, selector, params) {
    const response = await fetch(`http://localhost:8282/${url}`);
    const data = await response.json();
    return selector ? data[selector] : data;
  }

  onDraftPlayer = (player, draftedBy) => {
    player.drafted = true;
    player.draftedBy = draftedBy;
    this.setState({...this.state });
  }

  onDisablePlayer = (player) => {
    player.drafted = !player.drafted;
    this.setState(this.state);
  }

  onFilteringDrafted = () => {
    this.setState({...this.state, showDrafted: !this.state.showDrafted })
  }

  render() {
    const { classes } = this.props;
    const players = this.state.playerList || [];
    const displayPlayers = this.state.showDrafted ? players : players.filter(p => !p.drafted);
    console.log('Listing players', players);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
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
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Draft Notes
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
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div style={{ paddingTop: 4, paddingBottom: 4, marginTop: 2, marginBottom: 2, fontWeight: 'bolder', fontVariant: 'small-caps', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{ flex: 1.5 }}>Player</div>
              <div style={{ flex: 1 }}>Position</div>
              <div style={{ flex: 1.5 }}>Team</div>
              <div style={{ flex: 1 }}>Depth</div>
              <div style={{ flex: 1 }}>Tier</div>
              <div style={{ flex: 1 }}>Nerd Rank</div>
              <div style={{ flex: 1 }}>Bye Week</div>
              <div style={{ flex: 1.5 }}>
                Show drafted 
                <Checkbox
                  checked={this.state.showDrafted}
                  onChange={this.onFilteringDrafted}
                  value="drafted"
                />
              </div>
            </div>
            <hr />
            {displayPlayers.map(p => <Player key={p.playerId} player={p} onDraftPlayer={this.onDraftPlayer} onDisablePlayer={this.onDisablePlayer} />)}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);