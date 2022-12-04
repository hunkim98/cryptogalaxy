import React from 'react'
import "./AboutPopup.css"
import { IoCloseOutline } from "react-icons/io5";
import planet_image from 'assets/about/planet.png'
import sun_image from 'assets/about/sun.png'
import spaceship_image from 'assets/about/spaceship.png'
import * as S from './styles'
import { Language } from 'context/CryptoContext';

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    language: Language
}

const AboutPopup: React.FC<Props> = ({ isOpen, setIsOpen, language }) => {
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
                <S.MainTitle>
                    <span style={{ opacity: 0.5, fontSize: 23 }}>What is </span>
                    CryptoGalaxy?</S.MainTitle>
                <S.DescriptionContainer>
                    <S.Description>
                        <p>
                            <strong>CryptoGalaxy</strong>
                            {language === Language.ENGLISH ?
                                "attempts to visualize the Crypto Market in a fun and interactive way."
                                : "은 재미있고 상호작용하는 방식으로 암호화폐 시장을 시각화하는 것을 목표로 합니다."}
                        </p>
                        {language === Language.ENGLISH ?
                            <p>
                                Traditionally, Markets are represented as a table of numbers, full of jargon and hard to understand.
                                CryptoGalaxy aims to change that by providing a fun and interactive way to visualize the Crypto Market.
                            </p> :
                            <p>
                                전통적으로 코인 시장은 숫자로 이루어진 표로 표현되며, 난해한 용어와 이해하기 어려운 정보로 가득합니다.
                                CryptoGalaxy는 암호화폐 시장을 재미있고 상호작용하는 방식으로 시각화하여 이러한 문제를 해결하고자 합니다.
                            </p>
                        }
                        {language === Language.ENGLISH ?
                            <p>
                                CryptoGalaxy borrows from the concept of the <mark><strong>"Galaxy"</strong></mark>, where the <strong>sun</strong> is <strong>Bitcoin(BTC)</strong> and where each <strong>planet</strong> represents a Crypto Currency.
                                The sun and planet's appearance is determined by the various metrics of the Crypto Currency, such as Market Cap, Price, Volume, etc.
                            </p> :
                            <p>
                                CryptoGalaxy는 <mark><strong>"은하계"</strong></mark>의 개념을 차용하여, <strong>태양</strong>은 <strong>비트코인(BTC)</strong>으로, 각 <strong>행성</strong>은 암호화폐로 설정합니다.
                                태양과 행성의 모습은 시가총액, 가격, 거래량 등의 다양한 지표에 의해 결정됩니다.
                            </p>}
                        {language === Language.ENGLISH ?
                            <p>
                                There are also <strong>spaceships</strong> in the galaxy, and they represent the sentiments of the crypto buyers and sellers.
                            </p> :
                            <p>
                                또한 은하계에는 <strong>우주선</strong>이 있으며, 이는 암호화폐 매수자와 매도자의 심리를 나타냅니다.
                            </p>
                        }
                        {language === Language.ENGLISH ?
                            <p>
                                Take a close look at the galaxy and see what is happening in the Crypto Market!
                            </p>
                            : <p>
                                은하계를 자세히 살펴보고 암호화폐 시장에서 일어나는 일을 확인해보세요!
                            </p>
                        }
                    </S.Description>
                </S.DescriptionContainer>
                <S.VisualAspectContainer>
                    <S.MainTitle style={{ marginTop: 15, marginBottom: 30 }}>Visual Aspects</S.MainTitle>
                    <S.NestedContainer>

                        <S.NestedImg src={sun_image} />
                        <S.NestedDescriptionContainer>
                            <S.SmallTitle>Sun</S.SmallTitle>
                            <S.NestedDescription>
                                {language === Language.ENGLISH ?
                                    <p>
                                        The sun's brightness is related to the BTC's MA increase ratio
                                    </p> :
                                    <p>
                                        태양의 밝기는 BTC의 이동평균 증가율과 관련이 있습니다.
                                    </p>
                                }
                                {language === Language.ENGLISH ?
                                    <p>
                                        The brighter the sun, the more the BTC's MA is increasing.
                                    </p> :
                                    <p>
                                        태양이 밝을수록 BTC의 최근 이동평균이 증가하는 정도가 높았다는 것을 의미합니다
                                    </p>}
                            </S.NestedDescription>
                        </S.NestedDescriptionContainer>
                    </S.NestedContainer>
                    <S.NestedContainer>
                        <S.NestedImg src={planet_image} />
                        <S.NestedDescriptionContainer>
                            <S.SmallTitle>Planet</S.SmallTitle>
                            <S.NestedDescription>
                                {language === Language.ENGLISH ?
                                    <p>
                                        The planet's size is related to the Market Cap.
                                    </p>
                                    : <p>
                                        행성의 크기는 해당 코인의 시가총액과 관련이 있습니다.
                                    </p>
                                }
                                {language === Language.ENGLISH ?
                                    <p>
                                        The orbit speed is related to the increase ratio of MA.
                                        The higher the ratio speed is, the faster the planet orbits.
                                    </p> :
                                    <p>
                                        행성의 공전 속도는 해당 코인의 최근 이동평균 증가율과 관련이 있습니다.
                                        증가율이 높을수록 행성의 공전 속도가 빨라집니다.
                                    </p>
                                }
                                {language === Language.ENGLISH ?
                                    <p>
                                        The distance from the sun to the planet is related to how similar the coin's price changed relative to BTC.
                                    </p>
                                    : <p>
                                        태양과 행성 사이의 거리는 해당 코인의 가격이 BTC와 얼마나 비슷하게 변동했는지와 관련이 있습니다.
                                    </p>
                                }
                                {language === Language.ENGLISH ?
                                    <p>
                                        The more similar its price change is to BTC, the closer the planet is to the sun.
                                    </p> :
                                    <p>
                                        최근 가격 변동이 BTC와 비슷할수록 행성이 태양에 가까워집니다.
                                    </p>}
                                {language === Language.ENGLISH ?
                                    <p>
                                        The planet's ice age degree is related to RSI.
                                        The lower the RSI, the more the planet is in an ice age.
                                    </p> :
                                    <p>
                                        행성의 빙하기 정도는 RSI와 관련이 있습니다.
                                        RSI가 낮을수록 행성은 빙하기에 있습니다.
                                    </p>
                                }
                            </S.NestedDescription>
                        </S.NestedDescriptionContainer>

                    </S.NestedContainer>
                    <S.NestedContainer>
                        <S.NestedImg src={spaceship_image} />
                        <S.NestedDescriptionContainer>
                            <S.SmallTitle>Spaceships</S.SmallTitle>
                            <S.NestedDescription>
                                {language === Language.ENGLISH ?

                                    <p>
                                        A planet's spaceship is related to the planets' RSI.
                                    </p> :
                                    <p>
                                        행성의 우주선은 해당 행성의 RSI와 관련이 있습니다.
                                    </p>}
                                {language === Language.ENGLISH ?
                                    <p>
                                        The higher the RSI is, the more the spaceship is flying towards the planet.
                                    </p> :
                                    <p>
                                        RSI가 높을수록 행성에 유입되는 우주선의 수가 많아집니다.
                                    </p>
                                }
                                {language === Language.ENGLISH ?
                                    <p>
                                        The lower the RSI is, the more the spaceship is flying away from the planet.
                                    </p> :
                                    <p>
                                        RSI가 낮을수록 행성에서 유출되는 우주선의 수가 많아집니다.
                                    </p>}
                            </S.NestedDescription>
                        </S.NestedDescriptionContainer>

                    </S.NestedContainer>
                    <S.Contact style={{ alignSelf: 'center', opacity: 0.5, fontSize: 10, marginBottom: 20 }}>
                        created by <a href="https://github.com/hunkim98/cryptogalaxy" style={{ color: 'white' }}>@hunkim98</a>
                    </S.Contact>
                </S.VisualAspectContainer>
            </div>
        </div >
    )
}

export default AboutPopup