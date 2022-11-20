import React from 'react';
import Movie from './Movie';

export default class Movies extends React.Component {

  render() {
    console.log('topTenMovies: ', this.props.topTenMovies);
    return (
      <>
        {this.props.topTenMovies.length < 1 ? <p></p> :
          <div className='topTenMovies'>
            {this.props.topTenMovies.map((movie, idx) => (
              <Movie oneMovie={movie} key={idx} />
            ))}
          </div>
        }
      </>
    )
  }
}