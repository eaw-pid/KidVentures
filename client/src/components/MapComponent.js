import React, { useContext } from "react";
import { SingleActivityContext } from "../context/SingleActivityContext"
import apikey from "../config";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const key=apikey

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: 42.098843,
    lng: -75.920647
  };


  function MapComponent() {



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apikey
        // process.env.REACT_APP_MAPS_API_KEY
      })

    
    const {singleActivity} = useContext(SingleActivityContext)
    
    console.log(singleActivity)
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

  
      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
       
        >
            <MarkerComponent/>
          <></>
        </GoogleMap>
    ) : <></>
    }

export default MapComponent