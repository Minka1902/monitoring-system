import React from "react";
import Map from '../map/Map';
import { LineChart } from '../chart/Charts';

export default function Main() {
    const [coords, setCoords] = React.useState([31.3, 34.8]);

    return (
        <section id="main">
            <div className="main__content__container">
                <Map coords={coords} />
                <div className="main__graph__container">
                    <h3 className="main__graph__title">7-day production</h3>
                    <LineChart />
                </div>
            </div>
        </section>
    );
};
