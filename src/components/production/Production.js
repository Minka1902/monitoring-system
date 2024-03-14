import React from "react";
import GraphDataContext from "../../contexts/GraphDataContext";
import PageDataContext from "../../contexts/PageDataContext";
import ProgressBar from '../progressBar/ProgressBar';
import ToggleSwitch from "../buttons/ButtonToggle";
import { ProductionLinesChart, ProductionChart } from '../chart/Charts';
import MapWithOverlay from "../map/ProductionMap";

export default function Production() {
    const graphData = React.useContext(GraphDataContext);
    const pageData = React.useContext(PageDataContext);

    const prepData = (data, propName = 'fluids', fromIndex = 0, toIndex = 300) => {
        const dataKeys = Object.keys(data);
        let arraysObject = {};
        if (dataKeys.length >= 1) {
            let tempArr = [];
            for (let k = 0; k < dataKeys.length; k++) {
                if (data[dataKeys[k]] !== "File not found.") {
                    for (let i = fromIndex; i < toIndex; i++) {
                        tempArr[i - fromIndex] = { day: i + 1, fluids: sumOfArray(createArray(data[dataKeys[k]], propName, i)), water: data[dataKeys[k]][i].water };
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
        if (wellNames.length === 1) {
            let averagedArray = [];
            for (let i = 0; i < objectOfArrays[wellNames[0]].length; i++) {
                averagedArray[i] = { day: 0, fluids: 0, water: 0 };
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
        if (pageData && pageData.prod_300)
            prepData(pageData.prod_300);
    }, [pageData]);

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
                    <img className="production__well_stage-image" src={require('../../images/wellStage.png')} alt="asdasd" />
                </div>
                <div className="production__bubble-graph production_bubble">
                    <div className="production__bubble-graph__container">
                        <MapWithOverlay />
                    </div>
                    <div className="production__switch__container">
                        <ToggleSwitch />
                    </div>
                </div>
                <div className="production__another-graph i_dont_know">
                    {graphData && graphData.i_dont_know !== undefined ?
                        <ProductionChart data={graphData.i_dont_know} /> :
                        <></>}
                </div>
            </div>
        </section>
    );
};
