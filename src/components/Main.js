import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// import Modal from 'react-bootstrap/Modal';
import Weather from './Weather';


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
      // isModalShown: false
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
        // isModalShown: true,
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
      // console.log(weatherUrl);
      let weatherInfo = await axios.get(weatherUrl);

      console.log('weatherInfo: ', weatherInfo.data);
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
    try{
      console.log(' calling handleMovies' )
      let movieUrl = `${process.env.REACT_APP_SERVER}/movies?selectedCity=${this.state.city}`;
      let movieInfo = await axios.get(movieUrl);
      console.log('movieInfo: ', movieInfo.data);
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
    console.log('newData: ', this.state.weatherInfo);
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`;

    let newCity = (
      <>
        <div className='mapInfo'>
          <h3 className='mapTitle'>City: {this.state.cityData.display_name}</h3>
          <p>Latitude: {this.state.cityData.lat}</p>
          <p>Longitude: {this.state.cityData.lon}</p>
        </div>
        <img
          className='mapImg'
          src={mapURL}
          alt={this.state.city.name + 'map'}
        />
      </>
    )

    return (
      <>
        <Form onSubmit={this.handleCitySubmit}>
          <Form.Label>Search City</Form.Label>
          <Form.Control type="text" name="city" placeholder="enter city..." onChange={this.handleCityInput} />
          <Button type="submit" >Explore!</Button>
        </Form>

        {this.state.isError === true ? <Alert className="alert" variant="danger"><Alert.Heading>Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}

        <div className='mapDiv'>
          {this.state.cityData.display_name && newCity}
          {this.state.weatherInfo && <Weather forecast={this.state.weatherInfo} />}
        </div>

        
        
        
      </>
    )
  }
}