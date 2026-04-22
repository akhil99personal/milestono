import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import "./MapInput.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 18.52097398044019,
  lng: 73.86017831259551,
};

const MapInput = ({ onLocationSelect, selectedLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(selectedLocation);
  const mapRef = useRef(null);

  const handleMapClick = useCallback(
    (event) => {
      const latLng = event.latLng;
      const newLocation = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
      setMarkerPosition(newLocation);
      onLocationSelect(newLocation);
    },
    [onLocationSelect],
  );

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.panTo(selectedLocation);
    }
    setMarkerPosition(selectedLocation);
  }, [selectedLocation]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || defaultCenter}
      zoom={14}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};
MapInput.propTypes = {
  onLocationSelect: PropTypes.func,
  selectedLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};
export default MapInput;
