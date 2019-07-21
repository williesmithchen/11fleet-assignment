import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRestaurants, selectRestaurant, fetchFavourites } from '../actions';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class AppMap extends Component {
  constructor(){
    super();
    this.state = {
      center: {
        lat: 25.0289776,
        lng: 121.5553482
      },
      zoom: 16.5,
    };
  };

  componentDidMount(){
    this.props.fetchRestaurants();
    this.props.fetchFavourites();
  }

  handleMarkerClick = (id) => {
    this.props.selectRestaurant(id);
    this.props.toggleDrawerInfo(true);
  }

  render() {
    const { center, zoom } = this.state;
    const { selected, places = [] } = this.props;
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {!!places ? places.map((place, index) => {
              const {
                id = `${index}`,
                logo = `https://fakeimg.pl/32x32/?retina=1&text=${index}&font=noto&font_size=20`,
                restaurantInfo,
                lat,
                lng
              } = place;
              const { name, time: { start = 800, end = 1700 } } = restaurantInfo;
              return (
                <Marker
                  imgUrl={logo}
                  label={name}
                  lat={lat}
                  lng={lng}
                  key={`${index}-${name}`}
                  id={id}
                  onMarkerClick={this.handleMarkerClick}
                  selected={selected}
                  start={start}
                  end={end}
                />
              );
            }): null}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = ({ filtered, selected }) => ({ places: filtered, selected });

export default connect(mapStateToProps, { fetchRestaurants, selectRestaurant, fetchFavourites })(AppMap);
