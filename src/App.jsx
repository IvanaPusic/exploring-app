import { useEffect, useRef, useState } from 'react';
function App() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState({
    lat: 45.7957,
    lng: 15.96646,
  });
  const [distance, setDistance] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  const googleMapRef = useRef(null);
  const destinationInputRef = useRef();

  const getLatLng = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();
      // console.log(data.results[0].geometry.location);
      setUserLocation(data.results[0].geometry.location);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAndDisplayRoute = (
    directionsService,
    directionsDisplay,
    origin,
    destination
  ) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'WALKING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          setDistance(response.routes[0].legs[0].distance.text);
        } else {
          console.error('Directions request failed', status);
        }
      }
    );
  };

  const initializeMap = () => {
    const map = new window.google.maps.Map(googleMapRef.current, {
      center: userLocation,
      zoom: 15,
    });

    const markerA = new window.google.maps.Marker({
      position: userLocation,
      map: map,
      title: 'User location',
    });

    const markerB = new window.google.maps.Marker({
      position: destination,
      map: map,
      title: 'destination',
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
    setDirectionsService(directionsService);
    setDirectionsDisplay(directionsDisplay);
    calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      userLocation,
      destination
    );
    // const distanceBetweenMarkers =
    //   window.google.maps.geometry.spherical.computeDistanceBetween(
    //     new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
    //     new window.google.maps.LatLng(destination.lat, destination.lng)
    //   );

    //   setDistance(distanceBetweenMarkers);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        getLatLng(position.coords.latitude, position.coords.longitude)
      );
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_API_KEY
    }&libraries=geometry&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initializeMap);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [userLocation, destination]);

  return (
    <section className='flex justify-center '>
      {/* <Input />
      <Map /> */}
      <div ref={googleMapRef} style={{ width: '100%', height: '100vh' }}></div>
      <p>Distance between points: {distance}</p>
    </section>
  );
}

export default App;
