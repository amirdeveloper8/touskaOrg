import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 35.7028925,
  lng: 51.38373559999999,
};

function MapSec() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCrr47MbYsLVHVdj_SBo-SUsDkWR5t12h4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapSec);
