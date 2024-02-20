import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import MarkersContext from "../../contexts/MarkersContext";
import proj4 from 'proj4';
import epsg from 'epsg';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl, Polygon } from "react-leaflet";
import React from 'react';
import Topography from 'leaflet-topography';
import { options, maps, poly } from '../../constants/leaflet/mapOptions';
import { customMarkerDot } from '../../constants/leaflet/markers';

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, 7);

  return null;
};

export default function Map({ coords }) {
  const { BaseLayer } = LayersControl;
  const markers = React.useContext(MarkersContext);

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

  const epsgConvert = ({ x, y }) => {
    const toProj = epsg['EPSG:4326'];
    const fromProj = epsg['EPSG:2039'];
    let coordinates = proj4(fromProj, toProj, [parseFloat(x), parseFloat(y)]);
    return coordinates;
  };

  function CreatePolygon() {
    let polygon = [];

    for (let i = 0; i < poly.length; i++) {
      polygon[i] = epsgConvert({ x: poly[i][0], y: poly[i][1] }).reverse();
    };

    return polygon;
  };

  function ZoomIn() {
    const map = useMap();
    if (markers.length > 0 && coords[0] !== 31.3) {
      map.setView(coords, 11);
    }
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
        {coords[0] === 31.3 && coords[1] === 34.8 ? <SetViewOnClick coords={coords} /> : <ZoomIn />}
        <LocationFinderDummy />

        {markers.map((marker, index) => {
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
                <BaseLayer checked={map.checked} name={map.name} key={map.url + index}>
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
