import React from "react";
import DataContext from '../../contexts/DataContext';
import PageDataContext from "../../contexts/PageDataContext";
import ProgressBar from '../progressBar/ProgressBar';
import ToggleSwitch from "../buttons/ButtonToggle";
import { reduceDays } from "../../utils/timeDiff.ts";
import { ProductionLinesChart } from '../chart/Charts';
import MapWithOverlay from "../map/ProductionMap";

export default function Production({ polyName }) {
    const pageData = React.useContext(PageDataContext);
    const wellsData = React.useContext(DataContext);
    const [isSum, setIsSum] = React.useState(false);

    const toggleIsSum = () => setIsSum(!isSum);

    const prepData = (data, propName = 'fluids', fromIndex = 0, toIndex = 300) => {
        const dataKeys = Object.keys(data);
        let arraysObject = {};
        if (dataKeys.length >= 1) {
            let tempArr = [];
            for (let k = 0; k < dataKeys.length; k++) {
                if (data[dataKeys[k]] !== "File not found.") {
                    for (let i = fromIndex; i < toIndex; i++) {
                        const dateString = `${reduceDays(new Date(), 300 - i).getDate()}/${reduceDays(new Date(), 300 - i).getMonth() + 1}`;
                        tempArr[i - fromIndex] = { day: dateString, cumulative: sumOfArray(createArray(data[dataKeys[k]], propName, i)), daily: data[dataKeys[k]][i][propName] };
                    }
                    arraysObject[dataKeys[k]] = tempArr;
                }
            }
        }
        return averageOfArrays(arraysObject);
    };

    const sumOfArray = (arr) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    };

    const createArray = (data, prop, untilIndex) => {
        let tempArr = [];
        for (let i = 0; i < untilIndex; i++) {
            tempArr[i] = data[i][prop];
        }
        return tempArr;
    };

    const averageOfArrays = (objectOfArrays) => {
        const wellNames = Object.keys(objectOfArrays);
        if (wellNames.length > 1) {
            let averagedArray = [];
            for (let i = 0; i < objectOfArrays[wellNames[0]].length; i++) {
                averagedArray[i] = { day: objectOfArrays[wellNames[0]][i].day, cumulative: 0, daily: 0 };
            }
            for (let i = 0; i < wellNames.length; i++) {
                for (let j = 0; j < objectOfArrays[wellNames[i]].length; j++) {
                    for (const prop in objectOfArrays[wellNames[i]][j]) {
                        if (prop !== 'day')
                            averagedArray[j][prop] += objectOfArrays[wellNames[i]][j][prop];
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

    function checkFileExists(folder, wellName) {
        return new Promise(async (resolve) => {
            try {
                const path = `./src/images/${folder}/${wellName.toLowerCase()}.${folder === 'well_schemes' ? 'jpg' : 'png'}`;
                const res = await fetch(path, { method: 'HEAD' });
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (err) {
                resolve(false);
            }
        });
    };

    return (
        <section id="Production">
            <div className="production__time-bar">
                <ProgressBar value={2015} maxValue={2024} minValue={1984} />
            </div>
            <div className="production__content__container">
                <div className="production__daily-prod_graph prod_300">
                    {pageData && pageData.prod_300 !== undefined ?
                        <ProductionLinesChart data={prepData(pageData.prod_300)} /> :
                        <></>}
                </div>
                <div className="production__well_stage">
                    {wellsData && wellsData.production.length === 1 ? checkFileExists('well_schemes', wellsData.production[0].name) ? <img src={require(`../../images/well_schemes/${wellsData.production[0].name.toLowerCase()}.jpg`)} alt="Well schema" /> : <></> : <></>}
                </div>
                <div className="production__bubble-graph production_bubble">
                    <div className="production__bubble-graph__container">
                        <MapWithOverlay polyName={polyName} polygons={pageData && pageData.polygons} isSum={isSum} />
                    </div>
                    <div className="production__switch__container">
                        <ToggleSwitch onClick={toggleIsSum} />
                    </div>
                </div>
                <div className="production__another-graph">
                    {wellsData && wellsData.production.length === 1 ? checkFileExists('well_testing', wellsData.production[0].name) ? <img className="well_testing__image" src={require(`../../images/well_testing/${wellsData.production[0].name.toLowerCase()}.png`)} alt="Well schema" /> : <></> : <></>}
                </div>
            </div>
        </section>
    );
};
