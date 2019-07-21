import React from 'react';
import AppMap from './AppMap';
import HeaderPanel from './HeaderPanel';
import DrawerFavourites from './DrawerFavourites';
import DrawerInfo from './DrawerInfo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerFavOpened: false,
      drawerInfoOpened: false,
    }
  }

  toggleDrawerFav = (drawerFavOpened = false) => {
    this.setState((state) => ({ ...state, drawerFavOpened }));
  };

  toggleDrawerInfo = (drawerInfoOpened = false) => {
    this.setState((state) => ({ ...state, drawerInfoOpened }));
  };

  render () {
    return (
      <div>
        <HeaderPanel toggleDrawer={this.toggleDrawerFav} />
        <DrawerFavourites
          drawerOpened={this.state.drawerFavOpened}
          toggleDrawer={this.toggleDrawerFav}
        />
        <DrawerInfo
          drawerOpened={this.state.drawerInfoOpened}
          toggleDrawer={this.toggleDrawerInfo}
        />
        <AppMap toggleDrawerInfo={this.toggleDrawerInfo}/>
      </div>
    );
  }
};

export default App;
