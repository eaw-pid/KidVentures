import React, { useContext, useEffect } from "react";
import { SingleActivityContext } from "../context/SingleActivityContext"
import apikey from "../config";
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const key=apikey

const containerStyle = {
  width: '400px',
  height: '400px',
  
};

const center = {
  lat: 42.098843,
  lng: -75.920647
};

const lib = ['places']

function MapComponent() {
  
  const {singleActivity, setSingleActivity} = useContext(SingleActivityContext)
  const {id} = useParams()
  const { isLoaded, loadError } = useJsApiLoader({
    libraries: lib,
        googleMapsApiKey: key
      })
    
    console.log(id)
    console.log(singleActivity)
    console.log(singleActivity.geolocator)

    useEffect(() => {
      fetch(`/activities/${id}`)
      .then(res => {
          if (res.status === 200) {
              res.json().then(data => {
                  console.log(data)
                  setSingleActivity(data)})
          }
      })
      
  }, [])
    
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
      <div >
        <div >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
              <MarkerComponent/>
            <></>
          </GoogleMap>
        </div>
      </div>
      )
    }

export default MapComponent