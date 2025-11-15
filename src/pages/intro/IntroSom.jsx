import React from "react";
import { motion } from "framer-motion";
import S from "./style";

const IntroSom = () => {
  const sampleSomTitle = "아침 7시 기상 30일 챌린지";
  const sampleSomCategoryLabel = "건강";
  const sampleAddress = "서울시 마포구 양화로 12길 34";
  const sampleStartDate = "2025-11-20 07:00";
  const sampleEndDate = "2025-12-19 07:00";
  const sampleSomType = "파티솜";
  const sampleMemberCount = "최대 6명";
  const sampleImageCount = 3;

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
                    <img
                      style={{ marginRight: "6px", width: "18px", height: "24px" }}
                      src="/assets/icons/intro_title.png"
                      alt="제목 아이콘"
                    />
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>제목</div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "black",
                        padding: "10px 14px",
                        borderRadius: "4px",
                        border: "1px solid #0015FF",
                        background: "#FFFFFF",
                        minHeight: "46px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {sampleSomTitle}
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      사람들이 한눈에 알아볼 수 있는 제목을 지어보세요.
                    </div>
                  </div>
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>
                      카테고리
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {["학습", "건강", "소셜", "취미", "생활", "루키"].map(
                        (label) => {
                          const isActive = sampleSomCategoryLabel === label;
                          return (
                            <span
                              key={label}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "999px",
                                fontSize: "13px",
                                border: isActive
                                  ? "1px solid #0015FF"
                                  : "1px solid #E0E0FF",
                                background: isActive ? "#0015FF" : "#FFFFFF",
                                color: isActive ? "#ffffff" : "#0015FF",
                              }}
                            >
                              {label}
                            </span>
                          );
                        }
                      )}
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      현재 선택된 카테고리: {sampleSomCategoryLabel}
                    </div>
                  </div>
                </S.IntroSomRegisterCard>

                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img
                      style={{ marginRight: "6px", width: "22px", height: "22px" }}
                      src="/assets/icons/intro_category.png"
                      alt="체크 아이콘"
                    />
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
                    <img
                      style={{ marginRight: "6px", width: "23px", height: "23px" }}
                      src="/assets/icons/intro_place.png"
                      alt="장소 아이콘"
                    />
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>장소</div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: "black",
                        padding: "10px 14px",
                        borderRadius: "4px",
                        border: "1px solid #0015FF",
                        background: "#FFFFFF",
                        minHeight: "46px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {sampleAddress}
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      주소 검색으로 간편하게 장소를 지정할 수 있어요.
                    </div>
                  </div>
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>
                      솜 기간
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#FFFFFF",
                        }}
                      >
                        시작
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          color: "black",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          border: "1px solid #0015FF",
                          background: "#FFFFFF",
                        }}
                      >
                        {sampleStartDate}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#757575",
                          marginTop: "8px",
                        }}
                      >
                        종료
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          color: "black",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          border: "1px solid #0015FF",
                          background: "#FFFFFF",
                        }}
                      >
                        {sampleEndDate}
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      설정한 기간 동안만 솜이 진행되며, 종료일 이후 자동으로
                      마감돼요.
                    </div>
                  </div>
                </S.IntroSomRegisterCard>

                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img
                      style={{ marginRight: "6px", width: "22px", height: "22px" }}
                      src="/assets/icons/intro_date.png"
                      alt="달력 아이콘"
                    />
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
            </motion.div>+
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img
                      style={{ marginRight: "6px", width: "22px", height: "24px" }}
                      src="/assets/icons/intro_context.png"
                      alt="상세 내용 아이콘"
                    />
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>
                      상세 내용
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "black",
                        padding: "12px 14px",
                        borderRadius: "4px",
                        border: "1px solid #0015FF",
                        background: "#FFFFFF",
                        minHeight: "90px",
                        lineHeight: 1.5,
                      }}
                    >
                      매일 아침 7시에 일어나 하루를 시작하는 챌린지입니다.
                      <br />
                      출근 준비, 공부, 운동 등 각자의 목표를 위해 아침을
                      깨워봐요.
                      <br />
                      인증은 매일 아침 셀카 또는 기상 화면 캡처로 진행합니다.
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      참여자들이 헷갈리지 않도록 구체적으로 적어주세요.
                    </div>
                  </div>
                </S.IntroSomRegisterCard>
              </S.IntroSomContainer3>
            </motion.div>

            {/* 6. 인원수 설정 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <S.IntroSomContainer3>
                <S.IntroSomRegisterCard>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>
                      인원수
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "black",
                        padding: "10px 14px",
                        borderRadius: "4px",
                        border: "1px solid #0015FF",
                        background: "#FFFFFF",
                        minHeight: "46px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {sampleMemberCount}
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      최소 2명부터 최대 10명까지 설정할 수 있어요.
                    </div>
                  </div>
                </S.IntroSomRegisterCard>

                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img
                      style={{ marginRight: "6px", width: "22px", height: "13px" }}
                      src="/assets/icons/intro_member.png"
                      alt="인원수 아이콘"
                    />
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
                    <img
                      style={{
                        marginRight: "6px",
                        width: "20px",
                        height: "17px",
                      }}
                      src="/assets/icons/intro_image.png"
                      alt="이미지 아이콘"
                    />
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#757575" }}>
                      이미지 업로드
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "16px",
                          border: "1px dashed #0015FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          color: "#0015FF",
                          background: "#FFFFFF",
                        }}
                      >
                        + 추가
                      </div>
                      {[...Array(sampleImageCount)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "16px",
                            background:
                              "linear-gradient(135deg, #0015FF, #FF9EC7)",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                        fontSize: "13px",
                        color: "#A0A0C0",
                      }}
                    >
                      최대 5장까지 등록할 수 있으며, 첫 번째 이미지는 대표
                      이미지로 사용돼요.
                    </div>
                  </div>
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
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "24px",
                      background: "#ffffff",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      padding: "24px 28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        color: "#757575",
                      }}
                    >
                      <span>입력 정보 확인</span>
                      <span style={{ color: "#0015FF" }}>모두 입력 완료!</span>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        border: "1px soild #0015FF",
                        background: "#FFFFFF",
                        padding: "16px 18px",
                        fontSize: "13px",
                        color: "black",
                        lineHeight: 1.6,
                      }}
                    >
                      <p>제목: {sampleSomTitle}</p>
                      <p>카테고리: {sampleSomCategoryLabel}</p>
                      <p>장소: {sampleAddress}</p>
                      <p>
                        기간: {sampleStartDate} ~ {sampleEndDate}
                      </p>
                      <p>인원수: {sampleMemberCount}</p>
                    </div>

                    <button
                      type="button"
                      style={{
                        marginTop: "8px",
                        padding: "10px 26px",
                        borderRadius: "4px",
                        border: "none",
                        background:
                          "linear-gradient(135deg, #0015FF, #0015FF)",
                        color: "#ffffff",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: "default",
                      }}
                    >
                      저장하기
                    </button>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#A0A0C0",
                        textAlign: "center",
                      }}
                    >
                      저장 후에도 언제든지 내용을 수정할 수 있어요.
                    </div>
                  </div>
                </S.IntroSomRegisterCard>

                <S.IntroSomTextContainer2>
                  <S.IntroSomBlueText2>
                    <img
                      style={{ marginRight: "6px", width: "22px", height: "22px" }}
                      src="/assets/icons/intro_save.png"
                      alt="저장 아이콘"
                    />
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
