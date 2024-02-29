import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import MarkersContext from "../../contexts/MarkersContext";
import DataContext from "../../contexts/DataContext";
import proj4 from 'proj4';
import epsg from 'epsg';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl, Polygon } from "react-leaflet";
import { shortenString } from '../../constants/functions';
import React from 'react';
import Topography from 'leaflet-topography';
import { options, maps, poly } from '../../constants/leaflet/mapOptions';
import { customMarkerDotBlack, customMarkerDotRed, customMarkerDotBlue, customMarkerDotGreen } from '../../constants/leaflet/markers';

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, 7);

  return null;
};

export default function Map({ coords }) {
  const { BaseLayer } = LayersControl;
  const mapRef = React.useRef();
  const markersArray = [customMarkerDotBlue, customMarkerDotRed, customMarkerDotGreen]
  const markers = React.useContext(MarkersContext);
  const wellsData = React.useContext(DataContext);

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

  const epsgConvert = ({ x, y, toEpsg = 4326, fromEpsg = 2039 }) => {
    const toProj = epsg[`EPSG:${toEpsg}`];
    const fromProj = epsg[`EPSG:${fromEpsg}`];
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
    if (markers !== undefined) {
      if (markers.length > 0 && coords[0] !== 31.3) {
        map.setView(coords, 10);
      }
    }
    return null;
  };

  return (
    <div id='map'>
      <MapContainer
        center={coords}
        minZoom={7}
        zoom={7}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        ref={mapRef}
      >
        <Polygon positions={CreatePolygon()} />
        {coords[0] === 31.3 && coords[1] === 34.8 ? wellsData !== undefined ? <SetViewOnClick coords={coords} /> : <ZoomIn /> : <ZoomIn />}
        <LocationFinderDummy />

        {markers ?
          markers.map((marker, index) => {
            return (
              <Marker key={index} icon={customMarkerDotBlack} position={epsgConvert({ x: marker.x, y: marker.y }).reverse()}>
                <Popup>
                  {Object.keys(marker).map((prop, index) => {
                    if (prop !== 'x' && prop !== 'y') {
                      return (
                        <p style={{ margin: 0 }} key={index}><span style={{ textTransform: 'capitalize' }}>{prop}</span>: {marker[prop]}</p>
                      );
                    }
                  })}
                </Popup>
              </Marker>
            );
          }) :
          <>
            {wellsData ? Object.keys(wellsData).map((key, markerIndex) => {
              return wellsData[key].map((well, index) => {
                return (
                  <Marker key={index} icon={markersArray[markerIndex]} position={epsgConvert({ x: well.x, y: well.y }).reverse()}>
                    <Popup>
                      {Object.keys(well).map((prop, index) => {
                        if (prop !== 'x' && prop !== 'y') {
                          return (
                            <p style={{ margin: 0 }} key={index}><span style={{ textTransform: 'capitalize' }}>{prop}</span>: {well[prop]}</p>
                          );
                        }
                      })}
                    </Popup>
                  </Marker>
                );
              })
            }) : <></>}
          </>
        }

        <LayersControl>
          {maps.map((map, index) => {
            if (map.valid) {
              return (
                <BaseLayer checked={map.checked} name={map.name} key={map.url + index}>
                  <TileLayer
                    className='TileLayer'
                    url={map.url}
                    attribution={shortenString(map.attribution)}
                  />
                </BaseLayer>);
            };
          })}
        </LayersControl>
      </MapContainer>
    </div >
  );
};
