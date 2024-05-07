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

    

      if (loadError) {
        return <div>Error loading maps: {loadError.message}</div>;
      }

        // Check if singleActivity exists and has a geolocator property

      if (!isLoaded || !singleActivity.geolocator) {
        return <div>Loading...</div>;
      }

    return  (
      <div >
        <div >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Check if geolocator is an array with 2 elements*/}
            
            {Array.isArray(singleActivity.geolocator) && singleActivity.geolocator.length === 2 && (
              <Marker
                position={{
                  lat: singleActivity.geolocator[1][0],
                  lng: singleActivity.geolocator[1][1]
                }}
              />
            )}
            <></>
          </GoogleMap>
        </div>
      </div>
      )
    }

export default MapComponent


// function MarkerComponent() {
    //     return  (
    //       <Marker
    //         position={{
    //           lat: singleActivity.geolocator[1][0],
    //           lng: singleActivity.geolocator[1][1]
    //         }}
    //       />
    //     );
    //   }

    
      // if (!singleActivity) {
      //   return null
      // }

        {/* <MarkerComponent/> */}

        //   useEffect(() => {
//     fetch(`/activities/${id}`)
//     .then(res => {
//         if (res.status === 200) {
//             res.json().then(data => {
//                 console.log(data)
//                 setSingleActivity(data)})
//         }
//     })
    
// }, [])