import React from "react";
import S from "./style";
import { motion } from "framer-motion";
import IntroPostList from "./IntroPostList"; 

const IntroPost = () => {
  return (
    <S.IntroPostWrapper>
      <S.IntroPostContainer>
        <S.IntroPostTextContainer>
          <S.IntroPostBlueText1>
            <p>게시판</p>
          </S.IntroPostBlueText1>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <S.IntroPostText1>
              <p>오늘의 도전이</p>
              <p>남긴 흔적을 글로 남겨보세요</p>
            </S.IntroPostText1>
          </motion.div>

          <S.IntroPostContainer2>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroPostText2>
                <p>어디서든 바로 작성</p>
                <p>별도의 과정 필요 없이</p>
                <p>바로 작성해보세요</p>
              </S.IntroPostText2>
            </motion.div>

            {/* 🔽 여기: 이미지 대신 실제 게시글 리스트 프리뷰 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroPostBord>
                <IntroPostList />
              </S.IntroPostBord>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroPostText2>
                <p>내가 자랑하고 싶은 것</p>
                <p>내가 응원 받고 싶은 것</p>
                <p>그냥 공유하고 싶은 것 까지</p>
              </S.IntroPostText2>
            </motion.div>
          </S.IntroPostContainer2>

          <S.IntroPostContainer3>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroPostText2>
                <p>혼자 하더라도 마치 같이 하는 것처럼</p>
                <p>별도의 절차 없이 오늘의 솜에서 공유해보세요.</p>
              </S.IntroPostText2>
            </motion.div>
          </S.IntroPostContainer3>
        </S.IntroPostTextContainer>
      </S.IntroPostContainer>
    </S.IntroPostWrapper>
  );
};

export default IntroPost;
