import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import Movie from './Movie';

export default class Movies extends React.Component {
  render() {

    let carouselItems = this.props.topTenMovies.map((movie, idx) => {
      return (
        <Carousel.Item className='movieCarouselItem' key={idx}>
          <Carousel.Caption className='movieCaption'>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Overview: {movie.overview}</p>
          </Carousel.Caption>
          <img className='movieImg' src={movie.url} alt={movie.title} title={movie.title} />
        </Carousel.Item>
      )
    });

    return (
      <>
        {this.props.topTenMovies.length < 1 ? <p></p> :
          <div className='topTenMovies'>
            <Container>
              <Carousel>
                {carouselItems}
              </Carousel>
            </Container>
          </div>
        }
      </>
    )
  }
}