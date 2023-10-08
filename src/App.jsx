import { useEffect, useState } from 'react';

function App() {
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setUserLocation(position.coords)
      );
    }
  }, []);

  console.log(userLocation);
  return (
    <>
      <h1>User location</h1>
      <p>Longitude: {userLocation.longitude}</p>
      <p>Longitude: {userLocation.latitude}</p>
    </>
  );
}

export default App;
