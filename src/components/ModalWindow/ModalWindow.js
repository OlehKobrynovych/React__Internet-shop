import './ModalWindow.css';
import login from '../../assets/images/login.svg';
import { useSelector } from 'react-redux';


function ModalWindow({title, text, handleClick}) {
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    const handleClickBtn = (boolean) => {
        handleClick(boolean)
    };

    return (
        <div className="modal-window">
            <div className="modal-window--wrap">
                <h3 className="modal-window__title">{title}</h3>
                <div className="modal-window__text">{text}</div>
                <div className="modal-window__btn-wrap">
                    <button onClick={() => handleClickBtn(false)} className="modal-window__btn modal-window__btn1">Ні</button>
                    <button onClick={() => handleClickBtn(true)} className="modal-window__btn modal-window__btn2">Так</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;