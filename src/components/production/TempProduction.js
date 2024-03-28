import React from "react";
import PageDataContext from "../../contexts/PageDataContext.js";
import ToggleSwitch from "../buttons/ButtonToggle.js";
import { reduceDays } from "../../utils/timeDiff.ts";
import { ProductionLinesChart } from '../chart/Charts.js';
import MapWithOverlay from "../map/ProductionMap.js";
import BubblePieChart from '../chart/BubblePieChart';

export default function Production({ polyName }) {
    const pageData = React.useContext(PageDataContext);
    const [isSum, setIsSum] = React.useState(false);

    const d = {
        name: "",
        location: [31.593603230717974, 34.6448453680275,],
        divPoint: { x: 0, y: 0, },
        rad: 80,
        data: [
            { name: "water", value: 33.333, fill: "#508fdc" },
            { name: "oil", value: 33.333, fill: "#ffa03a" },
            { name: "gas", value: 33.333, fill: "#459d55" },
        ],
    }

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

    return (
        <section id="Production">
            <div className="production__content__container_temp">
                <div className="production__left_container_temp">
                    <div className="production__bubble-graph__container_temp">
                        <MapWithOverlay polyName={polyName} polygons={pageData && pageData.polygons} isSum={isSum} />
                    </div>
                    <div className="production__switch__container_temp">
                        <ToggleSwitch onClick={toggleIsSum} />
                    </div>
                </div>
                <div className="production__right_container_temp">
                    <div className="production__right_small_container_temp">
                        <div className="production__bubble-graph_legend">
                            <h3 className="bubble-chart_legend__title">Production Legend</h3>
                            <div className="bubble-chart_legend__container">
                                <BubblePieChart
                                    well={d}
                                    tooltip__wrapper={'none'}
                                />
                            </div>
                            <div className="colors-legend">
                                <div className="color-legend">
                                    <div className="color-square_orange" />
                                    <p className="legend-title">Oil</p>
                                </div>
                                <div className="color-legend">
                                    <div className="color-square_green" />
                                    <p className="legend-title">Gas</p>
                                </div>
                                <div className="color-legend">
                                    <div className="color-square_blue" />
                                    <p className="legend-title">Water</p>
                                </div>
                            </div>
                        </div>
                        <div className="production__daily-prod_graph_temp">
                            {pageData && pageData.prod_300 !== undefined ?
                                <ProductionLinesChart data={prepData(pageData.prod_300)} /> :
                                <></>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
