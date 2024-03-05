import React from "react";
import ToggleSwitch from "../buttons/ButtonToggle";

export default function Geology() {
    const [is3D, setIs3D] = React.useState(false);

    const toogle3D = () => {
        setIs3D(!is3D);
    };

    return (
        <section id="geology">
            <div className="geology__content__container">
                <div className="geology__content_top">
                    <img src={is3D ? require('../../images/geology_3d.png') : require('../../images/geology_section.png')} alt="3d" className="geology__image" />
                </div>
                <div className="geology__button__container">
                    <ToggleSwitch states={['Section', '3D']} onClick={toogle3D} />
                    <div className="geology__section2__container">
                        {is3D ?
                            <></> :
                            <img src={require('../../images/geology_section2.png')} alt="geology section 2" />
                        }
                    </div>
                </div>
            </div>
        </section >
    );
};
