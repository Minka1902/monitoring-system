import React from "react";
import Checkbox from "../buttons/Checkbox";
import 'ag-charts-enterprise';
import { AgChartsReact } from 'ag-charts-react';
import wellioviz from 'wellioviz';
import { lasGraphTemplate } from '../../constants/chart';

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

function gasRenderer({ datum, xKey, yKey, yName }) {
    return {
        title: yName,
        content: `Day ${datum[xKey]}, ` + datum[yKey] + '-bbl',
    };
};

export function MainLinesChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: '10-day production' },
        data: data,
        series: [
            {
                type: 'line',
                tooltip: { renderer: gasRenderer },
                xKey: 'day',
                yKey: 'gas',
                yName: 'gas',
            },
            {
                type: 'line',
                tooltip: { renderer: renderer },
                xKey: 'day',
                yKey: 'oil',
                yName: 'oil',
            },
            {
                type: 'line',
                tooltip: { renderer: renderer },
                xKey: 'day',
                yKey: 'water',
                yName: 'water',
            },
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
            },
            {
                type: "number",
                position: "left",
                keys: ["water", "gas"],
            },
            {
                type: "number",
                position: "right",
                keys: ["oil"],
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

function renderer({ datum, xKey, yKey, yName }) {
    return {
        title: yName,
        content: `Day ${datum[xKey]}, ` + parseInt(datum[yKey]) + '-bbl',
    };
};

export function ProductionLinesChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: 'Daily production' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'day',
                tooltip: { renderer: renderer },
                yKey: 'fluids',
                yName: 'Fluids',
            },
            {
                type: 'line',
                xKey: 'day',
                tooltip: { renderer: renderer },
                yKey: 'water',
                yName: 'Water',
            }
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
            },
            {
                type: "number",
                position: "left",
                keys: ["fluids"],
                title: {
                    text: "Total fluids extracted - bbl/day",
                },
                label: {
                    formatter: (params) => {
                        return params.value / 1000 + "K";
                    },
                },
            },
            {
                type: "number",
                position: "right",
                keys: ["water"],
                title: {
                    enabled: true,
                    text: "Water extracted - bbl/day",
                },
            },
        ],
        background: {
            fill: backgroundColor,
        },
        navigator: {
            enabled: true,
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

export function ProductionChart({ data, backgroundColor = '#fff9f0', contextMenuAction }) {
    const [options,] = React.useState({
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y',
                yName: 'WHP',
            },
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y2',
                yName: 'Oil Rate',
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

export function DrillingLasChart({ well, depth_curve_name = "DEPT" }) {
    if (well) {
        const wellInfo = well['WELL INFORMATION BLOCK'];
        const uwi2 = wellInfo.UWI.DATA === '' ? wellInfo.API.DATA === '' ? wellInfo.WELL.DATA : wellInfo.API.DATA : wellInfo.UWI.DATA;
        const three_things_2 = wellioviz.fromJSONofWEllGetThingsForPlotting(well, depth_curve_name);
        const well_log_curves_reformatted_for_d3_2 = three_things_2["well_log_curves_reformatted_for_d3"];
        const sp_plot_template_noFill = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1B' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["SP"], ["black"], [""], [{
            "curve_name": "SP",
            "fill": "no",
            "fill_direction": "left",
            "cutoffs": [0],
            "fill_colors": ["gray", "orange", "yellow"],
            "curve2": ""
        }], "well_holder_1A", 180, 500, depth_curve_name)
        const ll3_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1B' }), well_log_curves_reformatted_for_d3_2, [uwi2], ['LL3'], ["RED"], [""], [{
            "curve_name": "LL3",
            "fill": "yes",
            "fill_direction": "left",
            "cutoffs": [5, 10, 25],
            "fill_colors": ["#ffe6e6", "#ffb3b3", "red"],
            "curve2": "LL3"
        }], "well_holder_1B", 180, 500, depth_curve_name);
        const poro_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1C' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["RILD", "RILM"], ["purple", "pink"], [""], [{
            "curve_name": "RILD",
            "fill": "yes",
            "fill_direction": "between",
            "cutoffs": [0],
            "fill_colors": ["lightblue"],
            "curve2": "RILD"
        }, {
            "curve_name": "RILM",
            "fill": "no",
            "fill_direction": "left",
            "cutoffs": [],
            "fill_colors": [],
            "curve2": ""
        }], "well_holder_1C", 180, 500, depth_curve_name);
        const sp_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1A' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["SP"], ["black"], [""], [{
            "curve_name": "SP",
            "fill": "yes",
            "fill_direction": "right",
            "cutoffs": [0],
            "fill_colors": ["yellow", "orange", "gray"],
            "curve2": ""
        }], "well_holder_1A", 180, 500, depth_curve_name);
        // eslint-disable-next-line
        const results = wellioviz.multipleLogPlot("well_holder-", [sp_plot_template_noFill, ll3_plot_template_1, poro_plot_template_1, sp_plot_template_1]);

        return (
            <>
                {three_things_2["curve_names"].map((curveName, index) => {
                    return curveName !== depth_curve_name ? <Checkbox text={curveName} key={index} /> : ''
                })}
            </>
        );
    }
};
