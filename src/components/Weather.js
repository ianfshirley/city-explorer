import React from 'react';

export default class Weather extends React.Component {

  render() {
    console.log('info', this.props.forecast[2]);
    // console.log('important',info['app_temp']);
    return (
      <>
        <h3>Current Weather</h3>
        <div>
          {this.props.forecast[2] ? 
            <div>
              temperature:
              <p>
                {this.props.forecast[2]['app_temp']}
              </p>
            </div>
            : null}
        </div>
      </>
    )
  }
}