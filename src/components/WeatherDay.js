import React from 'react';

export default class WeatherDay extends React.Component {
  render() {
    return (
      <div className='weatherDay' key={this.props.idx}>
        <p>Date: {this.props.dailyForecast.date}</p>
        <p>
          Low of {this.props.dailyForecast.low}°C, high of {this.props.dailyForecast.high} with {this.props.dailyForecast.description}
        </p>
      </div>
    )
  }
}