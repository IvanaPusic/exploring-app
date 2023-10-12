import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import Input from './components/Input';

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ['places'],
  });
  const [userLocation, setUserLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const destinationRef = useRef();

  const center = { lat: latitude, lng: longitude };

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
    if (!destinationRef.current.value) return;

    try {
      // eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: center,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.WALKING,
      });
      setDirections(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error(error);
    }
  };

  const clearRoute = () => {
    setDirections(null);
    setDistance('');
    setDuration('');
    destinationRef.current.value = '';
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        reverseGeocoding(position.coords.latitude, position.coords.longitude)
      );
    }
  }, []);

  if (!isLoaded) {
    return (
      <section className='flex justify-center align-center'>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className='flex justify-center '>
      <Input
        destinationRef={destinationRef}
        map={map}
        center={center}
        calculateRoute={calculateRoute}
        clearRoute={clearRoute}
        distance={distance}
        duration={duration}
      />
      <GoogleMap
        center={center}
        mapContainerClassName='map'
        zoom={15}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </section>
  );
}

export default App;
