import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InputText.css';

function InputText({setValue, value, id, label, name, placeholder=''}) {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [text, setText] = useState('');

    useEffect(() => {
        setText('')
    }, [isCleanInput])
   
    useEffect(() => {
        setValue(text)
    }, [text])

    return (
        <div className="input-text--wrap">
            <label className='input-text__label' htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                type="text"
                className='input-text'
                onChange={(e) => setText(e.target.value)}
                value={value}
                placeholder={placeholder?.length ? placeholder : selectedLanguage?.inputText?.inputTextPlaceholder}
            />
        </div>
    );
}

export default InputText;