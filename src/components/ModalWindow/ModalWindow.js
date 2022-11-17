import './ModalWindow.css';


function ModalWindow({title, text, handleClick, leftBtn='Ні', rightBtn='Так', children}) {

    const handleClickBtn = (boolean) => {
        handleClick(boolean)
    };

    return (
        <div className="modal-window">
            <div className="modal-window--wrap">
                <h3 className="modal-window__title">{title}</h3>
                <div className="modal-window__text">{text}</div>
                {children}
                <div className="modal-window__btn-wrap">
                    <button onClick={() => handleClickBtn(false)} className="modal-window__btn modal-window__btn1">{leftBtn}</button>
                    <button onClick={() => handleClickBtn(true)} className="modal-window__btn modal-window__btn2">{rightBtn}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;