import React from "react";
import S from "./style";
import {motion} from "framer-motion";

const IntroGrade = () => {

    return (
        <S.IntroGradeWrpper>
            <S.IntroGradeContainer>
                <S.IntroGradeUpContainer>
                    <S.IntroGradeTextContainer>
                        <S.IntroGradeBlueText1>
                            <p>등급 ·혜택</p>
                        </S.IntroGradeBlueText1>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <S.IntroGradeText1>
                                <p>솜을 완료해 등급을</p>
                                <p>올려 다양한 혜택을</p>
                                <p>받으세요!</p>
                            </S.IntroGradeText1>
                        </motion.div>
                    </S.IntroGradeTextContainer>
                    <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                        <S.IntroGradeUpCard>
                            <img src="/assets/images/intro_grade1.png" alt="등급이미지1" />
                        </S.IntroGradeUpCard>
                    </motion.div>
                </S.IntroGradeUpContainer>
                <S.IntroGradeDownContainer>
                    <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                    <S.IntroGradeUpCard>
                        <img src="/assets/images/intro_grade2.png" alt="등급이미지2" />
                    </S.IntroGradeUpCard>
                    </motion.div>
                    <S.IntroGradeTextContainer>
                    <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                        <S.IntroGradeText1>
                            <p>솜은 <S.IntroGradePinkText1>가볍게</S.IntroGradePinkText1>,</p>
                            <p>모임은 <S.IntroGradePinkText2>쉽게</S.IntroGradePinkText2>,</p>
                            <p>부담은 <S.IntroGradePinkText3>적게</S.IntroGradePinkText3></p>
                        </S.IntroGradeText1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                        <S.IntroGradeText2>
                            <p>솜 등급을 올려 혜택을 받아보세요</p>
                            <p>솜을 달성할 때마다 받는 캔디의 양을 늘려</p>
                            <p>다양한 상품들을 구매하는데 사용해보세요!</p>
                        </S.IntroGradeText2>
                        </motion.div>
                    </S.IntroGradeTextContainer>
                </S.IntroGradeDownContainer>
            </S.IntroGradeContainer>
        </S.IntroGradeWrpper>

    );
};

export default IntroGrade;