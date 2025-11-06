import styled from 'styled-components';
import * as C from '../../../styles/common';

const S = {};

S.FormContainer = styled.div`
  max-width: 800px;
`;

S.Title = styled.h1`
  ${C.heading5}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 12px;
`;

S.Subtitle = styled.p`
  ${C.subtitleRegular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-bottom: 40px;
`;

S.FormSection = styled.div`
  margin-bottom: 40px;
`;

S.Label = styled.label`
  display: block;
  ${C.subtitleRegular}
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 14px;
`;

S.Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  ${C.smallText3Regular}
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
`;

S.PrimaryButton = styled.button`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  border-radius: 8px;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  width: 140px;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

S.DateRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

S.Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  ${C.smallText3Regular}
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

S.RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

S.RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${C.smallText3Regular}
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    &:checked {
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
    }

    &:hover {
      border-color: ${({ theme }) => theme.PALLETE.primary.main};
    }
  }
`;

S.ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  border: 2px dashed ${({ theme, $hasImage }) => $hasImage ? 'transparent' : theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $hasImage }) => $hasImage ? 'transparent' : theme.PALLETE.grey.greyScale0};
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    background-color: ${({ theme, $hasImage }) => $hasImage ? 'transparent' : theme.PALLETE.grey.greyScale0};
    opacity: ${({ $hasImage }) => $hasImage ? 0.9 : 1};
  }
`;

S.HiddenFileInput = styled.input`
  display: none;
`;

S.FileInfo = styled.div`
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin-bottom: 8px;
`;

S.ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

S.SubmitButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  border-radius: 8px;
  ${C.subtitleRegular}
  font-weight: 700;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

S.DeleteButton = styled(S.SubmitButton)`
  background-color: ${({ theme }) => theme.PALLETE.warning};
  
  &:hover {
    opacity: 0.9;
  }
`;

export default S;

