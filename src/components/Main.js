import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather';
import Movies from './Movies';
import Location from './Location';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      city: '',
      cityData: {},
      lat: '',
      lon: '',
      weatherInfo: [],
      movieInfo: [],
      errorMsg: '',
      isError: false,
    }
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  handleCitySubmit = async (e) => {
    try {
      e.preventDefault();
      // get the data from the API
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)
      // save that data in state
      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
        isAlertShown: false,
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon
      },
        () => {
          this.handleWeather();
          this.handleMovies();
        }
      )
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true
      })
    }
  }

  handleWeather = async (lat, lon) => {
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`
      let weatherInfo = await axios.get(weatherUrl);

      this.setState({
        isError: false,
        weatherInfo: weatherInfo.data
      })
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true
      })
    }
  }

  handleMovies = async () => {
    try {
      let movieUrl = `${process.env.REACT_APP_SERVER}/movies?selectedCity=${this.state.city}`;
      let movieInfo = await axios.get(movieUrl);
      this.setState({
        isError: false,
        movieInfo: movieInfo.data
      })
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true
      })
    }
  }

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`;
    return (
      <>
        <Form onSubmit={this.handleCitySubmit}>
          <Form.Label>Search City</Form.Label>
          <Form.Control type="text" name="city" placeholder="enter city..." onChange={this.handleCityInput} />
          <Button type="submit" >Explore!</Button>
        </Form>

        {this.state.isError === true ? <Alert className="alert" variant="danger"><Alert.Heading>Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}

        <div className='mapDiv'>
          {this.state.cityData.display_name && <Location location={this.state.cityData} mapURL={mapURL}/>}
        </div>
        <div className='weatherDiv'>
          {this.state.weatherInfo && <Weather forecast={this.state.weatherInfo} />}
        </div>
        <div className='movieDiv'>
          {this.state.movieInfo && <Movies topTenMovies={this.state.movieInfo} />} 
        </div>
      </>
    )
  }
}