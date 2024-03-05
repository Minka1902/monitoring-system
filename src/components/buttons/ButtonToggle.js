import React, { useState } from 'react';

export default function ToggleSwitch({ states = ['Current', 'Cumulative'], onClick = () => console.log('Toggle clicked') }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = (evt) => {
        setIsChecked(!isChecked);
        onClick(evt);
    };

    return (
        <div className={`toggle-switch ${isChecked ? 'checked' : ''}`}>
            <span className="label-left">{states[0]}</span>
            <label className="switch" >
                <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                <span className="slider" onClick={handleToggle}></span>
            </label>
            <span className="label-right">{states[1]}</span>
        </div>
    );
};
