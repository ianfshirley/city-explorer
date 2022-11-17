import React from 'react';

export default class Weather extends React.Component {
  render() {
    console.log(this.props.forecast, typeof(this.props.forecast));
    return(
      <>
        <h3>3 Day Weather Forecast</h3>
        <ul>
          {this.props.forecast.map((day) => (
            <li>
              <p>date: {day.date}</p>
              <p>description: {day.description}</p>
            </li>
          )
          )}
        </ul>
      </>
    )
  }
}