import React from "react";
import S from "./style";

const IntroWhatIsSom = () => {


    return (
        <S.WhatIsSomWrap>
            <S.WhatIsSomContainer>
                <S.WhatIsSomImg src="/assets/images/intro_banner.png"  alt="솜이란?이미지"/>
                <S.WhatIsSomTextContainer>
                    <S.WhatIsSomText1>
                        부드럽지만 <S.WhatIsSomBlueText1>단단한</S.WhatIsSomBlueText1> 우리의 도전
                    </S.WhatIsSomText1>
                    <S.WhatIsSomText2>
                        <S.WhatIsSomBlueText2>솜</S.WhatIsSomBlueText2>이란?
                    </S.WhatIsSomText2>
                    <S.WhatIsSomBlueText3>
                        작은 열정들이 모여 서로를 감싸고 다독이는 순간,
                        <p>그 힘은 목표를 향해 나아가는 에너지가 됩니다.</p>
                        <p>따뜻한 과정을 우리는 '솜'이라고 합니다.</p>
                    </S.WhatIsSomBlueText3>
                </S.WhatIsSomTextContainer>
            </S.WhatIsSomContainer>
        </S.WhatIsSomWrap>
    );
};

export default IntroWhatIsSom;