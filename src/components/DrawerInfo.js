import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addToFavourites } from '../actions';

class DrawerInfo extends React.Component {
  getContent = (selected = null) => {
    return ( selected ?
      <div>
        <Card style={{ width: "35vw" }}>
          <CardHeader
            avatar={<Avatar src={selected.logo} />}
            title={`${selected.restaurantInfo.name} Rating: ${selected.restaurantInfo.rating} / 10`}
          />
          <CardMedia
            style={{ height: "43vh" }}
            image={selected.img || `https://picsum.photos/853/480?random=${selected.id}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {selected.restaurantInfo.description}
            </Typography>
          </CardContent>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Menu</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {selected.restaurantInfo.menu}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <CardActions>
            <IconButton aria-label="Add to favorites" onClick={() => this.props.addToFavourites(selected.id)}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div> : "Not selected"
    );
  };

  render() {
    const { drawerOpened, toggleDrawer, selected } = this.props;
    return (
      <Drawer
        anchor="left"
        open={drawerOpened}
        onClose={() => toggleDrawer(false)}
      >
        {this.getContent(selected)}
      </Drawer>
    );
  }
}

const mapStateToProps = ({ selected }) => ({ selected });

export default connect(mapStateToProps, { addToFavourites })(DrawerInfo);
