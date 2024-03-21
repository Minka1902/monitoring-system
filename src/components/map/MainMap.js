import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import DataContext from "../../contexts/DataContext";
import proj4 from 'proj4';
import epsg from 'epsg';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl, Polygon } from "react-leaflet";
import { shortenString, countNumberOfWells } from '../../constants/functions';
import React from 'react';
import Topography from 'leaflet-topography';
import { options, maps } from '../../constants/leaflet/mapOptions';
import { customMarkerDotRed } from '../../constants/leaflet/markers';

export default function Map({ coords, polygons, polyName }) {
  const { BaseLayer } = LayersControl;
  const mapRef = React.useRef();
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

  function FocusBoundingBox() {
    const map = useMap();
    if (polyName !== 'all') {
      if (polygons) {
        const asd = createPolygon(polygons[polyName]);
        map.fitBounds(asd);
      }
    }
  };

  function createPolygon(polygonData) {
    if (polygonData) {
      let polygon = [];

      for (let i = 0; i < polygonData.length; i++) {
        polygon[i] = epsgConvert({ x: polygonData[i].x, y: polygonData[i].y }).reverse();
      };

      return polygon;
    }
  };

  function ZoomIn() {
    let numberOfWells = 0;
    const map = useMap();
    if (wellsData !== undefined) {
      numberOfWells = countNumberOfWells(wellsData);
      for (const prop in wellsData) {
        if (wellsData[prop].length > 0 && coords[0] !== 31.3) {
          break;
        }
      }
    }
    if (numberOfWells > 1) {
      map.flyTo(coords, 13);
    }
    return null;
  };

  return (
    <div id='map'>
      <MapContainer
        center={coords}
        minZoom={7}
        zoom={9}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        ref={mapRef}
      >
        {polygons && Object.keys(polygons).map((polygon, index) => {
          return <Polygon positions={createPolygon(polygons[polygon])} className={polygon.slice(-2) === "3D" ? 'polygon_black' : 'polygon_blue'} key={index} />
        })}

        {polyName === 'all' ?
          <ZoomIn /> :
          <FocusBoundingBox />}
        <LocationFinderDummy />

        {wellsData ? Object.keys(wellsData).map((key) => {
          return wellsData[key].map((well, index) => {
            return (
              <Marker key={index} icon={customMarkerDotRed} position={epsgConvert({ x: well.x, y: well.y }).reverse()}>
                <Popup>
                  {Object.keys(well).map((prop, index) => {
                    if (prop !== 'x' && prop !== 'y') {
                      return (
                        <p style={{ margin: 0 }} key={index}><span style={{ textTransform: 'capitalize' }}>{prop}</span>: {well[prop]}</p>
                      );
                    } return <></>;
                  })}
                </Popup>
              </Marker>
            );
          })
        }) : <></>}

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
            } return <></>;
          })}
        </LayersControl>
      </MapContainer>
    </div >
  );
};
