/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Input from './components/Input';
// import Map from './components/Map';


import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

// import { useAppContext } from './hooks/useAppContext';
function App() {
  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyARObBLUsXQ-rKRXDlxKL-bXeKD-6tqCbk',
    libraries: ['places'],
  });

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        reverseGeocoding(position.coords.latitude, position.coords.longitude)
      );
    }
  }, []);

  const reverseGeocoding = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyARObBLUsXQ-rKRXDlxKL-bXeKD-6tqCbk`
      );
      const data = await res.json();
      setCenter(data.results[0].geometry.location);
      // setLatitude(lat);
      // setLongitude(lng);
    } catch (error) {
      console.error(error);
    }
  };

  // const [directions, setDirections] = useState(null);
  // const [distance, setDistance] = useState('');
  // const [duration, setDuration] = useState('');
  const destinationInputRef = useRef();

  const calculateRoute = async (e) => {
    e.preventDefault();
    console.log('calculate');
    // destinationInputRef.current.value = '';
    console.log(destinationInputRef.current);
    // if (destinationInputRef) {
    //   try {
    //     // eslint-disable-next-line no-undef
    //     const directionService = new google.maps.DirectionsService();
    //     const results = await directionService.route({
    //       origin: center,
    //       destination: destinationInputRef.current.value,
    //       // eslint-disable-next-line no-undef
    //       travelMode: google.maps.TravelMode.WALKING,
    //     });
    //     setDirections(results);

    //     setDistance(results.routes[0].legs[0].distance.text);
    //     setDuration(results.routes[0].legs[0].duration.text);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   setDirections(null);
    // }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = center;
    console.log(origin)
    const destination = destinationInputRef.current.value;
    console.log(destination)

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('RESULT', result);
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Input calculateRoute={calculateRoute} destinationRef={destinationInputRef} />
      </GoogleMap>
  ) : <></>
}

export default App;
