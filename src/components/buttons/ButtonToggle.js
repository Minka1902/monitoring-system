import React, { useState } from 'react';

export default function ToggleSwitch() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={`toggle-switch ${isChecked ? 'checked' : ''}`}>
            <span className="label-left">Current</span>
            <label className="switch" onClick={handleToggle}>
                <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                <span className="slider" onClick={handleToggle}></span>
            </label>
            <span className="label-right">Cumulative</span>
        </div>
    );
};
