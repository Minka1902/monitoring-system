import React from "react";
import MainMap from '../map/MainMap';
import MarkersContext from "../../contexts/MarkersContext";
import PageDataContext from "../../contexts/PageDataContext";
import GraphDataContext from "../../contexts/GraphDataContext";
import DataContext from "../../contexts/DataContext";
import { getRandomInt } from "../../constants/functions";
import { MainLinesChart, AreaChart } from '../chart/Charts';
import proj4 from 'proj4';
import epsg from 'epsg';

export default function Main() {
    const [coords, setCoords] = React.useState([31.3, 34.8]);
    const markers = React.useContext(MarkersContext);
    const wellsData = React.useContext(DataContext);
    const graphData = React.useContext(GraphDataContext);
    const pageData = React.useContext(PageDataContext);

    const calculateMarkersCenter = () => {
        let center = { x: 0, y: 0 };
        for (let i = 0; i < markers.length; i++) {
            if (markers[i]) {
                center.x += parseFloat(markers[i].x);
                center.y += parseFloat(markers[i].y);
            }
        }
        center.x = center.x / markers.length;
        center.y = center.y / markers.length;
        let coordinates = proj4(epsg['EPSG:2039'], epsg['EPSG:4326'], [parseFloat(center.x), parseFloat(center.y)]).reverse();
        setCoords(coordinates);
    };

    const calcAvgProduction = () => {
        if (wellsData) {
            let total = 0;
            for (let i = 0; i < wellsData.production.length; i++) {
                total += parseFloat(wellsData.production[i].oil ? wellsData.production[i].oil : 0);
            }
            return parseInt(total / wellsData.production.length);
        }
    };

    const prepData = (data, fromIndex = 0, toIndex = 10) => {
        const dataKeys = Object.keys(data);
        let arraysObject = {};
        if (dataKeys.length >= 1) {
            let tempArr = [];
            for (let k = 0; k < dataKeys.length; k++) {
                for (let i = fromIndex; i < toIndex; i++) {
                    tempArr[i - fromIndex] = { day: i + 1, oil: data[dataKeys[k]][i].oil, gas: data[dataKeys[k]][i].gas, water: data[dataKeys[k]][i].water };
                }
                arraysObject[dataKeys[k]] = tempArr;
            }
        }
        return averageOfArrays(arraysObject);
    };

    const averageOfArrays = (objectOfArrays) => {
        const wellNames = Object.keys(objectOfArrays);
        if (wellNames.length === 1) {
            let averagedArray = [];
            for (let i = 0; i < objectOfArrays[wellNames[0]].length; i++) {
                averagedArray[i] = { day: 0, oil: 0, water: 0, gas: 0 };
            }
            for (let i = 0; i < wellNames.length; i++) {
                for (let j = 0; j < objectOfArrays[wellNames[i]].length; j++) {
                    for (const prop in objectOfArrays[wellNames[i]][j]) {
                        averagedArray[j][prop] += objectOfArrays[wellNames[i]][j][prop];
                    }
                }
            }
            for (let i = 0; i < averagedArray.length; i++) {
                for (const prop in averagedArray[i]) {
                    averagedArray[i][prop] = averagedArray[i][prop] / wellNames.length
                }
            }
            return averagedArray;
        } else {
            return objectOfArrays[wellNames[0]];
        }
    };

    React.useEffect(() => {
        if (markers && markers.length > 0) {
            calculateMarkersCenter();
        }
    }, [markers])   //eslint-disable-line

    return (
        <section id="main">
            <div className="main__content__container">
                <div className="main__left__container">
                    <MainMap coords={coords} calcCenter={calculateMarkersCenter} polygons={pageData && pageData.polygons} />
                    <div className="main__resources_graph return_on_investment">
                        {graphData && graphData.return_on_investment !== undefined ?
                            <AreaChart data={graphData.return_on_investment} /> :
                            <></>}
                        <br /><br /><br />
                        GIP/recoverable:<br />{getRandomInt(20, 250)}/{getRandomInt(20, 150)} MMcf<br /><br />
                        OIP/recoverable:<br />{getRandomInt(20, 250)}/{getRandomInt(20, 150)} MMbbl
                    </div>
                </div>
                <div className="main__right__container">
                    <div className="main__graph__container prod_300">
                        {pageData && pageData.prod_300 !== undefined ?
                            <MainLinesChart data={prepData(pageData.prod_300)} /> :
                            <></>}
                    </div>
                    <p className="main__well__info">
                        Wells in drilling - {wellsData && wellsData.drilling ? wellsData.drilling.length : 'Please click a field/reservoir'}<br />
                        Wells in production - {wellsData && wellsData.production && wellsData.production !== undefined ? wellsData.production.length : 'Please click a field/reservoir'}<br />
                        Average production - {wellsData && wellsData.production && wellsData.production ? calcAvgProduction() : 'Please click a field/reservoir'}~ bbl/day<br />
                        <span className="main__well_other-ops">
                            Other operations:<br />
                        </span>
                        <span style={{ marginLeft: '15px' }}>
                            Wells in testing - {wellsData && wellsData.test ? wellsData.test.length : 'Please click a field/reservoir'}<br />
                        </span>
                        <span className="main__well_survey" style={{ marginLeft: '15px' }}>
                            Seismic survey - {false ? wellsData.threeDStatus : 'Can`t find status'}{<></>}
                        </span>
                    </p>
                    <div className="main__safety">
                        <img src={require('../../images/weAreSafe.png')} alt="Are we safe?" />
                        <span className="main__safety_text">
                            Safety and compliance: <br />
                            {getRandomInt(2, 74)} days without incidents
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
