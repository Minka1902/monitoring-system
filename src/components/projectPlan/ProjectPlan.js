import React from "react";
import { LinesChart } from "../chart/Charts";
import { TableStandard, TableProgress } from '../table/Table';
import { statusGraph, fieldsData, statusTable } from "../../constants/constants";
import ProgressBar from '../progressBar/ProgressBar';

export default function ProjectPlan({ data = '' }) {

    return (
        <section id="projectPlan">
            <div className="projectPlan__time-bar">
                <ProgressBar value={2015} maxValue={2024} minValue={1984} />
            </div>
            <div className="projectPlan__content__container">
                <div className="projectPlan__resources-graph-container">
                    <LinesChart data={statusGraph} title={false} />
                </div>
                <div className="projectPlan__fields-table-container">
                    <TableStandard tableHeaders={['Field', 'Object', 'Resources, min bbl']} data={fieldsData} color='#FEDCBA' />
                </div>
                <div className="projectPlan__state-graph-container">
                    <LinesChart data={statusGraph} />
                </div>
                <div className="projectPlan__well__info">
                    <p className="text">Wells in drilling: {data}</p>
                    <p className="text">Wells in production: {data}</p>
                    <p className="text">Average daily production: {data}</p>
                    <p className="text">Other operations: {data}</p>
                    <ul className="list">
                        <li>Wells in testing - {data}</li>
                        <li>Seismic survey - {data}</li>
                    </ul>
                </div>
                <div className="projectPlan__status-table-container">
                    <TableProgress tableHeaders={[' ', ' ', 'Commitment', 'Actual', ' ']} data={statusTable} color='transparent' />
                </div>
            </div>
        </section >
    );
};
