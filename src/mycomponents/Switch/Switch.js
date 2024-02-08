import React from 'react';
import './SwitchToggle.css'; // Import the custom CSS file

const SwitchToggle = (Props) => {

    const handleToggle = () => {
        Props.action(!Props.checked);
    };

    return (
        <div className={`custom-control custom-switch ${Props.checked ? 'switch-on' : 'switch-off'}`}>
            <span>{"Income"}</span>
            <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch"
                checked={Props.checked}
                onChange={handleToggle}
            />
            <label className="custom-control-label" htmlFor="customSwitch">
                <span className='mx-1'>{Props.checked ? ' Yes' : ' No'}</span>
            </label>
        </div>
    );
};

export default SwitchToggle;
