import { useJsApiLoader } from '@react-google-maps/api';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  console.log('children', children);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyARObBLUsXQ-rKRXDlxKL-bXeKD-6tqCbk',
    libraries: ['places'],
  });

  const [userLocation, setUserLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const destinationInputRef = useRef();
  const center = { lat: latitude, lng: longitude };

  useEffect(() => {}, []);
  const reverseGeocoding = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();
      setUserLocation(data);
      setLatitude(lat);
      setLongitude(lng);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateRoute = async (e) => {
    e.preventDefault();
    console.log('calculate');
    // setDirections(null);
    // setDistance('');
    // setDuration('');
    // console.log('kjdsssui');
    // // destinationInputRef.current.value = '';
    // console.log(destinationInputRef.current);
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
  };

  const clearRoute = () => {
    setDirections(null);
    console.log('clear');
    setDistance('');
    setDuration('');
    destinationInputRef.current.value = '';
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        reverseGeocoding(position.coords.latitude, position.coords.longitude)
      );
    }
  }, []);

  const state = {
    isLoaded,
    userLocation,
    map,
    setMap,
    directions,
    distance,
    duration,
    calculateRoute,
    clearRoute,
    destinationInputRef,
    center,
  };

  return (
    <AppContext.Provider value={{...state}}>
      {children}
    </AppContext.Provider>
  );
};
