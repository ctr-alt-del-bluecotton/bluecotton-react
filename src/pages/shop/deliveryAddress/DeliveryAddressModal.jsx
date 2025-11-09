// DeliveryAddressModal.jsx
import React, { useMemo, useRef, useState } from "react";
import * as S from "./style";
import AddressForm from "./DeliveryAddressForm"; // ← 폼 임포트

const SAMPLE_ADDRESSES = [
  { id: 1, name: "최준서", phone: "010-1234-1234", addr1: "서울 서초구 강남대로 48-6 (한석빌딩)", addr2: "123", isDefault: true },
  { id: 2, name: "홍길동", phone: "010-9876-5432", addr1: "경기 화성시 동탄문화센터로", addr2: "123-12", isDefault: false },
];

export default function DeliveryAddressModal({ open, onClose, onEditAddress, onConfirm }) {
  const [addresses, setAddresses] = useState(SAMPLE_ADDRESSES);
  const [selectedId, setSelectedId] = useState(addresses.find(a => a.isDefault)?.id ?? null);


  const [mode, setMode] = useState("list"); 
  const [editing, setEditing] = useState(null); 
  

  const nextIdRef = useRef(Math.max(...addresses.map(a => a.id)) + 1);

  if (!open) return null;

  const handleSelect = (id) => setSelectedId(id);

  const openCreate = () => {
    setEditing(null);
    setMode("create");
  };

  const openEdit = (addr) => {
    setEditing(addr);
    setMode("edit");
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(p => p.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  
  const applyDefaultNormalization = (list, defaultId) =>
    list.map(item => ({ ...item, isDefault: item.id === defaultId }));

  
  const handleSubmitForm = (values) => {
    if (mode === "create") {
      const newId = nextIdRef.current++;
      const newItem = { ...values, id: newId };

      let updated = [...addresses, newItem];
      if (newItem.isDefault) updated = applyDefaultNormalization(updated, newId);

      setAddresses(updated);
      setSelectedId(newId);
    } else if (mode === "edit" && editing) {
      let updated = addresses.map(a => (a.id === editing.id ? { ...a, ...values, id: editing.id } : a));
      if (values.isDefault) updated = applyDefaultNormalization(updated, editing.id);

      setAddresses(updated);
      if (selectedId === editing.id || values.isDefault) setSelectedId(editing.id);
    }

    setMode("list");
    setEditing(null);
  };

  const handleCancelForm = () => {
    setMode("list");
    setEditing(null);
  };

  
  const ListView = (
    <>
      <S.Header>
        <h2>배송지 정보</h2>
        <img src="/assets/icons/close.svg" alt="닫기 아이콘" onClick={onClose} />
      </S.Header>

      <S.AddBtn type="button" onClick={openCreate}>
        배송지 추가하기
      </S.AddBtn>

      <S.List>
        {addresses.map(addr => (
          <S.Item key={addr.id}>
            <S.RadioWrap>
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedId === addr.id}
                onChange={() => handleSelect(addr.id)}
                id={`addr-${addr.id}`}
              />
            </S.RadioWrap>

            <S.Content>
              <S.Row>
                <S.Name>{addr.name}</S.Name>
                <S.Phone>{addr.phone}</S.Phone>
              </S.Row>

              <S.Address>{`${addr.addr1} ${addr.addr2 ?? ""}`}</S.Address>

              <S.Actions>
                {addr.isDefault && <S.Tag>기본 배송지</S.Tag>}
                <S.ActionButton type="button" onClick={() => openEdit(addr)}>수정</S.ActionButton>
                <S.DeleteButton type="button" onClick={() => handleDelete(addr.id)}>삭제</S.DeleteButton>
              </S.Actions>
            </S.Content>
          </S.Item>
        ))}
      </S.List>

      <S.Footer>
        <S.ConfirmButton
          disabled={!selectedId}
          onClick={() => onConfirm && onConfirm(selectedId)}
        >
          변경하기
        </S.ConfirmButton>
      </S.Footer>
    </>
  );

  
  const FormView = (
    <>
      <S.Header>
        <h2>{mode === "create" ? "배송지 추가" : "배송지 수정"}</h2>
        <img src="/assets/icons/close.svg" alt="닫기 아이콘" onClick={onClose} />
      </S.Header>

      <AddressForm
        defaultValues={mode === "edit" ? editing : {}}
        onSubmit={handleSubmitForm}
        onCancel={handleCancelForm}
        submitText={mode === "create" ? "저장하기" : "수정 완료"}
      />
    </>
  );

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        {mode === "list" ? ListView : FormView}
      </S.Modal>
    </S.Overlay>
  );
}
