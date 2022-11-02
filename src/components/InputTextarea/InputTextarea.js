import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InputTextarea.css';

function InputTextarea({setValue, value, id, label, name, rows='5', cols='50', placeholder=''}) {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    // const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [text, setText] = useState('');

    // useEffect(() => {
    //     setText('')
    // }, [isCleanInput])
   
    useEffect(() => {
        setValue(text)
    }, [text])

    return (
        <div className="input-textarea--wrap">
            <label className='input-textarea__label' htmlFor={id}>
                <b>{label}</b>
            </label>
            <textarea
                id={id}
                name={name}
                type="text"
                className='input-textarea'
                onChange={(e) => setText(e.target.value)}
                value={value}
                placeholder={placeholder?.length ? placeholder : selectedLanguage?.inputTextarea?.inputTextareaPlaceholder}
                rows={rows}
                cols={cols}
            />
        </div>
    );
}

export default InputTextarea;