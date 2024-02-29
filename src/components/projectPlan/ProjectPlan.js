import React from "react";
import GraphDataContext from '../../contexts/GraphDataContext';
import DataContext from "../../contexts/DataContext";
import { LinesChart } from "../chart/Charts";
import { TableStandard, TableProgress } from '../table/Table';
import { statusGraph, fieldsData, statusTable } from "../../constants/constants";
import ProgressBar from '../progressBar/ProgressBar';

export default function ProjectPlan() {
    const wellsData = React.useContext(DataContext);
    const graphData = React.useContext(GraphDataContext);

    const returnAvgProduction = () => {
        if (wellsData) {
            let total = 0;
            for (let i = 0; i < wellsData.production.length; i++) {
                total += parseFloat(wellsData.production[i].avgProd);
            }
            return total / wellsData.production.length;
        }
    };

    return (
        <section id="projectPlan">
            <div className="projectPlan__time-bar">
                <ProgressBar value={2015} maxValue={2024} minValue={1984} />
            </div>
            <div className="projectPlan__content__container">
                <div className="projectPlan__resources-graph-container resources_graph">
                    {graphData && graphData.resources_graph !== undefined ?
                        <LinesChart data={graphData.resources_graph} title={false} /> :
                        <></>}
                </div>
                <div className="projectPlan__fields-table-container">
                    <TableStandard tableHeaders={['Field', 'Object', 'Resources, min bbl']} data={fieldsData} color='#FEDCBA' />
                </div>
                <div className="projectPlan__state-graph-container state_graph">
                    {graphData && graphData.state_graph !== undefined ?
                        <LinesChart data={graphData.state_graph} /> :
                        <></>}
                </div>
                <p className="projectPlan__well__info">
                    Wells in drilling - {wellsData && wellsData.drilling ? wellsData.drilling.length : 'Please click a field/reservoir'}<br />
                    Wells in production - {wellsData && wellsData.production && wellsData.production !== undefined ? wellsData.production.length : 'Please click a field/reservoir'}<br />
                    Average production - {wellsData && wellsData.production && wellsData.production ? returnAvgProduction() : 'Please click a field/reservoir'} bbl/day<br />
                    <span className="projectPlan__well_other-ops">
                        Other operations:<br />
                    </span>
                    <span style={{ marginLeft: '15px' }}>
                        Wells in testing - {wellsData && wellsData.test ? wellsData.test.length : 'Please click a field/reservoir'}<br />
                    </span>
                    <span className="projectPlan__well_survey" style={{ marginLeft: '15px' }}>
                        Seismic survey - {false ? wellsData.threeDStatus : 'Can`t find status'}{<></>}
                    </span>
                </p>
                <div className="projectPlan__status-table-container">
                    <TableProgress tableHeaders={[' ', ' ', 'Commitment', 'Actual', ' ']} data={statusTable} color='transparent' />
                </div>
            </div>
        </section >
    );
};
