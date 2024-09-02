"use client";
import Map, { Marker } from "react-map-gl";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "@/components/Spinner";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import LocationIcon from "@/assets/images/pin.svg";
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewprot, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API,
    language: "en",
    region: "us",
  });
  useEffect(() => {
    const getCoorinages = async () => {
      try {
        const { results } = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (results.length == 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewprot,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        setGeocodeError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCoorinages();
  }, []);
  if (loading) return <Spinner />;
  if (geocodeError) return <div>No Location is found!</div>;
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
      mapLib={import("mapbox-gl")}
      {...viewprot}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 12,
      }}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image alt="" src={LocationIcon} width={40} height={40} />
      </Marker>
    </Map>
  );
};
export default PropertyMap;
