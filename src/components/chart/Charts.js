import React from "react";
import Chart from 'chart.js/auto';      //eslint-disable-line
import { Pie, Bar, Line, Bubble } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
import 'ag-charts-enterprise';
import { AgChartsReact } from 'ag-charts-react';
import faker from 'faker';

const defSubtitle = { text: 'Please pass a subtitle.', font: { size: 12, family: 'tahoma, Ariel, sans-serif', weight: 'normal', style: 'italic', }, color: '#000', padding: { top: 5, bottom: 5 } };
const defTitle = { text: 'Please pass a title.', font: { size: 12, family: 'tahoma, Ariel, sans-serif', weight: 'normal', style: 'italic' }, color: '#00AAAA', padding: { top: 5, bottom: 5 } };
export function PieChart({ chartData, title = defTitle, subtitle = defSubtitle, chartClass = 'chart-pie-container' }) {
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
            }
        ]
    };

    return (
        <div className={chartClass}>
            <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title.text,
                            color: title.color,
                        },
                        subtitle: {
                            display: subtitle.text ? true : false,
                            text: subtitle.text,
                            color: subtitle.color,
                            font: subtitle.font,
                            padding: subtitle.padding,
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};

export function BarChart({ chartData, title = defTitle, subtitle = defSubtitle, chartClass = 'chart-bar-container', label }) {
    const data = {
        labels: chartData.map((data) => data.date),
        datasets: [{
            label: label,
            data: chartData.map((data) => data.memoryLeft),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#50AF95",
                "#a31a2f",
                "#af5a2f",
                "#f3ba2f",
                "#ffffff"
            ],
            borderColor: "black",
            borderWidth: 2
        }],
    }

    return (
        <div className={chartClass}>
            <Bar
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title.text,
                            color: title.color,
                        },
                        subtitle: {
                            display: subtitle.text ? true : false,
                            text: subtitle.text,
                            color: subtitle.color,
                            font: subtitle.font,
                            padding: subtitle.padding,
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};

export function LineChart({ chartData, title = 'Please pass a title.', subtitle = defSubtitle, chartClass = 'chart-bar-container', label, maxY = 10000, isXZero = false, isYZero = false }) {
    let data;
    if (chartData !== undefined)
        data = {
            labels: chartData.map((data) => data.xValue),
            datasets: [{
                label: label,
                data: chartData.map((data) => data.yValue),
                backgroundColor: [
                    '#ABCDEF',
                ],
                borderColor: "#1F4268",
                borderWidth: 0.5,
            }],
        };

    if (chartData !== undefined) return (
        <div className={chartClass} >
            <Line
                data={data}
                options={{
                    scales: {
                        y: {
                            beginAtZero: isYZero,
                            stepSize: 10,
                            max: maxY,
                        },
                        x: {
                            beginAtZero: isXZero,
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: title.text,
                            color: title.color,
                        },
                        subtitle: {
                            display: subtitle.text ? true : false,
                            text: subtitle.text,
                            color: subtitle.color,
                            font: subtitle.font,
                            padding: subtitle.padding,
                        },
                        legend: {
                            display: false
                        },
                    }
                }}
            />
        </div>
    );
    else return (
        <div className={chartClass}>
            Not enough data to make a chart
        </div>
    );
};

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
    const [options, setOptions] = React.useState({
        title: {
            text: "Return on investment",
        },
        data: data,
        series: [
            {
                type: "area",
                xKey: "month",
                yKey: "subscriptions",
                yName: "subscriptions",
            },
            {
                type: "area",
                xKey: "month",
                yKey: "services",
                yName: "services",
            },
            {
                type: "area",
                xKey: "month",
                yKey: "products",
                yName: "products",
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
