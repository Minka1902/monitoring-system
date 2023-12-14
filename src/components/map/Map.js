import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl } from "react-leaflet";
import React from 'react';
import Topography from 'leaflet-topography';
import { options, maps, markersArray } from '../../constants/leaflet/mapOptions';
import { customMarkerCross } from '../../constants/leaflet/markers';

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, 7);

  return null;
};

export default function Map({ coords }) {
  const { BaseLayer } = LayersControl;

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(evt) {
        Topography.getTopography(evt.latlng, options)
          .then((data) => {
            console.log(`Elevation: ${data.elevation}`);
          })
          .catch((err) => {
            console.log(`Map click error: ${err}`);
          });
      },
    });
    return null;
  };

  return (
    <div id='map'>
      <MapContainer
        center={coords}
        minZoom={7}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <SetViewOnClick coords={coords} />
        <LocationFinderDummy />

        {markersArray.map((marker, index) => {
          return (
            <Marker key={index} icon={customMarkerCross} position={[marker.coords[1], marker.coords[0]]}>
              <Popup>
                <p>{marker.name}</p>
              </Popup>
            </Marker>
          );
        })}

        <LayersControl>
          {maps.map((map, index) => {
            if (map.valid) {
              return (
                <BaseLayer checked={map.checked} name={map.name} key={index}>
                  <TileLayer
                    className='TileLayer'
                    url={map.url}
                    attribution={map.attribution}
                  />
                </BaseLayer>);
            }
          })}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
