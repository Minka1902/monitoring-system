export const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const shortMonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const shortMonthArrayLow = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const delay = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));

export const memoryUnits = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const pages = ['main', 'geology', 'production', 'drilling', 'project-plan'];

export const statusGraph = [
    {
        name: '1',
        '2D': 0,
        '3D': 0,
        prod: 0,
        explore: 0,
    }, {
        name: '2',
        '2D': 30,
        '3D': 0,
        prod: 10,
        explore: 0,
    }, {
        name: '3',
        '2D': 60,
        '3D': 0,
        prod: 30,
        explore: 0,
    }, {
        name: '4',
        '2D': 90,
        '3D': 75,
        prod: 45,
        explore: 17.5,
    }, {
        name: '5',
        '2D': 120,
        '3D': 75,
        prod: 45,
        explore: 35,
    }, {
        name: '6',
    }, {
        name: '7',
    }, {
        name: '8',
    }, {
        name: '9',
    }, {
        name: '10',
    }, {
        name: '11',
    }, {
        name: '12',
    }
];

export const fieldsData = [
    { fieldName: 'Field 1', object: { objectName: 'Object 1', minBbl: 30 } },
    { fieldName: ' ', object: { objectName: 'Object 2', minBbl: 22 } },
    { fieldName: 'Field 2', object: { objectName: 'Object 1', minBbl: 25 } },
    { fieldName: ' ', object: { objectName: 'Object 2', minBbl: 16 } },
    { fieldName: 'Field 3', object: { objectName: 'Object 1', minBbl: 12 } },
    { fieldName: ' ', object: { objectName: 'Object 2', minBbl: 18 } },
];

export const statusTable = [
    { stage: 'Drilling', name: 'Exploration wells', commitment: 3, actual: 1, value: 33 },
    { stage: 'Drilling', name: 'Production wells', commitment: 27, actual: 12, value: 44 },
    { stage: 'Seismic', name: '3D, sq. km', commitment: 1300, actual: 970, value: 75 },
    { stage: 'Seismic', name: '2D, km', commitment: 1000, actual: 1200, value: 120 },
];

export const markersArray = [
    { coords: [31.657, 34.635], name: 'Well 1' },
    { coords: [31.475, 34.816], name: 'Well 2' },
    { coords: [31.412, 34.696], name: 'Well 3' },
    { coords: [31.455, 34.604], name: 'Well 4' },
];
