import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Input from './components/Input';
import Map from './components/Map';

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });
  const [userLocation, setUserLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [input, setInput] = useState('');

  // const getDirections = async () => {};
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
  };

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
        input={input}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <Map lat={latitude} lng={longitude} />
    </section>
  );
}

export default App;
