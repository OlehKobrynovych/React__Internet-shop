import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './CardInput.css';

function CardInput({handleChange}) {
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [name, setName] = useState('');

    useEffect(() => {
        setName('')
    }, [isCleanInput])
   
    useEffect(() => {
        handleChange(name)
    }, [name])

    return (
        <div className="card-input--wrap">
            <input
                id="setSubCategory"
                name="setSubCategory"
                type="text"
                className='card-input'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Введіть назву..."
            />
        </div>
    );
}

export default CardInput;