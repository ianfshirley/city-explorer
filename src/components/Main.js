import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      city: '',
      cityData: {},
      lat: '',
      lon: '',
      errorMsg: '',
      isError: false,
      isModalShown: false
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
        isModalShown: true,
        lat: locationInfo.data[0].lat,
        lon: locationInfo.data[0].lon
      })
      this.handleWeather(locationInfo.data[0].lat, locationInfo.data[0].lon);
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true
      })
    }
  }

  handleCloseModal = () => {
    this.setState({
      isModalShown: false,
    })
  }

  handleWeather = async (lat, lon) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&city_name=${this.state.city}`
      console.log(url);
      let weatherInfo = await axios.get(url)
      console.log('weatherInfo: ', weatherInfo);
      this.setState({
        isError: false
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

    return (
      <>
        <Form onSubmit={this.handleCitySubmit}>
          <Form.Label>Search City</Form.Label>
          <Form.Control type="text" name="city" placeholder="enter city..." onChange={this.handleCityInput} />
          <Button type="submit" >Explore!</Button>
        </Form>

        {this.state.isError === true ? <Alert className="alert" variant="danger"><Alert.Heading>Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}

        <Modal
          show={this.state.isModalShown}
          onHide={this.handleCloseModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="modal-900px"
          className="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="modalTitle">{this.state.cityData.display_name}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Latitude: {this.state.cityData.lat}</p>
            <p>Longitude: {this.state.cityData.lon}</p>
            <div className="picDiv">
              <img
                className="modalMap"
                src={mapURL}
                alt={this.state.city.name + 'map'}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button id="modalButton" onClick={this.handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* {this.state.lat == true ? this.handleWeather(): this.state.errorMsg} */}
        {/* <p>City: {this.state.cityData.display_name}</p>
        <p>Latitude: {this.state.cityData.lat}</p>
        <p>Longitude: {this.state.cityData.lon}</p>
        <img src={mapURL} alt={this.state.cityData.display_name}/> */}
      </>
    )
  }
}