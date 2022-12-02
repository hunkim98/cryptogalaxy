import React from 'react'
import "./AboutPopup.css"
import { IoCloseOutline } from "react-icons/io5";
import * as S from './styles'

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AboutPopup: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    return (
        <div className="popup_background_container"
            style={{
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "visibility 0.2s, opacity 0.2s",
                fontFamily: "Nanum Gothic"

            }}>
            <div className="popup_container">
                <button className="popup_close_button"

                    onClick={() => {
                        setIsOpen(false)
                    }}>
                    <IoCloseOutline
                        style={{ cursor: "pointer" }}
                        size={28}
                        onClick={() => {
                        }}
                    />
                </button>
                <div style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>Welcome to CryptoGalaxy!</div>
                <S.DescriptionContainer>
                    <S.Description>
                        <strong>CryptoGalaxy</strong> attempts to visualize the Crypto Market in a fun and interactive way.
                        <br />
                        <br />
                        Traditionally, Markets are represented as a table of numbers, full of jargon and hard to understand.
                        CryptoGalaxy aims to change that by providing a fun and interactive way to visualize the Crypto Market.
                        <br />
                        <br />
                        CryptoGalaxy borrows from the concept of the <mark><strong>"Galaxy"</strong></mark>, where the <strong>sun</strong> is <strong>Bitcoin(BTC)</strong> and where each <strong>planet</strong> represents a Crypto Currency.
                        The sun and planet's appearance is determined by the various metrics of the Crypto Currency, such as Market Cap, Price, Volume, etc.
                        <br />
                        <br />
                        There are also <strong>spaceships</strong> in the galaxy, and they represent the sentiments of the crypto buyers and sellers.
                        <br />
                        <br />
                        Take a close look at the galaxy and see what is happening in the Crypto Market!
                    </S.Description>
                </S.DescriptionContainer>
                <div>
                    <S.BigTitle>Visual Aspects</S.BigTitle>
                    <S.NestedContainer>
                        <S.SmallTitle>1. Sun</S.SmallTitle>
                        <S.NestedDescription>
                            The sun's brightness is related to the BTC's MA increase ratio
                        </S.NestedDescription>
                    </S.NestedContainer>
                    <S.NestedContainer>
                        <S.SmallTitle>2. Planet</S.SmallTitle>
                        <S.NestedDescription>
                            The planet's size is related to the Market Cap. The planet's ice age degree is related to MFI.
                        </S.NestedDescription>
                    </S.NestedContainer>
                    <S.NestedContainer>
                        <S.SmallTitle>3. Spaceships</S.SmallTitle>
                        <S.NestedDescription>
                            A planet's spaceship is related to the planets' RSI.
                        </S.NestedDescription>
                    </S.NestedContainer>
                </div>
            </div>
        </div >
    )
}

export default AboutPopup