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
    const [tempPolyName, setTempPolyName] = React.useState(polyName);
    const [minMax, setMinMax] = React.useState({});

    const LocationFinder = () => {
        const map = useMapEvents({ // eslint-disable-line
            move() {
                const map = mapRef.current;
                if (map) {
                    let newChartData = [];
                    if (chartData !== undefined) {
                        for (let i = 0; i < chartData.length; i++) {
                            const containerPoint = map.latLngToContainerPoint(chartData[i].location);
                            const newWell = { name: chartData[i].name, rad: calcWellRadius(chartData[i].data) < 30 ? calcWellRadius(chartData[i].data) : 40, data: chartData[i].data, location: chartData[i].location, divPoint: containerPoint };
                            if (containerPoint && newWell.divPoint !== chartData[i].divPoint) {
                                newChartData[i] = newWell;
                            }
                        }
                    } else {
                        for (let i = 0; i < tempChartData.length; i++) {
                            const containerPoint = map.latLngToContainerPoint(tempChartData[i].location);
                            const newWell = { name: tempChartData[i].name, rad: calcWellRadius(tempChartData[i].data) < 30 ? calcWellRadius(tempChartData[i].data) : 40, data: tempChartData[i].data, location: tempChartData[i].location, divPoint: containerPoint };
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

    const calcWellRadius = (data) => {
        if (data && minMax) {
            const current = data[0].value + data[1].value + data[2].value;
            return 40 * current / (minMax.max - minMax.min);
        }
    };

    const epsgConvert = ({ x, y, toEpsg = 4326, fromEpsg = 2039 }) => {
        const toProj = epsg[`EPSG:${toEpsg}`];
        const fromProj = epsg[`EPSG:${fromEpsg}`];
        let coordinates = proj4(fromProj, toProj, [parseFloat(x), parseFloat(y)]).reverse();
        return coordinates;
    };

    function FocusBoundingBox() {
        let map = useMap();
        if (polygons) {
            if (polyName === 'all') {
                let combinedPolygons = [];
                const polyNames = Object.keys(polygons);
                for (const poly of polyNames) {
                    for (let i = 0; i < polygons[poly].length; i++) {
                        combinedPolygons.push(polygons[poly][i]);
                    }
                }
                const tempPolygon = createPolygon(combinedPolygons);
                map.fitBounds(tempPolygon);
            } else {
                const tempPolygon = createPolygon(polygons[polyName]);
                map.fitBounds(tempPolygon);
            }
            setTempPolyName(polyName);
        }
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

    const returnMinMaxBbl = () => {
        if (pageData && pageData.prod_300) {
            let tmin = 10000000000000000, tmax = 0;
            const keys = Object.keys(pageData.prod_300);
            for (const key of keys) {
                if (pageData.prod_300[key] !== "File not found.") {
                    if (isSum) {
                        if (tmin > Math.ceil(sumProp(pageData.prod_300[key], 'water'))) {
                            tmin = Math.ceil(sumProp(pageData.prod_300[key], 'water'));
                        }
                        if (tmin > Math.ceil(sumProp(pageData.prod_300[key], 'oil'))) {
                            tmin = Math.ceil(sumProp(pageData.prod_300[key], 'oil'));
                        }
                        if (tmin > Math.ceil(sumProp(pageData.prod_300[key], 'gas'))) {
                            tmin = Math.ceil(sumProp(pageData.prod_300[key], 'gas'));
                        }
                        if (tmax < Math.ceil(sumProp(pageData.prod_300[key], 'water'))) {
                            tmax = Math.ceil(sumProp(pageData.prod_300[key], 'water'));
                        }
                        if (tmax < Math.ceil(sumProp(pageData.prod_300[key], 'oil'))) {
                            tmax = Math.ceil(sumProp(pageData.prod_300[key], 'oil'));
                        }
                        if (tmax < Math.ceil(sumProp(pageData.prod_300[key], 'gas'))) {
                            tmax = Math.ceil(sumProp(pageData.prod_300[key], 'gas'));
                        }
                    } else {
                        let myObject = pageData && pageData.prod_300[key][pageData.prod_300[key].length - 1];
                        if (tmin > myObject.water) {
                            tmin = myObject.water;
                        }
                        if (tmin > myObject.oil) {
                            tmin = myObject.oil;
                        }
                        if (tmin > myObject.gas) {
                            tmin = myObject.gas;
                        }
                        if (tmax < myObject.water) {
                            tmax = myObject.water;
                        }
                        if (tmax < myObject.oil) {
                            tmax = myObject.oil;
                        }
                        if (tmax < myObject.gas) {
                            tmax = myObject.gas;
                        }
                    }
                }
            }
            setMinMax({ min: tmin, max: tmax });
        }
    };

    const createData = (wells) => {
        let newData = [];
        for (let i = 0; i < wells.length; i++) {
            if (pageData.prod_300[wells[i].name.toLowerCase()] !== "File not found." && pageData.prod_300[wells[i].name.toLowerCase()] !== undefined) {
                const coordinates = epsgConvert({ x: wells[i].x, y: wells[i].y });
                if (isSum) {
                    // ! here is sum
                    returnMinMaxBbl();
                    let myObject = pageData && pageData.prod_300[wells[i].name.toLowerCase()];
                    var data = [
                        { name: 'water', value: Math.ceil(sumProp(myObject, 'water')), fill: "#508fdc" },
                        { name: 'oil', value: Math.ceil(sumProp(myObject, 'oil')), fill: "#ffa03a" },
                        { name: 'gas', value: Math.ceil(sumProp(myObject, 'gas')), fill: "#459d55" }
                    ];
                } else {
                    // ! here is not sum
                    let myObject = pageData && pageData.prod_300[wells[i].name.toLowerCase()][pageData.prod_300[wells[i].name.toLowerCase()].length - 1];
                    returnMinMaxBbl();
                    var data = [
                        { name: 'water', value: parseFloat(myObject.water), fill: "#508fdc" },
                        { name: 'oil', value: parseFloat(myObject.oil), fill: "#ffa03a" },
                        { name: 'gas', value: parseFloat(myObject.gas), fill: "#459d55" }
                    ];
                }
                const tempD = { name: wells[i].name.toLowerCase(), rad: calcWellRadius(data) < 30 ? calcWellRadius(data) : 30, location: coordinates, divPoint: { x: 100, y: 100 }, data };
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
        <MapContainer
            center={center}
            minZoom={7}
            zoom={9}
            maxZoom={15}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            dragging={true}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {polyName !== tempPolyName ?
                <FocusBoundingBox /> :
                <></>}
            <LocationFinder />

            {polygons && Object.keys(polygons).map((polygon, index) => {
                return <Polygon positions={createPolygon(polygons[polygon])} className={polygon.slice(-2) === "3D" ? 'polygon_black' : 'polygon_blue'} key={index} />
            })}


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
