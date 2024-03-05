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

export function ProductionLinesChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: 'Daily production' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y',
                yName: 'gas',
            },
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y',
                yName: 'oil',
            }
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

export function DrillingLinesChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: 'Days VS. Depth' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'days',
                yKey: 'actual',
                yName: 'Actual',
            },
            {
                type: 'line',
                xKey: 'days',
                yKey: 'afe',
                yName: 'AFE',
            },
            {
                type: 'line',
                xKey: 'days',
                yKey: 'go',
                yName: 'Geomechanics optimized',
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
        axes: [
            {
                type: 'category',
                position: 'top',
                label: {
                    format: "🌧️ #{0>2.0f} °C",
                },
            },
            {
                type: 'number',
                position: 'left',
                label: {
                    format: "#{0>3.0f} ft.",
                },
            }
        ],
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

// export function DrillingLasChart2({ well_data }) {
//     const well_json = wellio.las2json(well_data);
//     const depth_curve_name = "DEPTH";
//     const uwi2 = "00/01-01-073-05W5/0";
//     const three_things_2 = wellioviz.fromJSONofWEllGetThingsForPlotting(well_json, depth_curve_name);
//     const well_log_curves_reformatted_for_d3_2 = three_things_2["well_log_curves_reformatted_for_d3"];
//     const curve_names2 = three_things_2["curve_names"];
//     const example_template = wellioviz.curveBoxTemplateExamples("example");
//     const poro_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(example_template, well_log_curves_reformatted_for_d3_2, [uwi2], ["PHID", "PHIN"], ["purple", "pink"], [""], [{
//         "curve_name": "PHID",
//         "fill": "yes",
//         "fill_direction": "between",
//         "cutoffs": [0],
//         "fill_colors": ["lightblue"],
//         "curve2": "PHIN"
//     },
//     {
//         "curve_name": "PHID",
//         "fill": "no",
//         "fill_direction": "left",
//         "cutoffs": [],
//         "fill_colors": [],
//         "curve2": ""
//     }
//     ], "well_holder_1C", 200, 400, "DEPTH");
//     const resd_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(example_template, well_log_curves_reformatted_for_d3_2, [uwi2], ['RESD'], ["RED"], [""], [[
//         { "curve_name": "RESD", "fill": "yes", "fill_direction": "left", "cutoffs": [0, 4, 25], "fill_colors": ["#ffe6e6", "#ffb3b3", "red"], "curve2": "" }]], "well_holder_1B", 200, 400, "DEPTH");
//     const gr_plot_template_noFill = wellioviz.minimumDataIntoTemplateFunc(example_template, well_log_curves_reformatted_for_d3_2, [uwi2], ["CAL"], ["black"], [""], [
//         { "curve_name": "GR", "fill": "no", "fill_direction": "left", "cutoffs": [0, 4, 25], "fill_colors": ["gray", "orange", "yellow"], "curve2": "" }], "well_holder_1A", 200, 400, "DEPT");
//     const gr_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(example_template, well_log_curves_reformatted_for_d3_2, [uwi2], ["GR"], ["black"], [""], [
//         { "curve_name": "GR", "fill": "yes", "fill_direction": "left", "cutoffs": [0, 4, 25], "fill_colors": ["gray", "orange", "yellow"], "curve2": "" }], "well_holder_1A", 200, 400, "DEPTH")
//     let result_1 = wellioviz.multipleLogPlot("well_holder", [gr_plot_template_noFill, gr_plot_template_1, resd_plot_template_1, poro_plot_template_1]);
//     return result_1;
// };
