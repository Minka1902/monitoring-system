import React from "react";
import GraphDataContext from "../../contexts/GraphDataContext";
import { DrillingLinesChart, DrillingLasChart } from '../chart/Charts';
import ToggleSwitch from "../buttons/ButtonToggle";
import Checkbox from "../buttons/Checkbox";

export default function Drilling() {
    const graphData = React.useContext(GraphDataContext);
    const [is3D, setIs3D] = React.useState(false);

    const toogle3D = () => {
        setIs3D(!is3D);
    };

    return (
        <section id="drilling">
            <div className="drilling__content__container">
                <div className="drilling__content_left">
                    <div className="drilling__content_top">
                        <div className="drilling__state__info">
                            <h4 className="drilling__state_text">
                                Current state: drilling 8.5`` section <br />
                                24 hours progress: 5 m
                            </h4>
                            <ul className="drilling__state_list">
                                <span style={{ marginLeft: '-30px' }} className="drilling__state_text">
                                    Last 24 hours operations:
                                </span>
                                <li>Drilling 8.5`` section (1792-1797 m)</li>
                                <li>POOH</li>
                                <li>Bit changing</li>
                            </ul>
                            <ul className="drilling__state_list">
                                <span style={{ marginLeft: '-30px' }} className="drilling__state_text">
                                    Next 72 hours operations:
                                </span>
                                <li>Drilling 8.5`` section</li>
                                <li>Logging (1700-1850 m)</li>
                                <li>Cementing</li>
                            </ul>
                        </div>
                    </div>
                    <div className="drilling__content_bottom">
                        <div className="drilling__3d__picture">
                            
                        </div>
                        <ToggleSwitch states={['3D', 'Section']} onClick={toogle3D} />
                    </div>
                </div>
                <div className="drilling__content_right">
                    <div className="drilling__content_top days_depth">
                        {graphData && graphData.days_depth ?
                            < DrillingLinesChart data={graphData.days_depth} /> : <></>}
                    </div>
                    <div className="drilling__content_bottom">
                        <div className="drilling__geo_stats las_doc">
                            {graphData && graphData.las_doc !== undefined
                                ? <DrillingLasChart well={graphData.las_doc} />
                                : <></>
                            }
                            <div className="las_well" id="well_holder-curvebox_holder0"></div>
                            <div className="las_well" id="well_holder-curvebox_holder1"></div>
                            <div className="las_well" id="well_holder-curvebox_holder2"></div>
                            <div className="las_well" id="well_holder-curvebox_holder3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};
