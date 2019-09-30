import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import GLOBAL_CONFIG from '../config.json'

class MyGoogleMap extends React.Component {
    render() {
        const onMapClick = this.props.config.onMapClick
        const locations = this.props.config.locations
        
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={GLOBAL_CONFIG.DEFAULT_ZOOM}
            defaultCenter={{ lat: GLOBAL_CONFIG.DEFAULT_LATITUDE, lng: GLOBAL_CONFIG.DEFAULT_LONGITUDE }}
            onClick={onMapClick}
        >
            {locations.map((loc, index) => {
                return (
                    <MarkerWithLabel position={loc.position} 
                        labelAnchor={{x:0,y:0}}
                        labelStyle={{backgroundColor: "yellow", fontSize: "14px", padding: "3px"}}
                    >
                        <label>{loc.name}</label>
                    </MarkerWithLabel>
                )
            })}                 
        </GoogleMap>
        )) 
        const key = GLOBAL_CONFIG.GOOGLE_MAP_KEY || ''

        return (    
                <MyMapComponent isMarkerShown
                    googleMapURL={`${GLOBAL_CONFIG.GOOGLE_MAP_URL}&key=${key}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div className="thegooglemap" />}
                    mapElement={<div style={{ height: `100%` }} />}
                />               
          );
    }
}

export default MyGoogleMap
