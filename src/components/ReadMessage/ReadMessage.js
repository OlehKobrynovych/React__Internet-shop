import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadMessage.css';
import stars from './../../assets/images/stars.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';



function ReadMessage() {
    const user = useSelector(state => state.userSlice.user);
    let { idMessage } = useParams();
    // const shop = useSelector(state => state.userSlice.shop);
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [message, setMessage] = useState({});
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // console.log('asdasd: ',shop)

    useEffect(() => {
        fetch(`http://localhost:3000/api/purchases/${idMessage}`)
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data) {
                setMessage(res.data)
                // dispatch(getPurchases(res.data));
            } else {
                console.log('GET ReadMessage:', res)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [idMessage])

    // зміна статусу повідомлення на прочитане
    // useEffect(() => {
    //     if (message._id) {
    //         let data = {
    //             ...message,
    //             isSeen: true,
    //             token: user.token,
    //         }
    
    //         fetch(`http://localhost:3000/api/purchases/${message._id}`, {
    //             method: 'PUT',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.success && res.data) {
    //                 // dispatch(getPurchases(res.data));
    //             } else {
    //                 console.log('GET ReadMessage:', res)
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    //     }
    // }, [message])
   
    const handleSort = () => {
        
    }

    return (
        <div className="read-message">
            <div className="read-message--wrap container">
                Повідомлення {idMessage}
            </div>
        </div>
    );
}

export default ReadMessage;