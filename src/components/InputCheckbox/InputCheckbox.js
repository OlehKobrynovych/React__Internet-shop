import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './InputCheckbox.css';

function InputCheckbox({handleChange, checkboxArr, id}) {
    const [arr, setArr] = useState([]);
   
    useEffect(() => {
        handleChange({_id: id, arr: arr})
    }, [arr])

    const handleSelect = (el) => {
        if (arr.includes(el)) {
            setArr([...arr.filter(ell => ell !== el)])
        } else {
            setArr([...arr, el])
        }
    }

    return (
        <div className="input-checkbox">
            {
                checkboxArr?.map(el => (<div className="input-checkbox__item" key={el} ><input onChange={() => handleSelect(el)} type="checkbox" name={el} id={id+el}/><label htmlFor={id+el}>{el}</label></div>))
            }
        </div>
    );
}

export default InputCheckbox;