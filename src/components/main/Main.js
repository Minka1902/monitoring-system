import React from "react";
import Map from '../map/Map';
import MarkersContext from "../../contexts/MarkersContext";
import DataContext from "../../contexts/DataContext";
import { getRandomInt } from "../../constants/functions";
import { MainLinesChart, LinesChart, AreaChart } from '../chart/Charts';
import proj4 from 'proj4';
import epsg from 'epsg';

export default function Main({ ROIData }) {
    const [coords, setCoords] = React.useState([31.3, 34.8]);
    const markers = React.useContext(MarkersContext);
    const wellsData = React.useContext(DataContext);

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

    const createGraphData = (howMuchData) => {
        let data = [];
        for (let i = 0; i < howMuchData; i++) {
            let obj = {};
            obj.gas = getRandomInt(1500, 10000);
            obj.oil = getRandomInt(900, 8000);
            obj.water = getRandomInt(600, 6500);
            obj.year = 2000 + i;
            data[i] = obj;
        }
        return data;
    };

    const returnAvgProduction = () => {
        if (wellsData) {
            let total = 0;
            for (let i = 0; i < wellsData.production.length; i++) {
                total += parseFloat(wellsData.production[i].avgProd);
            }
            return total / wellsData.production.length;
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
                    <Map coords={coords} calcCenter={calculateMarkersCenter} />
                    <div className="main__resources_graph">
                        <AreaChart chartData={ROIData} /><br /><br /><br />
                        GIP/recoverable:<br />{getRandomInt(20, 250)}/{getRandomInt(20, 150)} MMcf<br /><br />
                        OIP/recoverable:<br />{getRandomInt(20, 250)}/{getRandomInt(20, 150)} MMbbl
                    </div>
                </div>
                <div className="main__right__container">
                    <div className="main__graph__container">
                        <MainLinesChart data={createGraphData(25)} />
                    </div>
                    <p className="main__well__info">
                        Wells in drilling - {wellsData && wellsData.drilling ? wellsData.drilling.length : 'Please click a field/reservoir'}<br />
                        Wells in production - {wellsData && wellsData.production && wellsData.production !== undefined ? wellsData.production.length : 'Please click a field/reservoir'}<br />
                        Average production - {wellsData && wellsData.production && wellsData.production ? returnAvgProduction() : 'Please click a field/reservoir'} bbl/day<br />
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
