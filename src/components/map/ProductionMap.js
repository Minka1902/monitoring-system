import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import epsg from 'epsg';
import proj4 from 'proj4';
import BubblePieChart from '../chart/BubblePieChart';
import { MapContainer, TileLayer, useMapEvents, Polygon, useMap } from "react-leaflet";
import React from 'react';
import PageDataContext from "../../contexts/PageDataContext";
import DataContext from "../../contexts/DataContext";

const MapWithOverlay = ({ polygons, polyName, isSum }) => {
    const mapRef = React.useRef();
    const pageData = React.useContext(PageDataContext);
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
        let coordinates = proj4(fromProj, toProj, [parseFloat(x), parseFloat(y)]).reverse();
        return coordinates;
    };

    function createPolygon(polygonData) {
        if (polygonData) {
            let polygon = [];

            for (let i = 0; i < polygonData.length; i++) {
                polygon[i] = epsgConvert({ x: polygonData[i].x, y: polygonData[i].y });
            };

            return polygon;
        }
    };

    const sumProp = (object, prop) => {
        if (object && prop !== 'well') {
            let sum = 0;
            for (let i = 0; i < object.length; i++) {
                if (object[i][prop] !== undefined) {
                    sum += parseFloat(object[i][prop]);
                }
            }
            return sum;
        }
    };

    const createData = (wells) => {
        let newData = [];
        for (let i = 0; i < wells.length; i++) {
            if (pageData.prod_300[wells[i].name] !== "File not found." && pageData.prod_300[wells[i].name] !== undefined) {
                const coordinates = epsgConvert({ x: wells[i].x, y: wells[i].y });
                if (isSum) {
                    // ! here is sum
                    let myObject = pageData && pageData.prod_300[wells[i].name];
                    var data = [
                        { name: 'water', value: Math.ceil(sumProp(myObject, 'water')), fill: 'blue' },
                        { name: 'oil', value: Math.ceil(sumProp(myObject, 'oil')), fill: 'black' },
                        { name: 'gas', value: Math.ceil(sumProp(myObject, 'gas')), fill: 'gray' }
                    ];
                } else {
                    // ! here is not sum
                    let myObject = pageData && pageData.prod_300[wells[i].name][pageData.prod_300[wells[i].name].length - 1];
                    var data = [
                        { name: 'water', value: parseFloat(myObject.water), fill: 'blue' },
                        { name: 'oil', value: parseFloat(myObject.oil), fill: 'black' },
                        { name: 'gas', value: parseFloat(myObject.gas), fill: 'gray' }
                    ];
                }
                const tempD = { name: wells[i].name, location: coordinates, divPoint: { x: 100, y: 100 }, data };
                newData.push(tempD);
            }
        }
        return newData;
    };

    React.useEffect(() => {
        if (pageData && pageData.prod_300) {
            const asd = createData(wellsData.production);
            setChartData(asd);
        }
    }, [pageData, wellsData, isSum]);

    return (
        <MapContainer center={center} maxZoom={15} zoom={9} minZoom={7} ref={mapRef} style={{ height: '500px', width: '100%' }} inertia={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {polygons && Object.keys(polygons).map((polygon, index) => {
                return <Polygon positions={createPolygon(polygons[polygon])} className={polygon.slice(-2) === "3D" ? 'polygon_black' : 'polygon_blue'} key={index} />
            })}

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
