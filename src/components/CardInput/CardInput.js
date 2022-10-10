import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CardInput.css';

function CardInput({setSubCategory}) {
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [name, setName] = useState('');

    useEffect(() => {
        setName('')
    }, [isCleanInput])
   
    useEffect(() => {
        setSubCategory(name)
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