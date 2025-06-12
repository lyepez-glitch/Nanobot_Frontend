import { useState } from 'react';

export default function Slider({ min, max, step, label, onChange }) {
    const [value, setValue] = useState(min);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="slider flex flex-col items-start">
            <label className="secondsLabel mb-2">{label}</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="slider"
            />
            <span style={{marginLeft: '60px',marginTop: '5px'}}>{value}</span>
        </div>
    );
}
