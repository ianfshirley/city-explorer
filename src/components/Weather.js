import React from 'react';

export default class Weather extends React.Component {
  render() {
    console.log(this.props.forecast, typeof(this.props.forecast));
    return(
      <>
        <div>
          <h3>3 Day Weather Forecast</h3>
          {this.props.forecast.map((day) => (
            <>
              <ul>
                <li>
                <p>date: {day.date}</p>
                <p>description: {day.description}</p>
                </li>
              </ul>
            </>
          )
          )}
        </div>
      </>
    )
  }
}