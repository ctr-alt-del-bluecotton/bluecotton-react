// style.js
import styled from "styled-components";
import { basic, primary } from "../../../styles/common";


export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 2000;
`;

export const Modal = styled.div`
  width: 420px;
  height: 640px;
  max-width: 100%;
  background: #fff;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.div`
  position: relative;
  display:flex;
  justify-content: center;
  align-items:center;

  h2 { color:#2560ff; font-size:22px; margin:0; }
  .close { background:transparent; border:0; font-size:18px; cursor:pointer; }

  img {
    position: absolute;
    right: 0;
    top: 5%;
    width: 13px;
    height: 13px;
    cursor: pointer;
  }
`;

export const AddBtn = styled.button`
  width:100%;
  padding:12px 16px;
  border-radius:8px;
  border:1px solid #e5e5e5;
  background:#fff;
  cursor:pointer;
  font-weight:600;
`;

export const List = styled.div`
  display:flex;
  flex-direction: column;
  gap:14px;
  max-height: 420px;
  overflow:auto;
  padding-right:8px;
`;

export const Item = styled.div`
  display:flex;
  gap:12px;
  align-items:flex-start;
  padding:12px;
  border-radius:10px;
  border: 1px solid #f0f0f0;
`;

export const RadioWrap = styled.label`
  display:flex;
  align-items:flex-start;

  input {
    width:18px;
    height:18px;
    margin-top:4px;
    accent-color: #0015FF;
  }
`;

export const Content = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  gap:8px;
`;

export const Row = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
`;

export const Name = styled.div`
  font-weight:700;
  font-size:15px;
  color:#222;
`;

export const Phone = styled.div`
  font-size:14px;
  color:#666; 
`;

export const Address = styled.div`
  font-size:14px;
  color:#444;
  line-height:1.3;
`;

export const Actions = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
  margin-top:6px;
`;

export const Tag = styled.span`
  background:#f5f5f7;
  color:#999;
  padding:4px 8px;
  border-radius:12px;
  font-size:12px;
`;

export const ActionButton = styled.button`
  padding:6px 10px;
  border-radius:8px;
  border:1px solid #ddd;
  background:#fff;
  cursor:pointer;
  font-size:13px;
`;

export const DeleteButton = styled(ActionButton)`
  border-color:#f1c0c0;
  color:#c33;
`;

export const Footer = styled.div`
  margin-top:5%;
  display:flex;
  justify-content:center;
`;

export const ConfirmButton = styled.button`
  width:90%;
  padding:12px 16px;
  border-radius:4px;
  border:0;
  background: ${p => (p.disabled ? "#e6e6e6" : "#0015FF")};
  color: ${p => (p.disabled ? "#9b9b9b" : "#fff")};
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  font-weight:700;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormTitle = styled.h3`
  margin: 0 0 4px;
  text-align: center;
  font-size: 20px;
  color: #0015FF;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${basic};
  /* font-weight: 600; */
`;

export const Input = styled.input`
  width: 400px;
  height: 44px;
  padding: 0 14px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #FFFFFF;
  outline: none;
  font-size: 14px;
  color: ${basic};
  font-family: inherit;

  &::placeholder { color: #bdbdbd; }

  &:focus {
    border-color: #0033A3;
    
  }
`;

export const ZipRow = styled.div`
  display: flex;
  width: 560px;
  gap: 10px;
`;

export const SearchBtn = styled.button`
  height: 44px;
  width: 120px;
  border-radius: 4px;
  border: 0;
  background: #0015FF;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;

  &:hover { filter: brightness(0.95); }
  &:active { transform: translateY(1px); }
`;

export const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #444;

  input {
    width: 16px;
    height: 16px;
    accent-color: #0015FF;
  }
`;

export const ButtonRow = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 10px;
`;

export const GhostButton = styled.button`
  width: 300px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  background: #fff;
  font-weight: 700;
  color: ${basic};
  cursor: pointer;
`;

export const PrimaryButton = styled.button`
  width: 300px;
  height: 48px;
  border-radius: 4px;
  border: 0;
  background: #0015FF;
  color: #fff;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    background: #E0E0E0;
    color: #BDBDBD;
    cursor: not-allowed;
  }
`;

export const InputOther = styled.input `
  width: 265px;
  height: 44px;
  padding: 0 14px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #FFFFFF;
  outline: none;
  font-size: 14px;
  color: ${basic};

  &::placeholder { color: #bdbdbd; }

  &:focus {
    border-color: #0033A3;
    
  }
`
