import styled from "styled-components";

import { subtitle, smallText3Regular, smallText3Light } from '../../../../../../styles/common';

const S = {};

S.somMemberListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
`

S.somMemberListTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    margin-bottom: 20px;
`

S.somMemberListCountWrap = styled.div`
    display: flex;
    justify-content: start;
    gap: 10px;
`

S.somMemberCount = styled.div`
    ${smallText3Regular}
`

S.somMemberListTitle = styled.div`
    ${subtitle}

`

S.somMemberListCotext = styled.div`
    ${smallText3Light}
    color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
`

S.somMemberListContents = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`

export default S;