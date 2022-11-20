import React from 'react';

export default class Location extends React.Component {
  render() {
    // let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`;
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