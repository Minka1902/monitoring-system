import React from "react";
import Checkbox from "../buttons/Checkbox";
import 'ag-charts-enterprise';
import { AgChartsReact } from 'ag-charts-react';
import wellioviz from 'wellioviz';
import { lasGraphTemplate } from '../../constants/chart';
import { formatMoney } from "../../constants/functions";

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
        content: `${datum[xKey]}, ` + datum[yKey].toFixed(2) + '-bbl',
    };
};

export function MainLinesChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
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
        background: {
            fill: backgroundColor,
        },
        padding: {
            top: 0,
            bottom: 0,
            right: 10,
            left: 0,
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

function ROIRenderer({ datum, xKey, yKey, yName }) {
    return {
        title: yName,
        content: `${datum[xKey]}, ` + formatMoney(datum[yKey]),
    };
};

export function AreaChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
    const [options,] = React.useState({
        title: {
            text: "Return on investment",
        },
        data: data,
        series: [
            {
                type: "area",
                tooltip: { renderer: ROIRenderer },
                xKey: "month",
                yKey: "expenses",
                yName: "Expenses",
            },
            {
                type: "area",
                tooltip: { renderer: ROIRenderer },
                xKey: "month",
                yKey: "cashFlow",
                yName: "Cashflow",
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
                label: {
                    formatter: (params) => {
                        if (params.value > 1000000) {
                            return parseFloat(params.value) / 1000000 + 'M';
                        }
                        return params.value;
                    },
                },
            },
        ],
        background: {
            fill: backgroundColor,
        },
        padding: {
            top: 0,
            bottom: 0,
            right: 30,
            left: 0,
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
        content: `${datum[xKey]}, ` + parseInt(datum[yKey]) + '-bbl',
    };
};

export function ProductionLinesChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: 'Daily production' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'day',
                tooltip: { renderer: renderer },
                yKey: 'cumulative',
                yName: 'Cumulative',
            },
            {
                type: 'line',
                xKey: 'day',
                tooltip: { renderer: renderer },
                yKey: 'daily',
                yName: 'Daily',
            }
        ],
        axes: [
            {
                type: "category",
                position: "bottom",
                label: {
                    rotation: 0,
                },
            },
            {
                type: "number",
                position: "left",
                keys: ["cumulative"],
                title: {
                    text: "Cumulative production, bbl",
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
                keys: ["daily"],
                title: {
                    enabled: true,
                    text: "Daily production, bbl",
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

export function ProductionChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
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
        axes: [
            {
                type: "category",
                position: "bottom",
                label: {
                    rotation: 0,
                },
            },
            {
                type: "number",
                position: "left",
                reverse: true,
            },
        ],
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

export function DrillingLinesChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
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

export function DrillingTestChart({ data, backgroundColor = 'transparent', contextMenuAction }) {
    const [options,] = React.useState({
        title: { text: 'Well testing' },
        data: data,
        series: [
            {
                type: 'line',
                xKey: 'hours',
                yKey: 'pressure_psig',
                yName: 'Pressure (PSIG)',
            },
            {
                type: 'line',
                xKey: 'hours',
                yKey: 'fluid_rate',
                yName: 'Fluid rate',
            },
            {
                type: 'line',
                xKey: 'hours',
                yKey: 'chock_size',
                yName: 'Chock size',
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
                position: 'bottom',
                label: {},
            },
            {
                type: 'number',
                position: 'left',
                keys: ['pressure_psig'],
                label: {},
            },
            {
                type: 'number',
                position: 'right',
                keys: ['fluid_rate', 'chock_size'],
                label: {},
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

export function DrillingLasChart({ well, depth_curve_name = "DEPT", height = 600, width = 180 }) {
    if (well) {
        const wellInfo = well['WELL INFORMATION BLOCK'];
        const uwi2 = wellInfo.UWI.DATA === '' ? wellInfo.API.DATA === '' ? wellInfo.WELL.DATA : wellInfo.API.DATA : wellInfo.UWI.DATA;
        const three_things_2 = wellioviz.fromJSONofWEllGetThingsForPlotting(well, depth_curve_name);
        const well_log_curves_reformatted_for_d3_2 = three_things_2["well_log_curves_reformatted_for_d3"];
        const rop_plot_template_noFill = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1B' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["ROP"], ["blue"], [""], [{
            "curve_name": "ROP",
            "fill": "no",
            "fill_direction": "left",
            "cutoffs": [0],
            "fill_colors": ["gray", "orange", "yellow"],
            "curve2": ""
        }], "well_holder_1A", width, height, depth_curve_name)
        const caliper_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1B' }), well_log_curves_reformatted_for_d3_2, [uwi2], ['Caliper'], ["blue"], [""], [{
            "curve_name": "Caliper",
            "fill": "no",
            "fill_direction": "left",
            "cutoffs": [5, 10, 25],
            "fill_colors": ["#ffe6e6", "#ffb3b3", "red"],
            "curve2": "Caliper"
        }], "well_holder_1B", width, height, depth_curve_name);
        const poro_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1C' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["ILD", "ILM"], ["black", "blue"], [""], [{
            "curve_name": "ILD",
            "fill": "yes",
            "fill_direction": "right",
            "cutoffs": [0],
            "fill_colors": ["#b0b0ff"],
            "curve2": "ILD"
        }, {
            "curve_name": "ILM",
            "fill": "no",
            "fill_direction": "left",
            "cutoffs": [],
            "fill_colors": ['green'],
            "curve2": ""
        }], "well_holder_1C", width, height, depth_curve_name);
        const rop_plot_template_1 = wellioviz.minimumDataIntoTemplateFunc(lasGraphTemplate({ graphId: 'well_holder_1A' }), well_log_curves_reformatted_for_d3_2, [uwi2], ["ROP"], ["blue"], [""], [{
            "curve_name": "ROP",
            "fill": "yes",
            "fill_direction": "right",
            "cutoffs": [0],
            "fill_colors": ["#b0b0ff", "gray"],
            "curve2": ""
        }], "well_holder_1A", width, height, depth_curve_name);
        // eslint-disable-next-line
        const results = wellioviz.multipleLogPlot("well_holder-", [rop_plot_template_noFill, caliper_plot_template_1, poro_plot_template_1, rop_plot_template_1]);
    }
};
