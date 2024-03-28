import React from "react";
import DataContext from '../../contexts/DataContext';
import PageDataContext from "../../contexts/PageDataContext";
import { DrillingLinesChart, DrillingLasChart, DrillingTestChart } from '../chart/Charts';
import ToggleSwitch from "../buttons/ButtonToggle";

export default function Drilling() {
    const pageData = React.useContext(PageDataContext);
    const wellsData = React.useContext(DataContext);
    const lasContainerRef = React.useRef(null);
    const [is3D, setIs3D] = React.useState(false);
    const [lasContainerSize, setLasContainerSize] = React.useState({ width: 0, height: 0 });
    const [wellNames, setWellNames] = React.useState([]);

    const toggle3D = () => {
        setIs3D(!is3D);
    };

    const prepWellTestingData = (data) => {
        if (data) {
            let wellNames = Object.keys(data);
            for (const name of wellNames) {
                if (data[name] === "File not found.") {
                    delete data[name];
                    continue;
                }
            }
            if (Object.keys(data).length === 1) {
                return data[Object.keys(data)[0]];
            } else {
                let temp = [];
                for (let i = 0; i < 12; i++) {
                    temp.push({ hours: i, pressure_psig: NaN, fluid_rate: NaN, chock_size: NaN, })
                }
                return temp;
            }
        }
    };

    const prepTimeDepthData = (data) => {
        if (data) {
            const wellNames = Object.keys(data);
            if (wellNames.length == 1) {
                return data[wellNames[0]];
            } else {
                let temp = [];
                for (let i = 0; i < 40; i++) {
                    temp.push({ day: i, plan: NaN, fact: NaN });
                }
                return temp;
            }
        }
    };

    function checkFileExists(wellName) {
        return new Promise(async (resolve) => {
            try {
                const path = `./src/images/well_schemes/${wellName.toLowerCase()}.jpg}`;
                const res = await fetch(path, { method: 'HEAD' });
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (err) {
                resolve(false);
            }
        });
    };

    React.useEffect(() => {
        if (lasContainerRef.current) {
            const { offsetWidth, offsetHeight } = lasContainerRef.current;
            setLasContainerSize({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

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
                        {/* <img src={require(is3D ? '../../images/drilling_3d.png' : '../../images/geology_section.png')} className="drilling__3d__picture" />
                        <ToggleSwitch states={['Section', '3D']} onClick={toggle3D} /> */}
                        {wellsData && wellsData.drilling.length === 1 ?
                            <div className="drilling__geo_stats">
                                <div ref={lasContainerRef} className="drilling__geo_stats__container">
                                    <div id="well_holder-curvebox_holder0" className="las_well-rop"></div>
                                    <div id="well_holder-curvebox_holder1" className="las_well-caliper"></div>
                                    <div id="well_holder-curvebox_holder2" className="las_well-ild-ilm"></div>
                                    <div id="well_holder-curvebox_holder3" className="las_well-gr" ></div>
                                    <div id="well_holder-curvebox_holder4" className="las_well-temp" ></div>
                                </div>
                                {/* <div className="drilling__curve_names"> */}
                                {pageData && pageData.las !== undefined
                                    ? <DrillingLasChart size={lasContainerSize} setWellNames={setWellNames} well={Object.keys(pageData.las).length > 1 ? undefined : pageData.las[Object.keys(pageData.las)[0]]} />
                                    : <></>
                                }
                                {/* </div> */}
                            </div>
                            :
                            <div className="production__another-graph">
                                {pageData && pageData.well_testing ?
                                    <DrillingTestChart data={prepWellTestingData(pageData.well_testing)} /> :
                                    <></>}
                            </div>
                        }

                    </div>
                </div>
                <div className="drilling__content_right">
                    <div className="drilling__content_top">
                        {pageData && pageData.time_depth ?
                            < DrillingLinesChart data={prepTimeDepthData(pageData.time_depth)} /> : <></>}
                    </div>
                    <div className="drilling__content_bottom">
                        <div className="production__well_stage">
                            {wellsData && wellsData.production.length === 0 ?
                                wellsData.test.length === 0 && wellsData.drilling.length === 1 ?
                                    checkFileExists(wellsData.drilling[0].name) ?
                                        <img src={require(`../../images/well_schemes/${wellsData.drilling[0].name.toLowerCase()}.jpg`)} alt="Well schema" /> :
                                        <></> :
                                    wellsData.drilling.length === 0 && wellsData.test.length === 1 ?
                                        checkFileExists(wellsData.test[0].name) ?
                                            <img src={require(`../../images/well_schemes/${wellsData.test[0].name.toLowerCase()}.jpg`)} alt="Well schema" /> :
                                            <></> :
                                        <></>
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};
