import React, { useContext } from "react";
import { SingleActivityContext } from "../context/SingleActivityContext"
import apikey from "../config";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const key=apikey

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 42.098843,
  lng: -75.920647
};

const lib = ['places']

function MapComponent() {
  
  const {singleActivity} = useContext(SingleActivityContext)
  
  const { isLoaded, loadError } = useJsApiLoader({
    libraries: lib,
        googleMapsApiKey: key
      })
     

    
    
    function MarkerComponent() {
        return  (
          <Marker
            position={{
              lat: singleActivity.geolocator[1][0],
              lng: singleActivity.geolocator[1][1]
            }}
          />
        );
      }

      if (!isLoaded || !singleActivity) {
        return <h3>Loading...</h3>;
      }
    return  (
        <div>
  
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
         
          >
              <MarkerComponent/>
            <></>
          </GoogleMap>
        </div>
      )
    }

export default MapComponent