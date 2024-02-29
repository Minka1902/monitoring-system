import React from "react";
import ProgressBar from '../progressBar/ProgressBar';
import ButtonToggle from "../buttons/ButtonToggle";
import { MainLinesChart, BubbleChart } from '../chart/Charts';

export default function Production() {
    return (
        <section id="Production">
            <div className="production__time-bar">
                <ProgressBar value={2015} maxValue={2024} minValue={1984} />
            </div>
            <div className="production__content__container">
                <div className="production__daily-prod_graph">
                    <MainLinesChart />
                </div>
                <div className="production__well_stage">
                    <img className="production__well_stage-image" src={require('../../images/wellStage.png')} alt="asdasd" />
                </div>
                <div className="production__bubble-graph">
                    <BubbleChart />
                    <div className="production__switch__container">
                        <ButtonToggle />
                    </div>
                </div>
                <div className="production__another-graph">
                    Unknown graph
                </div>
            </div>
        </section>
    );
};
