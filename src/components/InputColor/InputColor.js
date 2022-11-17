import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InputColor.css';

function InputColor({setValue, value, id, label, name}) {
    // const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    // const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    // const [text, setText] = useState('');


    return (
        <div className="input-color--wrap">
            <label htmlFor={id}>
                <input 
                    type="color" 
                    id={id}
                    name={name}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <b>{label}</b>
            </label>
        </div>
    );
}

export default InputColor;