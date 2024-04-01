"use client";

import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";
import { useState } from "react";
import studios from "../../../data/studios.json";
// import API_KEY from "../../../API_KEY.json";
import { Button } from "./ui/button";

interface cityInfo {
  [key: string]: string | number;
}

const API_KEY = { API_KEY: "API_KEY" };

const maps = [
  {
    name: "Backdrop",
    url: `https://api.maptiler.com/maps/backdrop/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Basic",
    url: `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Bright",
    url: `https://api.maptiler.com/maps/bright-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Dataviz",
    url: `https://api.maptiler.com/maps/dataviz/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Landscape",
    url: `https://api.maptiler.com/maps/landscape/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Ocean",
    url: `https://api.maptiler.com/maps/ocean/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "OpenStreetMaps",
    url: `https://api.maptiler.com/maps/openstreetmap/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Outdoor",
    url: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Satellite",
    url: `https://api.maptiler.com/maps/satellite/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Streets",
    url: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Toner",
    url: `https://api.maptiler.com/maps/toner-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Topo",
    url: `https://api.maptiler.com/maps/topo-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Winter",
    url: `https://api.maptiler.com/maps/winter-v2/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "JP Mierune Dark",
    url: `https://api.maptiler.com/maps/jp-mierune-dark/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "JP Mierune Gray",
    url: `https://api.maptiler.com/maps/jp-mierune-gray/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "JP Mierune Streets",
    url: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "Cadastre Satellite",
    url: `https://api.maptiler.com/maps/cadastre-satellite/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "CH Swisstopo",
    url: `https://api.maptiler.com/maps/ch-swisstopo-lbm/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "CH Swisstopo Lbm Dark",
    url: `https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "CH Swisstopo Lbm Grey",
    url: `https://api.maptiler.com/maps/ch-swisstopo-lbm-grey/style.json?key=${API_KEY.API_KEY}`,
  },
  {
    name: "CH Swisstopo Lbm Vivid",
    url: `https://api.maptiler.com/maps/ch-swisstopo-lbm-vivid/style.json?key=${API_KEY.API_KEY}`,
  },
];

const MapContainer = () => {
  const [style, setStyle] = useState(
    `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY.API_KEY}`
  );
  const [popupInfo, setPopupInfo] = useState<cityInfo | null>(null);

  return (
    <>
      <header className="py-4 border-b border-neutral-400 flex justify-center items-center w-full text-4xl font-extrabold px-8">
        <div className="h-full flex items-center">
          <div className="flex justify-center items-center flex-row flex-wrap gap-x-4 gap-y-2 h-fit">
            {maps.map(({ name, url }) => (
              <Button
                variant={"secondary"}
                key={name}
                size={"sm"}
                onClick={() => setStyle(url)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </header>
      <Map
        initialViewState={{
          latitude: -23.56935,
          longitude: -46.656609,
          zoom: 13,
        }}
        mapLib={import("maplibre-gl")}
        style={{ width: "100%", height: "100%" }}
        mapStyle={style}
      >
        <NavigationControl />
        {studios.map((studio, index) => (
          <Marker
            key={index}
            latitude={studio.latitude}
            longitude={studio.longitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(studio);
            }}
          >
            <MapPin size={42} fill="Orange" className="text-white/70" />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            closeButton={false}
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.name}, {popupInfo.city}
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapContainer;
