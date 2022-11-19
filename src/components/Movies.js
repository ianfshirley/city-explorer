import React from 'react';

export default class Movies extends React.Component {

  render() {
    console.log('topTenMovies: ', this.props.topTenMovies);
    return (
      <>
        {this.props.topTenMovies.length < 1 ? <p></p> : 
          <div className='topTenMovies'>
            {this.props.topTenMovies.map((movie, idx) => (
              <div key={idx}>
                <p>Movie: {movie.title}</p>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Overview: {movie.overview}</p>
                <img src={movie.url} alt={movie.title} title={movie.title}/>
              </div>
            ))}
          </div>
        }
      </>
    )
  }
}