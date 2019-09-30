import React from 'react';
import MyGoogleMap from './MyGoogleMap';
import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import httpRequestHelper from './httpRequestHelper'
import LocationCard from './LocationCard';
import Toast from 'react-bootstrap/Toast'

require('dotenv').config()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      editingIndex: -1,
      showToast: false,
      toastMessage: 'Test message',
      toastMessagePositive: true
    }

    this.setEditMode = this.setEditMode.bind(this)
    this.deleteLocation = this.deleteLocation.bind(this)
  }

  async onMapClick(obj) {
    let lat = obj.latLng.lat()
    let lng = obj.latLng.lng();
    let {locations, editingIndex} = this.state

    let position = {
      lat,
      lng
    }
    if(editingIndex === -1) {
      const response = await httpRequestHelper.addLocation(position)
      if(response && response.status === 200) {
        locations.push(response.data)
        this.toggleToast('Location added successfully', true)
      } else {
        this.toggleToast('Location could not be added', false)
      }
      
    } else {
      let id = locations[editingIndex].id
      const response = await httpRequestHelper.editLocation(id, position)
      if(response && response.status === 200) {
        locations[editingIndex] = response.data
        this.toggleToast('Location edited successfully', true)
      } else {
        this.toggleToast('Location could not be edited', false)
      } 
      editingIndex = -1
    }

    this.setState({
      locations,
      editingIndex
    })
  }

  setEditMode(index) {
    this.setState({
      editingIndex: index
    })
  }

  async componentDidMount() {
    const response = await httpRequestHelper.getAllLocations()
    if(response && response.status === 200) {
      let locations = response.data
      this.setState({
        locations
      })
    } else {
      this.toggleToast('The data could not be loaded', false)
    }
  }

  async deleteLocation(index) {
    let {locations} = this.state
    const id = locations[index].id
    const response = await httpRequestHelper.deleteLocation(id)
    if(response.status === 200) {
      locations.splice(index, 1)
      this.setState({
        locations
      })
      this.toggleToast('Location deleted successfully', true)
    } else {
      this.toggleToast('The location could not be deleted', false)
    }
  }

  toggleToast(message = '', positive=true) {
    let value = this.state.showToast
    this.setState({
      showToast: !value,
      toastMessage: message,
      toastMessagePositive: positive
    })
  }

  renderLocationCard(data, index) {
    let locationCardConfig = {
      index,
      data,
      editingIndex: this.state.editingIndex,
      editModeFn: this.setEditMode,
      deleteFn: this.deleteLocation
    }

    return (
      <LocationCard config={locationCardConfig} />
    )
  }

  render() {
    const mapConfig = {
      onMapClick: this.onMapClick.bind(this),
      locations: this.state.locations
    }

    let notification
    const {editingIndex} = this.state
    if(this.state.editingIndex === -1) {
      notification = 'Click on the map to add a new location'
    } else {
      let currentLoc = this.state.locations[editingIndex]
      notification = `Click on the map to edit location "${currentLoc.name}"`
    }

    return (
      <div className="appContainer">
        <div className="title">
          <h2>Locations App</h2>
        </div>
        <div className="notifications">{notification}</div>
        <Toast show={this.state.showToast} onClose={this.toggleToast.bind(this, false)} autohide>
          <div className={`customToast ${this.state.toastMessagePositive ? 'positive': 'negative'}`}>
            {this.state.toastMessage}
          </div>
        </Toast>
        <div className="row">
          <div className="col-md-6 mapContainer">
            <MyGoogleMap config={mapConfig} />
          </div>
          <div className="col-md-6">
            <div className="row locCardsContainer">
              {this.state.locations.map(this.renderLocationCard.bind(this))}
            </div>
          </div>

        </div>
        
      </div>
    )
  }
}

export default App;
