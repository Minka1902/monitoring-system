import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import epsg from 'epsg';
import proj4 from 'proj4';
import BubblePieChart from '../chart/BubblePieChart';
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React from 'react';
import DataContext from "../../contexts/DataContext";

const MapWithOverlay = () => {
    const mapRef = React.useRef();
    const wellsData = React.useContext(DataContext);
    const center = { lat: 31.9, lng: 35 };
    const [tempChartData, setTempChartData] = React.useState(undefined);
    const [chartData, setChartData] = React.useState([]);

    const LocationFinder = () => {
        const map = useMapEvents({ // eslint-disable-line
            move() {
                const map = mapRef.current;
                if (map) {
                    let newChartData = [];
                    if (chartData !== undefined) {
                        for (let i = 0; i < chartData.length; i++) {
                            const containerPoint = map.latLngToContainerPoint(chartData[i].location);
                            const newWell = { name: chartData[i].name, data: chartData[i].data, location: chartData[i].location, divPoint: containerPoint };
                            if (containerPoint && newWell.divPoint !== chartData[i].divPoint) {
                                newChartData[i] = newWell;
                            }
                        }
                    } else {
                        for (let i = 0; i < tempChartData.length; i++) {
                            const containerPoint = map.latLngToContainerPoint(tempChartData[i].location);
                            const newWell = { name: tempChartData[i].name, data: tempChartData[i].data, location: tempChartData[i].location, divPoint: containerPoint };
                            if (containerPoint && newWell.divPoint !== tempChartData[i].divPoint) {
                                newChartData[i] = newWell;
                            }
                        }
                    }
                    if (newChartData) {
                        setChartData(newChartData);
                    }
                }
            },
            zoomstart() {
                setTempChartData(chartData);
                setChartData(undefined);
            },
            zoomend() {
                setTempChartData(undefined);
            }
        });
        return null;
    };

    const epsgConvert = ({ x, y, toEpsg = 4326, fromEpsg = 2039 }) => {
        const toProj = epsg[`EPSG:${toEpsg}`];
        const fromProj = epsg[`EPSG:${fromEpsg}`];
        let coordinates = proj4(fromProj, toProj, [parseFloat(x), parseFloat(y)]);
        return { lat: parseFloat(coordinates[1].toFixed(5)), lng: parseFloat(coordinates[0].toFixed(5)) };
    };

    const createData = (wells) => {
        let newData = [];
        for (let i = 0; i < wells.length; i++) {
            const coordinates = epsgConvert({ x: wells[i].x, y: wells[i].y })
            const data = [{ name: 'water', value: parseFloat(wells[i].water), fill: 'blue' }, { name: 'oil', value: parseFloat(wells[i].oil), fill: 'black' }, { name: 'gas', value: parseFloat(wells[i].gas), fill: 'gray' }];
            const tempD = { name: wells[i].name, location: coordinates, divPoint: { x: 100, y: 100 }, data };
            newData[i] = tempD;
        }
        return newData;
    };

    React.useEffect(() => {
        if (wellsData && wellsData.production[0].oil) {
            const asd = createData(wellsData.production);
            setChartData(asd);
        }
    }, [wellsData]);

    return (
        <MapContainer center={center} zoom={7} ref={mapRef} style={{ height: '500px', width: '100%' }} inertia={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <LocationFinder />

            {chartData !== undefined && chartData.map((well, index) => (
                <BubblePieChart
                    key={`custom-overlay-${index}`}
                    well={well}
                    myMap={mapRef.current}
                />
            ))}
        </MapContainer>
    );
};

export default MapWithOverlay;
