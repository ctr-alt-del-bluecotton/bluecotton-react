import styled from "styled-components";

import { flexCenterColumn } from '../../../../../../styles/common';

const S = {};

S.memberInfoContainer = styled.div`
    ${flexCenterColumn}
    gap: 10px;
`

S.memberInfoIamge = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale3};
`

S.memberInfoName = styled.div`

`


export default S;