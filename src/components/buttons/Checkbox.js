import React from "react";

export default function Checkbox({ name = 'checkbox', onClick = () => console.log('Toggle clicked'), text = 'TEXT' }) {
    const [isChecked, setIsChecked] = React.useState(false);

    const toggleChecked = (evt) => {
        setIsChecked(!isChecked);
        onClick(evt);
    };

    return (
        <label className={`checkbox-container${isChecked ? ' checked' : ''}`}>
            <input type="checkbox" checked={isChecked} onChange={toggleChecked} name={name} />
            <svg viewBox="0 0 64 64" height="1.5em" width="1.5em" onClick={toggleChecked}>
                <path className="checkbox-path" d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938"></path>
            </svg>
            <span onClick={toggleChecked} className="checkbox-text">{text}</span>
        </label>
    );
};
