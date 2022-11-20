import React from 'react';
import WeatherDay from './WeatherDay';

export default class Weather extends React.Component {

  render() {
    console.log('info', this.props.forecast);
    // console.log('important',info['app_temp']);
    return (
      <>
        {this.props.forecast.length < 1 ? <p></p> :
          <div>
            <p>3 Day Forecast</p>
            {this.props.forecast.map((day, idx) => (
              <WeatherDay dailyForecast={day} key={idx} />
            ))}
          </div>
        }
      </>
    )
  }
}