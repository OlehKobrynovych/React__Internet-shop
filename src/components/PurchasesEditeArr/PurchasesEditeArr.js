import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PurchasesEditeArr.css';
import deleteImg from './../../assets/images/deleteImg.svg';
import InputText from '../InputText/InputText';
import { setIsCleanInput } from '../../store/userSlice';


function PurchasesEditeArr({handleChange, purchaseArr}) {
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [name, setName] = useState('');
    const [arr, setArr] = useState([]);
    const dispatch = useDispatch();

    console.log(arr)

    useEffect(() => {
        if (purchaseArr?.length) {
            setArr([...purchaseArr])
        }
    }, [])

    const handleDeleteEl = (el) => {
        setArr([...arr.filter(ell => ell !== el)])
    }
    
    const handleSetValue = () => {
        if (name?.length) {
            setArr([...arr, name])
            dispatch(setIsCleanInput(!isCleanInput))
        }
    }
  
    useEffect(() => {
        handleChange(arr)
    }, [arr])
   
    // useEffect(() => {
    //     handleChange(name)
    // }, [name])

    return (
        <div className="purchases-edite-arr">
            <div className="purchases-edite-arr--wrap">
                {
                    !!arr?.length && arr.map(el => (<p className="purchases-edite-arr__items">
                            {el}
                            <div className='purchases-edite-arr__btn-delete-wrap'>
                                <img className='purchases-edite-arr__btn-delete' onClick={() => handleDeleteEl(el)} src={deleteImg} alt='img'/>
                            </div>
                        </p>))
                }
            </div>
            <div className='creation-product__create-btn-wrap'>
                <InputText handleChange={setName}/>
                <button onClick={handleSetValue} className='creation-product__create-btn'>+</button>
            </div>
        </div>
    );
}

export default PurchasesEditeArr;