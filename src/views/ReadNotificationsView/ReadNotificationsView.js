import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadNotificationsView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSeenNotifications, setSeenPurchases, setStatusPurchases } from '../../store/userSlice';


function ReadNotificationsView () {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const purchases = useSelector(state => state.userSlice.purchases);
    let { idNotifications } = useParams();
    // const [purchaseContent, setPurchaseContent] = useState({});
    const [notificationsContent, setNotificationsContent] = useState({});
    const dispatch = useDispatch();
    // console.log('purchases: ', notificationsContent)
    
    useEffect(() => {
        if (user?._id) {
            fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${idNotifications}?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        setNotificationsContent(res.data)
                        setIsSeen(res.data)
                        // dispatch(getPurchases(res.data));
                    } else {
                        console.log('GET ReadPurchasesView:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [user])

    const setIsSeen = (notificationsContent2) => {
        let data = {
            ...notificationsContent2,
            token: user.token,
            isSeen: true,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${notificationsContent2._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log('PUT ReadNotificationsView:', res)
                    dispatch(setSeenNotifications({...notificationsContent2, isSeen: true}));
                } else {
                    console.log('PUT ReadNotificationsView:', res)
                }
            })
            .catch((error) => {
            })
    }

    return (
        <div className={`read-notifications read-notifications--${notificationsContent?.status}`}>
            <div className='read-notifications--wrap container'>
                {
                    notificationsContent?.status == 'callBack' ? <div>
                        <h4 className='read-notifications__title'>{selectedLanguage?.readNotificationsView?.readNotificationsTitle1}</h4>
                        <div className='read-notifications__creation-time-title'>{selectedLanguage?.readNotificationsView?.readNotificationsTitleDate}&nbsp;{new Date(notificationsContent?.creation_time).toLocaleString()}</div>
                        <div className='read-notifications__text'>
                            {selectedLanguage?.readNotificationsView?.readNotificationsText1}
                            &nbsp;<a className='read-notifications__text-link' href={`tel:${notificationsContent?.phone}`}>{notificationsContent?.phone}</a>&nbsp;
                            {selectedLanguage?.readNotificationsView?.readNotificationsText2}
                        </div>
                        <div className='read-notifications__comment'><b>{selectedLanguage?.readNotificationsView?.readNotificationsComment}</b>&nbsp;{notificationsContent?.comment}</div>
                    </div> : <div>
                        <h4 className='read-notifications__title'>{selectedLanguage?.readNotificationsView?.readNotificationsTitle2}</h4>
                        <div className='read-notifications__creation-time-title'>{selectedLanguage?.readNotificationsView?.readNotificationsTitleDate}&nbsp;{new Date(notificationsContent?.creation_time).toLocaleString()}</div>
                        <div className='read-notifications__text'>
                            {selectedLanguage?.readNotificationsView?.readNotificationsText3}
                            &nbsp;<a className='read-notifications__text-link' href={`mailto:${notificationsContent?.email}`}>{notificationsContent?.email}</a>&nbsp;
                            {selectedLanguage?.readNotificationsView?.readNotificationsText4}
                        </div>
                    </div> 
                }
            </div>
        </div>
    );
}

export default ReadNotificationsView;