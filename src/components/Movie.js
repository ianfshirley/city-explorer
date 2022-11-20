import React from 'react';

export default class Movie extends React.Component {

  render() {


    return (
      <div key={this.props.key}>
        <p>Movie: {this.props.oneMovie.title}</p>
        <p>Release Date: {this.props.oneMovie.releaseDate}</p>
        <p>Overview: {this.props.oneMovie.overview}</p>
        <img src={this.props.oneMovie.url} alt={this.props.oneMovie.title} title={this.props.oneMovie.title} />
      </div>
    )
  }
}