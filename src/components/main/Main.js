import React from "react";
import MainMap from '../map/MainMap';
import PageDataContext from "../../contexts/PageDataContext";
import DataContext from "../../contexts/DataContext";
import { shortMonthArray } from "../../constants/constants";
import { reduceDays } from '../../utils/timeDiff.ts';
import { MainLinesChart, AreaChart } from '../chart/Charts';
import proj4 from 'proj4';
import epsg from 'epsg';

export default function Main({ polyName }) {
    const [coords, setCoords] = React.useState([31.3, 34.8]);
    const wellsData = React.useContext(DataContext);
    const pageData = React.useContext(PageDataContext);

    const calculateMarkersCenter = () => {
        let center = { x: 0, y: 0 };
        let wellCounter = 0;
        const props = Object.keys(wellsData);
        for (let i = 0; i < props.length; i++) {
            for (const well of wellsData[props[i]]) {
                if (wellsData[props[i]].length !== 0 && center.x && center.y) {
                    wellCounter++;
                    center.x += parseFloat(well.x);
                    center.y += parseFloat(well.y);
                }
            }
        }
        if (wellCounter > 0) {
            center.x = center.x / wellCounter;
            center.y = center.y / wellCounter;
            let coordinates = proj4(epsg['EPSG:2039'], epsg['EPSG:4326'], [parseFloat(center.x), parseFloat(center.y)]).reverse();
            setCoords(coordinates);
        }
    };

    const calcAvgProduction = () => {
        if (wellsData && wellsData.production) {
            let total = 0;
            for (const well of wellsData.production) {
                for (let i = 0; i < 300; i++) {
                    if (pageData.prod_300[well.name] !== undefined) {
                        const d = pageData.prod_300[well.name][i];
                        if (d && d.fluids) {
                            total += parseFloat(d.fluids ? d.fluids : '0');
                        }
                    }
                }
            }
            return parseInt(total / 300);
        }
    };

    const prepData = (data, fromIndex = 289, toIndex = 300) => {
        const dataKeys = Object.keys(data);
        let arraysObject = {};
        if (dataKeys.length >= 1) {
            for (let k = 0; k < dataKeys.length; k++) {
                let tempArr = [];
                if (data[dataKeys[k]] !== "File not found.") {
                    for (let i = fromIndex; i < toIndex; i++) {
                        tempArr[i - fromIndex] = { day: i + 1, oil: data[dataKeys[k]][i].oil, gas: data[dataKeys[k]][i].gas, water: data[dataKeys[k]][i].water };
                    }
                    arraysObject[dataKeys[k]] = tempArr;
                }
            }
        }
        if (Object.keys(arraysObject).length > 0) {
            return averageProdOfArrays(arraysObject);
        } else {
            let averagedArray = [];
            for (let i = 0; i < 11; i++) {
                const dateString = `${reduceDays(new Date(), 10 - i).getDate()}/${reduceDays(new Date(), 10 - i).getMonth() + 1}`;
                averagedArray[i] = { day: dateString, oil: NaN, water: NaN, gas: NaN };
            }
            return averagedArray;
        }
    };

    const averageProdOfArrays = (objectOfArrays) => {
        const wellNames = Object.keys(objectOfArrays);
        if (wellNames.length > 1) {
            let averagedArray = [];
            for (let i = 0; i < objectOfArrays[wellNames[0]].length; i++) {
                const dateString = `${reduceDays(new Date(), 10 - i).getDate()}/${reduceDays(new Date(), 10 - i).getMonth() + 1}`;
                averagedArray[i] = { day: dateString, oil: 0, water: 0, gas: 0 };
            }
            for (let i = 0; i < wellNames.length; i++) {
                for (let j = 0; j < objectOfArrays[wellNames[i]].length; j++) {
                    for (const prop in objectOfArrays[wellNames[i]][j]) {
                        if (prop !== 'day') {
                            averagedArray[j][prop] += objectOfArrays[wellNames[i]][j][prop];
                        }
                    }
                }
            }
            for (let i = 0; i < averagedArray.length; i++) {
                for (const prop in averagedArray[i]) {
                    if (prop !== 'day') {
                        averagedArray[i][prop] = averagedArray[i][prop] / wellNames.length
                    }
                }
            }
            return averagedArray;
        } else {
            return objectOfArrays[wellNames[0]];
        }
    };

    const averageROIOfArrays = (objectOfArrays) => {
        const wellNames = Object.keys(objectOfArrays);
        let counter = 0;
        let averagedArray = [];
        for (let i = 0; i < 12; i++) {
            const currentMonth = new Date().getMonth() + 1;
            averagedArray[i] = { month: shortMonthArray[(i + currentMonth >= 12) ? i + currentMonth - 12 : i + currentMonth], expenses: 0, cashFlow: 0 };
        }
        if (wellNames.length > 1) {
            for (let i = 0; i < wellNames.length; i++) {
                if (objectOfArrays[wellNames[i]] !== 'File not found.') {
                    counter++;
                    for (let j = 0; j < objectOfArrays[wellNames[i]].length; j++) {
                        for (const prop in objectOfArrays[wellNames[i]][j]) {
                            if (prop !== 'well' && prop !== 'month')
                                averagedArray[j][prop] += objectOfArrays[wellNames[i]][j][prop];
                        }
                    }
                }
            }
            for (let i = 0; i < averagedArray.length; i++) {
                for (const prop in averagedArray[i]) {
                    if (prop !== 'well' && prop !== 'month') {
                        averagedArray[i][prop] = averagedArray[i][prop] / counter;
                    }
                }
            }
            return averagedArray;
        } else {
            if (objectOfArrays[wellNames[0]] !== 'File not found.') {
                return objectOfArrays[wellNames[0]];
            }
            return averagedArray;
        }
    };

    const returnMinimum = (obj) => {
        if (obj) {
            const wellNames = Object.keys(obj);
            let minProp = wellNames[0];
            for (let i = 0; i < wellNames.length; i++) {
                if (obj[wellNames[i]] < obj[minProp]) {
                    minProp = wellNames[i];
                }
            }
            return obj[minProp];
        }
    };

    const calcReserve = (reserveName = '') => {
        if (reserveName !== '') {
            let reserveSum = 0;
            for (const reserve in pageData.reserves) {
                if (pageData.reserves[reserve]) {
                    reserveSum += parseFloat(pageData.reserves[reserve][reserveName]);
                }
            }
            return reserveSum;
        }
    };

    const handleSeismicStatus = () => {
        const seismic_surveys = Object.keys(pageData.seismic);
        let isAll = true;
        if (wellsData && seismic_surveys.length === 1) {
            for (const key in wellsData) {
                for (const well of wellsData[key]) {
                    if (well.name.toUpperCase().indexOf(seismic_surveys[0].toUpperCase()) === -1) {
                        isAll = false;
                    }
                }
            }
            if (isAll) {
                return pageData.seismic[seismic_surveys[0]].status;
            } else {
                return 'Select field';
            }
        }
        return 'Select field';
    };

    React.useEffect(() => {
        if (typeof wellsData === 'object') {
            calculateMarkersCenter();
        }
    }, [wellsData])   //eslint-disable-line

    return (
        <section id="main">
            <div className="main__content__container">
                <div className="main__left__container">
                    <MainMap coords={coords} polygons={pageData && pageData.polygons} polyName={polyName} />
                    <div className="main__resources_graph">
                        <div className="main__area__container">
                            {pageData && pageData.return_on_investment !== undefined ?
                                <AreaChart data={averageROIOfArrays(pageData.return_on_investment)} /> :
                                <></>}
                        </div>
                        {pageData && pageData.reserves !== undefined ?
                            <div className="gip_oip">
                                <span style={{ display: 'flex', flexDirection: 'row', width: '200px' }}>
                                    Resources<br /><br />
                                </span>
                                <span style={{ fontWeight: '500', display: 'flex', flexDirection: 'row-reverse' }}>
                                    GIP/recoverable:<br />{calcReserve('GIP')}/{calcReserve('gas_recoverable')} MMcf<br /><br />
                                    OIP/recoverable:<br />{calcReserve('OIP')}/{calcReserve('oil_recoverable')} MMbbl
                                </span>
                            </div> : <></>}
                    </div>
                </div>
                <div className="main__right__container">
                    <div className="main__right_top__container">
                        <div className="main__graph__container prod_300">
                            {pageData && pageData.prod_300 !== undefined ?
                                <MainLinesChart data={prepData(pageData.prod_300)} /> :
                                <></>}
                        </div>
                        <p className="main__well__info">
                            Wells in drilling - {wellsData && wellsData.drilling ? wellsData.drilling.length : 'Please click a field/reservoir'}<br />
                            Wells in production - {wellsData && wellsData.production && wellsData.production !== undefined ? wellsData.production.length : 'Please click a field/reservoir'}<br />
                            <br />Average production - {pageData && pageData.prod_300 ? `${0.00001 && calcAvgProduction()}~ bbl/day` : 'Loading...'}<br /><br />
                            <span className="main__well_other-ops">
                                Other operations:<br />
                            </span>
                            Wells in testing - {wellsData && wellsData.test ? wellsData.test.length : 'Please click a field/reservoir'}<br />
                            <span className="main__well_survey">
                                Seismic survey - {pageData && pageData.seismic ? handleSeismicStatus() : 'No data'}{<></>}
                            </span>
                        </p>
                    </div>

                    <div className="main__safety">
                        {pageData && pageData.safety ?
                            <>
                                <span className="main__safety_text">
                                    Safety and compliance: <br />
                                    {returnMinimum(pageData.safety)} days without incidents
                                </span>
                                <img className="safety__image" src={require('../../images/weAreSafe.png')} alt="Are we safe?" />
                            </> : <></>}
                    </div>
                </div>
            </div>
        </section >
    );
};
