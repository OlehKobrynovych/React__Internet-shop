import { useNavigate } from 'react-router-dom';
import './LandingView.css';


function LandingView() {

    const navigate = useNavigate();


    return (
        <div className='landing-view'>

            <h2 className='landing-view__title container'>Landing сторінка</h2>
            <button className='landing-view__btn' onClick={() => navigate('/auth/login')}>Увійти</button>
            <button className='landing-view__btn' onClick={() => navigate('/auth/register')}>Зареєструватись</button>
          
        </div>
    );
}

export default LandingView;