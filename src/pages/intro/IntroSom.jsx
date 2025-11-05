import React from "react";
import { motion } from "framer-motion";
import S from "./style";

const IntroSom = () => {
  return (
    <S.IntroSomWrpper>
      <S.IntroSomContainer1>
        <S.IntroSomTextContainer1>
          <S.IntroSomBlueText1>
            <p>솜 등록하기</p>
          </S.IntroSomBlueText1>
          <S.IntroSomText1>
            <p>솜은 가깝고 편하게</p>
            <p>내 목표도 간편하게</p>
            <p>함께 솜을 등록해봐요!</p>
          </S.IntroSomText1>
          <S.IntroSomContainer2>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"18px", height:"24px"}} src="/assets/icons/intro_title.png" alt="제목 아이콘" />
                    <span>제목 설정</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>눈에 띄고 관심을 끄는</p>
                    <p>제목을 설정해봐요!</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>나의 챌린지를 가장 잘 표현하는 말로</p>
                    <p>함께 할 사람들을 최대한 많이 모아보세요!</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
                <S.IntroSomRegisterCard>
                  <img src="/assets/images/intro_som1.png" alt="제목 이미지" />
                </S.IntroSomRegisterCard>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomRegisterCard>
                  <img src="/assets/images/intro_som2.png" alt="카테고리 이미지" />
                </S.IntroSomRegisterCard>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"22px", height:"22px"}} src="/assets/icons/intro_category.png" alt="체크 아이콘" />
                    <span>카테고리 선택</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>나의 솜에 맞는 카테고리를</p>
                    <p>골라보세요!</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>우리가 아는 솜에도 많은 종류의 솜이 있듯이</p>
                    <p>블루코튼의 솜도 다양한 종류의 솜이 있어요!</p>
                    <p>나의 솜에 맞는 카테고리를 골라보세요!</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"23px", height:"23px"}} src="/assets/icons/intro_place.png" alt="장소 아이콘" />
                    <span>장소 선택</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>내가 원하는 곳으로</p>
                    <p>사람들을 모아보세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>나를 포함한 사람들이 솜에 참여하기 위해</p>
                    <p>모일 장소를 직접 선택해보세요.</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
                <S.IntroSomRegisterCard>
                  <img src="/assets/images/intro_som3.png" alt="장소 이미지" />
                </S.IntroSomRegisterCard>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomRegisterCard>
                    <img src="/assets/images/intro_som4.png" alt="날짜 이미지" />
                </S.IntroSomRegisterCard>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"22px", height:"22px"}} src="/assets/icons/intro_date.png" alt="달력 아이콘" />
                    <span>날짜 선택</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>목표를 수행하기 위한</p>
                    <p>솜의 기간을 정해주세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>솜을 언제부터 시작하고, 언제 끝낼지 스케쥴을</p>
                    <p>선택해주세요! 기간은 참여자 모두가 볼 수 있으며,</p>
                    <p>목표 기간 후 솜이 종료됩니다!</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"22px", height:"24px"}} src="/assets/icons/intro_context.png" alt="상세 내용 아이콘" />
                    <span>상세 내용 작성</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>사람들이 참여할</p>
                    <p>솜을 설명해주세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>사람들이 내 솜을 자세히 알고 싶을 때 볼 수 있는</p>
                    <p>자세한 설명을 적어주세요!</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
                <S.IntroSomRegisterCard>
                  <img src="/assets/images/intro_som5.png" alt="상세내용 이미지" />
                </S.IntroSomRegisterCard>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomRegisterCard>
                    <img src="/assets/images/intro_som6.png" alt="인원수 설정 이미지" />
                </S.IntroSomRegisterCard>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"22px", height:"13px"}} src="/assets/icons/intro_member.png" alt="인원수 아이콘" />
                    <span>인원수 설정</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>솜에 참여할 인원 수를</p>
                    <p>정해주세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>내가 만들 솜에 참여할 최대 인원을 정해주세요!</p>
                    <p>최대 10명까지 설정할 수 있어요</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"20px", height:"17px"}} src="/assets/icons/intro_image.png" alt="이미지 아이콘" />
                    <span>이미지 등록</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>솜을 설명할</p>
                    <p>이미지를 등록해주세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>나의 솜을 설명할 이미지를 등록해주세요!</p>
                    <p>장소를 찍어도 좋고, 표현 할 수 있는 사진도 좋아요.</p>
                    <p>최대 5개까지 등록할 수 있어요</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
                <S.IntroSomRegisterCard>
                    <img src="/assets/images/intro_som7.png" alt="이미지 등록 이미지" />
                </S.IntroSomRegisterCard>
              </S.IntroSomContainer3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomRegisterCard>
                    <img src="/assets/images/intro_som8.png" alt="저장 이미지" />
                </S.IntroSomRegisterCard>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img style={{marginRight:"6px", width:"22px", height:"22px"}} src="/assets/icons/intro_save.png" alt="저장 아이콘" />
                    <span>저장</span>
                  </S.IntroSomBlueText2>
                  <S.IntroSomText2>
                    <p>저장을 눌러</p>
                    <p>솜을 게시해주세요</p>
                  </S.IntroSomText2>
                  <S.IntroSomText3>
                    <p>솜을 올릴 준비가 완료 되었다면, 저장을 눌러</p>
                    <p>나의 솜을 다른 사람에게 보여주세요!</p>
                    <p>언제든지 수정할 수 있습니다!</p>
                  </S.IntroSomText3>
                </S.IntroSomTextContainer2>
              </S.IntroSomContainer3>
            </motion.div>
          </S.IntroSomContainer2>
        </S.IntroSomTextContainer1>
      </S.IntroSomContainer1>
    </S.IntroSomWrpper>
  );
};

export default IntroSom;
