export const options = {
    token: 'pk.eyJ1IjoibWlua2ExOTAyIiwiYSI6ImNsZmIza2MxOTAxdjYzcXBqYmhxdDM4ZmsifQ.6KidVCNmWrz-aq0JP2LYaQ',
};

export const maps = [
    { valid: true, name: "Standart", checked: true, url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
    { valid: false, name: "Topography", checked: false, url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
    { valid: true, name: "Satellite", checked: false, url: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`, attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' },
    { valid: false, name: "NASA", checked: false, url: 'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg', attribution: '&copy; NASA Blue Marble, image service by OpenGeo' },
    { valid: false, name: "Topography", checked: true, url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
];
