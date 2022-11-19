import React from 'react';

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
              <div key={idx}>
                <p>Date: {day.date}</p>
                <p>
                  Low of {day.low}°C, high of {day.high} with {day.description}
                </p>
              </div>
            ))
            }
          </div>
        }
      </>
    )
  }
}