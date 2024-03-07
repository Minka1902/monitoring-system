import React from "react";
import GraphDataContext from "../../contexts/GraphDataContext";
import ProgressBar from '../progressBar/ProgressBar';
import ToggleSwitch from "../buttons/ButtonToggle";
import { ProductionLinesChart, BubbleChart } from '../chart/Charts';

export default function Production() {
    const graphData = React.useContext(GraphDataContext);

    return (
        <section id="Production">
            <div className="production__time-bar">
                <ProgressBar value={2015} maxValue={2024} minValue={1984} />
            </div>
            <div className="production__content__container">
                <div className="production__daily-prod_graph daily_production">
                    {graphData && graphData.daily_production !== undefined ?
                        <ProductionLinesChart data={graphData.daily_production} /> :
                        <></>}
                </div>
                <div className="production__well_stage">
                    <img className="production__well_stage-image" src={require('../../images/wellStage.png')} alt="asdasd" />
                </div>
                <div className="production__bubble-graph production_bubble">
                    <div className="production__bubble-graph__container">
                        <BubbleChart />
                    </div>
                    <div className="production__switch__container">
                        <ToggleSwitch />
                    </div>
                </div>
                <div className="production__another-graph">
                    Unknown graph
                </div>
            </div>
        </section>
    );
};
