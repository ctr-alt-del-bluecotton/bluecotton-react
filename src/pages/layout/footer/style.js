import styled from "styled-components";
import { backgroundGreyScale0, basic, fontGreyScale0, fontGreyScale3, primary, smallText1Light, smallText3Light, smallText3Thin } from "../../../styles/common";

const S = {};

S.Wrapper = styled.div `
    width: 100%;
    height: 300px;
    ${backgroundGreyScale0};
`

S.Container = styled.div `
    max-width: 1920px;
    margin: 0 auto;
    padding: 48px 20px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

S.Text1 = styled.div `
    ${basic}
    ${smallText3Light}
    & > p {
        margin-bottom: 6px;
    }

    & > p:first-child {
        margin-bottom: 20px;
    }
    margin-right: 250px;
`

S.Text1Blue = styled.span `
    ${primary}
    ${smallText3Light}
`

S.Text2 = styled.div `
    ${basic}
    ${smallText3Thin}
    & > p {
        margin-bottom: 10px;
    }

    & > p:first-child {
        margin-bottom: 20px;
    }

    gap: 10px;
`

S.Text3 = styled.div `
    ${fontGreyScale3}
    ${smallText1Light}
`

S.BottomContainer = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
`
S.IconContainer = styled.div `
    display: flex;
    /* justify-content: center; */
    align-items: center;
    
`

export default S;