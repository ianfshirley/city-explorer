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
      // console.log(e.target.city.value);
      // get the data from the API
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`)
      // console.log('locationInfo: ', locationInfo);
      // save that data in state
      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
        isAlertShown: false,
        // isModalShown: true,
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon
      })
      this.handleWeather(this.state.city);
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true
      })
    }
  }

  // handleCloseModal = () => {
  //   this.setState({
  //     isModalShown: false,
  //   })
  // }

  handleWeather = async (city) => {
    try {
      console.log('here is the weather city', city)
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`
      console.log(weatherUrl);
      let weatherInfo = await (await axios.get(weatherUrl));
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

  render() {
    console.log(this.state);

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
        </div>

        <Weather forecast={this.state.weatherInfo} />
        
        
      </>
    )
  }
}