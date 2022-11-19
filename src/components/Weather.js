import React from 'react';

export default class Weather extends React.Component {

  render() {
    console.log('info', this.props.forecast);
    // console.log('important',info['app_temp']);
    return (
      <>
        <h3>Current Weather</h3>
        <div>
          {this.props.forecast.map((day, idx) => (
            <div key={idx}>
              <p>Date: {day.date}</p>
              <p>high: {day.high}</p>
              <p>low: {day.low}</p>
              <p>desc: {day.description}</p>
            </div>
          ))
          }
        </div>
      </>
    )
  }
}