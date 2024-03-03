import React from "react";
import Chart from 'chart.js/auto';      //eslint-disable-line
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
import 'ag-charts-enterprise';
import { AgChartsReact } from 'ag-charts-react';
import faker from 'faker';

export function LinesChart({ data, backgroundColor = 'transparent' }) {
    const [options,] = React.useState({
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'name',
                yKey: '3D',
                yName: '3D',
            },
            {
                type: 'line',
                xKey: 'name',
                yKey: '2D',
                yName: '2D',
            },
            {
                type: 'line',
                xKey: 'name',
                yKey: 'prod',
                yName: 'prod',
            },
            {
                type: 'line',
                xKey: 'name',
                yKey: 'explore',
                yName: 'explore',
            },
        ],
        background: {
            fill: backgroundColor,
        },
        contextMenu: {
            enabled: typeof contextMenuAction === 'object' ? true : false,
            extraActions: [
                { label: 'Say hello', action: () => window.alert('Hello world') },
            ],
        },
        theme: {
            overrides: {
                line: {
                    series: {
                        highlightStyle: {
                            series: {
                                dimOpacity: 0.2,
                                strokeWidth: 4,
                            },
                        },
                    },
                },
            },
        },
    });

    return <AgChartsReact options={options} />;
};

export function MainLinesChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: '7-day production' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'year',
                yKey: 'gas',
                yName: 'gas',
            },
            {
                type: 'line',
                xKey: 'year',
                yKey: 'oil',
                yName: 'oil',
            },
            {
                type: 'line',
                xKey: 'year',
                yKey: 'water',
                yName: 'water',
            },
        ],
        background: {
            fill: backgroundColor,
        },
        contextMenu: {
            enabled: typeof contextMenuAction === 'object' ? true : false,
            extraActions: [
                { label: 'Say hello', action: () => window.alert('Hello world') },
            ],
        },
        theme: {
            overrides: {
                line: {
                    series: {
                        highlightStyle: {
                            series: {
                                dimOpacity: 0.2,
                                strokeWidth: 4,
                            },
                        },
                    },
                },
            },
        },
    });

    return <AgChartsReact options={options} />;
};

export const BulletChart = (data, title = 'Please pass a title.', subtitle) => {
    const [options,] = React.useState({
        title: { text: title },
        subtitle: { text: subtitle },
        data: data,
        series: [
            {
                type: 'bullet',
                direction: 'horizontal',
                valueKey: 'income2',
                valueName: 'Actual income',
                targetKey: 'objective',
                targetName: 'Target income',
                scale: { max: 2024, min: 1500 },
            },
        ],
        background: {
            visible: false,
        },
        height: 140,
    });

    return (
        <AgChartsReact options={options} />
    );
};

export function BubbleChart({ chartData = undefined }) {
    ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Red dataset',
                data: Array.from({ length: 25 }, () => ({
                    x: faker.datatype.number({ min: 176019, max: 177926 }),
                    y: faker.datatype.number({ min: 546900, max: 548699 }),
                    r: faker.datatype.number({ min: 5, max: 20 }),
                })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Bubble options={options} data={chartData === undefined ? data : chartData} />;
};

export function AreaChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: {
            text: "Return on investment",
        },
        data: data,
        series: [
            {
                type: "area",
                xKey: "month",
                yKey: "debtPaydown",
                yName: "Debt paydown",
            },
            {
                type: "area",
                xKey: "month",
                yKey: "cashflow",
                yName: "Cashflow",
            },
            {
                type: "area",
                xKey: "month",
                yKey: "appreciation",
                yName: "Appreciation",
            },
        ],
        background: {
            fill: backgroundColor,
        },
        contextMenu: {
            enabled: typeof contextMenuAction === 'object' ? true : false,
            extraActions: [
                { label: 'Say hello', action: () => window.alert('Hello world') },
            ],
        },
    });

    return <AgChartsReact options={options} />;
};
