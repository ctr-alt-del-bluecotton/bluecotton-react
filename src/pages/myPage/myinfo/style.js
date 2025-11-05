import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 800px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale3};
  margin-bottom: 40px;
`;

export const FormSection = styled.div`
  margin-bottom: 40px;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
`;

export const PrimaryButton = styled.button`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  width: 140px;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

export const DateRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
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

export const ImagePreview = styled.div`
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

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin-bottom: 8px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.dark};
  }
`;

export const DeleteButton = styled(SubmitButton)`
  background-color: ${({ theme }) => theme.PALLETE.warning};
  
  &:hover {
    opacity: 0.9;
  }
`;

