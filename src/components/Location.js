import React from 'react';

export default class Location extends React.Component {
  render() {
    return(
      <>
        <div className='mapInfo'>
          <h3 className='mapTitle'>City: {this.props.location.display_name}</h3>
          <p>Latitude: {this.props.location.lat}</p>
          <p>Longitude: {this.props.location.lon}</p>
        </div>
        <img
          className='mapImg'
          src={this.props.mapURL}
          alt={this.props.location.display_name + 'map'}
        />
      </>
    )
  }
}