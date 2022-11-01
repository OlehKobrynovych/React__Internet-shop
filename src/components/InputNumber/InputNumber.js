import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InputNumber.css';

function InputNumber({label, id, name, value, setValue, min='', max='', step=''}) {
    const [number, setNumber] = useState('');
   
    useEffect(() => {
        setValue(number)
    }, [number])

    return (
        <div className="input-number">
            <label className='input-number__label' htmlFor={id}>
                <b>{label}</b>
            </label>
            <input
                id={id}
                name={name}
                type="number"
                className='input-number__input'
                onChange={(e) => setNumber(e.target.value)}
                value={value}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}

export default InputNumber;