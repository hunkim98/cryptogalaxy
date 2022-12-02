import React from 'react'
import "./AboutPopup.css"

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutPopup: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    return (
        <div className="popup_background_container"
            style={isOpen ? {
                visibility: 'visible',
                opacity: 1,
            } : {
                opacity: 0,
                visibility: 'hidden'
            }}>
            <div className="popup_container">
                <button className="popup_close_button"
                    onClick={() => {
                        setIsOpen(false)
                    }}>X</button>
                <div className="popup_header">dhihihi</div>
            </div>
        </div>
    )
}

export default AboutPopup