import React from "react";
import Map from '../map/Map';
import MarkersContext from "../../contexts/MarkersContext";
import { LineChart } from '../chart/Charts';
import proj4 from 'proj4';
import epsg from 'epsg';

export default function Main() {
    const [coords, setCoords] = React.useState([31.3, 34.8]);
    const markers = React.useContext(MarkersContext);

    const calculateMarkersCenter = () => {
        let center = { x: 0, y: 0 };
        for (let i = 0; i < markers.length; i++) {
            if (markers[i]) {
                center.x += parseFloat(markers[i].x);
                center.y += parseFloat(markers[i].y);
            }
        }
        center.x = center.x / markers.length;
        center.y = center.y / markers.length;
        let coordinates = proj4(epsg['EPSG:2039'], epsg['EPSG:4326'], [parseFloat(center.x), parseFloat(center.y)]).reverse();
        setCoords(coordinates);
    };

    React.useEffect(() => {
        if (markers.length > 0) {
            calculateMarkersCenter();
        }
    }, [markers])

    return (
        <section id="main">
            <div className="main__content__container">
                <Map coords={coords} calcCenter={calculateMarkersCenter} />
                <div className="main__graph__container">
                    <h3 className="main__graph__title">7-day production</h3>
                    <LineChart />
                </div>
            </div>
        </section>
    );
};
