import { useState, useEffect } from 'react';

/**
 * Custom React hook for getting the user's current geolocation.
 * Automatically handles permission errors and loading states.
 */
const useGeolocation = (options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setError('');
      setLoading(false);
    };

    const errorHandler = (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError('Permission denied. Unable to access your location.');
          setPermissionDenied(true);
          break;
        case err.POSITION_UNAVAILABLE:
          setError('Location information is unavailable.');
          break;
        case err.TIMEOUT:
          setError('Request for location timed out.');
          break;
        default:
          setError('An unknown geolocation error occurred.');
          break;
      }
      setLoading(false);
    };

    // Request current position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);

    // Optional cleanup: stop watching position if you add watchPosition later
    return () => {
      // no cleanup needed for getCurrentPosition
    };
  }, [options]);

  return { location, error, loading, permissionDenied };
};

export default useGeolocation;
