import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import BubblePieChart from '../chart/BubblePieChart';
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React from 'react';

const MapWithOverlay = () => {
    const mapRef = React.useRef();
    const center = { lat: 31.9, lng: 35, };
    const [tempChartData, setTempChartData] = React.useState(undefined);
    const [chartData, setChartData] = React.useState([
        {
            name: 'well1',
            data: [{ name: 'water', value: 50, fill: 'blue' }, { name: 'oil', value: 27, fill: 'black' }, { name: 'gas', value: 23, fill: 'gray' }],
            location: { lat: 31.9, lng: 35 },
            divPoint: { x: 100, y: 20 },
        },
        {
            name: 'well2',
            data: [{ name: 'water', value: 30, fill: 'blue' }, { name: 'oil', value: 40, fill: 'black' }, { name: 'gas', value: 30, fill: 'gray' }],
            location: { lat: 31.89, lng: 35 },
            divPoint: { x: 150, y: 20 },
        },
        {
            name: 'well3',
            data: [{ name: 'water', value: 30, fill: 'blue' }, { name: 'oil', value: 40, fill: 'black' }, { name: 'gas', value: 30, fill: 'gray' }],
            location: { lat: 31.9, lng: 35.01 },
            divPoint: { x: 150, y: 20 },
        },
        {
            name: 'well4',
            data: [{ name: 'water', value: 30, fill: 'blue' }, { name: 'oil', value: 40, fill: 'black' }, { name: 'gas', value: 30, fill: 'gray' }],
            location: { lat: 31.89, lng: 35.01 },
            divPoint: { x: 150, y: 20 },
        },
    ]);

    const LocationFinderDummy = () => {
        const map = useMapEvents({
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

    return (
        <MapContainer center={center} zoom={13} ref={mapRef} style={{ height: '500px', width: '100%' }} inertia={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <LocationFinderDummy />

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
