import domtoimage from 'dom-to-image';
import leafletImage from 'leaflet-image';

export function ClickLocation() { // eslint-disable-next-line
    const map = useMapEvents({
        click(evt) {
            if (isClickable) {
                findEpsgClick({ latitude: evt.latlng.lat, longtitude: evt.latlng.lng });
                setIsEpsgFormFilledFalse();
            } else {
                if (didCopy) {
                    copyClicked(evt.latlng)
                }
            }
        },
    });
    return null;
};

export function SetViewOnClick({ coords, isActive, setViewFalse }) {
    const map = useMap();
    if (isActive && !isFirst) {
        map.flyTo(coords, 18);
        setViewFalse();
    } else {
        setIsFirst(false);
    }
};

export function Pointer() {  // eslint-disable-next-line
    const map = useMapEvents({
        mousemove: (evt) => {
            if (evt.originalEvent.currentTarget) {
                const { lat, lng } = evt.target.getCenter();
                setRulerCoords([[lat, lng], [evt.latlng.lat, evt.latlng.lng]]);
                setLiveDist(calcDistance({ lat1: lat, lon1: lng, lat2: evt.latlng.lat, lon2: evt.latlng.lng }));
            }
        },
        click: (evt) => {
            if (evt && isRuler) {
                rulerClick(evt);
            }
        },
    })
};

export function Locate() {
    const map = useMapEvents({
        locationfound(evt) {
            map.flyTo(evt.latlng, map.getZoom());
            setLocation(evt.latlng);
        },
        movestart(evt) {
            map.locate()
        },
    })
};

export function MapToPNG() {
    const node = document.getElementById('map');
    domtoimage.toPng(node)
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'map.png'; // ! downloads the image.png as map.png
            link.click();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
};

export const WaitMapToBlob = async () => {
    const node = document.getElementById('map');
    setTimeout(function () {
        domtoimage.toBlob(node)
            .then((blob) => {
                if (blob) {
                    const blobUrl = URL.createObjectURL(blob)
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = `image.png`; // ! downloads the image as image.png
                    link.click();
                }
            });
    }, 3000);
}

export const handleExportImage = () => {
    if (mapRef.current) {
        const map = mapRef.current;
        leafletImage(map, (err, canvas) => {
            if (err) {
                console.error('Error exporting map as image:', err);
            } else {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `${name}.png`; // ! downloads the image.png as map.png
                link.click();
            }
        });
    }
};
