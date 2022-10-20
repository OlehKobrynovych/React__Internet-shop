import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setStatusPurchases } from '../../store/userSlice';
import './SelectStatus.css';

function SelectStatus({purchases, status}) {
    const user = useSelector(state => state.userSlice.user);
    const [option, setOption] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (status?.length) {
            setOption(status)
        }
    }, [])

    useEffect(() => {
        if (option?.length && option !== purchases.status) {
            let data = {
                ...purchases,
                token: user.token,
                status: option,
            }
    
            fetch(`http://localhost:3000/api/purchases/${purchases._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        // console.log('PUT CardSelect:', res)
                        dispatch(setStatusPurchases({...purchases, status: option}));
                        toast.success('Дані оновлено', {
                            position: "bottom-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    } else {
                        console.log('PUT CardSelect:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Сталася помилка', {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        }
    }, [option])

    return (
        <div className="select-status">
             <select onChange={(e) => setOption(e.target.value)} value={option}>
                <option value='InProcess'>В процесі</option>
                <option value='done'>Виконано</option>
                <option value='notDone'>Відхилено</option>
            </select>
        </div>
    );
}

export default SelectStatus;