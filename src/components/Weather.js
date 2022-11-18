import React from 'react';

export default class Weather extends React.Component {

  render() {
    const info = this.props.forecast[2];
    console.log('info', info);
    // console.log('important',info['app_temp']);
    return (
      <>
        <h3>Current Weather</h3>
        <div>
          {/* {info.map(key => {
            return(<p>'hello'</p>)
          })} */}
          {/* {this.props.forecast[2].map((value, index) => {
            return (
              <p>{value}</p>
            );
            })
          } */}
          {this.props.forecast[3]}
        </div>
      </>
    )
  }
}