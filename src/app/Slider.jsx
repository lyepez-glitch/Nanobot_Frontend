import { useState } from 'react';

export default function Slider({ min, max, step, label, onChange }) {
    const [value, setValue] = useState(min);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="flex flex-col items-start">
            <label className="mb-2">{label}</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="slider"
            />
            <span>{value}</span>
        </div>
    );
}
