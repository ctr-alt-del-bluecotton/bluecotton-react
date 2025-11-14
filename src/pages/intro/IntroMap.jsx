import React from "react";
import S from "./style";
import { motion } from "framer-motion";
import SomMapOnly from "./SomMapOnly";

const IntroMap = () => {


    return (
        <S.IntroMapWrap>
            <S.IntroMapContainer>
                <S.IntroMapImgAndText>
                    <S.IntroMapBlueText1>내 주변 솜찾기</S.IntroMapBlueText1>
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <S.IntroMapText1>
                            <p>혼자가 아닌,</p>
                            <p>솜과 솜이 함께 모여</p>
                            <p>솜솜하게</p>
                        </S.IntroMapText1>
                    </motion.div>
                     <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <S.IntroPostBord>
                            <SomMapOnly />
                        </S.IntroPostBord>
                    </motion.div>
                </S.IntroMapImgAndText>
                <S.IntroMapImgAndText>
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                    <S.IntroPostBord>
                        <S.IntroMapImg src="/assets/images/intro_map_real2.png" alt="지도 이미지" />
                    </S.IntroPostBord>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                    <S.IntroMapText2>
                        <p>내 주변에 있는 솜을 1분 만에 확인해보세요!</p>
                        <p>내가 있는 장소에서 가장 가까운 솜과</p>
                        <p>참여가 가능한 솜을 찾아보세요!</p>
                    </S.IntroMapText2>
                    </motion.div>
                </S.IntroMapImgAndText>
            </S.IntroMapContainer>
        </S.IntroMapWrap>

    );
};

export default IntroMap;