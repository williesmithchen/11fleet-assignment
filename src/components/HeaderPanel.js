import React from 'react';
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/FavoriteBorder';
import { filterRestaurants } from '../actions';

class HeaderPanel extends React.Component {

  constructor() {
    super();
    this.state = { selectedType: "All" };
  }

  onChange = (event) => {
    const selectedType = event.target.value || "";
    this.props.filterRestaurants(selectedType);
    this.setState((state) => ({ ...state, selectedType }));
  }

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar style={{ "display": "inline-flex" }}>
          <div style={{ "flex": "0 0 33.33vw" }}>
            <Typography variant="h6">Restaurants</Typography>
          </div>
          <div style={{ "flex": "1 1 33.33vw" }}>
            <div style={{ "display": "inline-block" }}>
              <Typography variant="h6">Type:</Typography>
            </div>
            <div style={{ "display": "inline-block" }}>
              <Select
                value={this.state.selectedType}
                displayEmpty
                onChange={this.onChange}
                name="Types"
                style={{ minWidth: "16vw", backgroundColor: "white", marginLeft: "4vw", "paddingLeft": ".5em" }}
              >
                <MenuItem value="All" key="type">
                  <Typography variant="subtitle1"> All</Typography>
                </MenuItem>
                {this.props.types.map((type) => (
                  <MenuItem value={type} key={type}>
                    <Typography variant="subtitle1">{type}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div style= {{ marginLeft: "10em" }}>
            <Button variant="contained" size="small" onClick={() => this.props.toggleDrawer(true)}>
              <Favorite />
              <span style={{ "marginLeft": ".5em" }}>Favourites</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = ({ types }) => ({ types });

export default connect(mapStateToProps, { filterRestaurants })(HeaderPanel);
