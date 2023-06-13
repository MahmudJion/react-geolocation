import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState(null);

  const Access_token = 'YOUR API ACCESS TOKEN';
  const format_type = 'json';

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          },
          () => {
            setStatus('Unable to retrieve your location');
          }
        );
      }
    };

    getLocation();
  }, []);

  const reverseGeoLocation = () => {
    axios
      .get(
        `https://us1.locationiq.com/v1/reverse.php?key=${Access_token}&lat=${lat}&lon=${lng}&format=${format_type}`
      )
      .then(function (response) {
        console.log(response);
        setAddress(response.data.display_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="Location">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      {status !== null ? <p>{status}</p> : ''}
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}

      {lat !== null ? (
        <div className="Address">
          <button onClick={reverseGeoLocation}>Get Full Address</button>
          <h1>Address</h1>
          {address && <p>Address: {address}</p>}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
