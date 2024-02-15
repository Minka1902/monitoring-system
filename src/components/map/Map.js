import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import proj4 from 'proj4';
// import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl, Polygon } from "react-leaflet";
import React from 'react';
import Topography from 'leaflet-topography';
import { options, maps, markersArray, poly } from '../../constants/leaflet/mapOptions';
import { customMarkerDot } from '../../constants/leaflet/markers';

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, 7);

  return null;
};

const epsgConvert = ({ x, y }) => {
  const epsg = require('epsg');
  let fromProj = epsg[`EPSG:2039`];
  let toProj = epsg[`EPSG:4326`];
  if (toProj && fromProj) {
    return proj4(fromProj, toProj, [x, y]);
  } else {
    console.log("Error! EPSG CODE NON-EXISTING!")
  }
};

function CreatePolygon() {
  let polygon = [];

  for (let i = 0; i < poly.length; i++) {
    polygon[i] = epsgConvert({ x: poly[i][0], y: poly[i][1] }).reverse();
  };

  return polygon;
};

export default function Map({ coords }) {
  const { BaseLayer } = LayersControl;

  const LocationFinderDummy = () => {
    const map = useMapEvents({  //eslint-disable-line
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
        <Polygon positions={CreatePolygon()} />
        <SetViewOnClick coords={coords} />
        <LocationFinderDummy />

        {markersArray.map((marker, index) => {
          return (
            <Marker key={index} icon={customMarkerDot} position={epsgConvert({ x: marker.x, y: marker.y }).reverse()}>
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
            } return <></>;
          })}
        </LayersControl>
      </MapContainer>
    </div >
  );
}
