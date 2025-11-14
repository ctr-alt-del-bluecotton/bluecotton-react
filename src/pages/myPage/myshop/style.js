import styled from 'styled-components';
import * as C from "../../../styles/common"

const S = {};

S.ContentTitle = styled.h1`
  ${C.heading5}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 12px;
`;

S.ContentSubtitle = styled.p`
  ${C.subtitleRegular}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 32px;
`;

S.TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 50px;
`;

S.Tab = styled.button`
  aspect-ratio: 1;
  width: 100%;
  border-radius: 8px;
  border: none;
  ${C.smallText3Bold}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.white};
  /* background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.white}; */
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
  /* color: ${({ $active, theme }) => $active ? theme.PALLETE.white : theme.PALLETE.basic}; */
  box-shadow: ${props => props.active ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  /* box-shadow: ${({ $active }) => $active ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'}; */
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
     /* background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale0}; */
  }
`;

S.FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

S.FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  /* ${props => props.active ? C.smallText2Bold : C.smallText2Regular} */
  ${({ $active }) => $active ? C.smallText2Bold : C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  /* background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic}; */
  background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale0};
  color: ${({ $active, theme }) => $active ? theme.PALLETE.white : theme.PALLETE.basic};
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    /* background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale1}; */
    background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  }
`;

S.ListHeader = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 16px;
`;

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

S.ListItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.grey.greyScale0};
  }
`;

S.ItemType = styled.span`
  ${C.smallText2Bold}
  color: ${({ theme }) => theme.PALLETE.primary.main};
  margin-right: 8px;
`;

S.ItemTitle = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.basic};
  margin: 8px 0;
`;

S.ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  flex-wrap: wrap;
  gap: 8px;
`;

S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  ${C.smallText3Regular}
`;

S.PageButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.disabled ? '#BDBDBD' : '#111111'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${C.smallText3Regular}
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    /* color: ${props => props.disabled ? '#BDBDBD' : '${({ theme }) => theme.PALLETE.primary.main}'}; */
    color: ${({ disabled, theme }) => disabled ? '#BDBDBD' : theme.PALLETE.primary.main};
  }
`;

S.PageNumber = styled.span`
  ${C.smallText3Bold}
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
`;

S.ProductCard = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

S.ProductImage = styled.div`
  width: 100%;
  padding-top: 100%;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  position: relative;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

S.HeartIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${C.subtitleRegular}
  color: #FF6B6B;
  z-index: 10;
`;

S.ProductInfo = styled.div`
  padding: 16px;
`;

S.ProductName = styled.div`
  ${C.smallText3Bold}
  color: ${({ theme }) => theme.PALLETE.basic};
  margin-bottom: 4px;
`;

S.ProductPrice = styled.div`
  ${C.subtitleRegular}
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.Label = styled.span`
  display: inline-block;
  padding: 2px 8px;
  ${C.smallText1Bold}
  border-radius: 4px;
  margin-right: 4px;
  background-color: ${({ type, theme }) => type === 'BEST' ? '#FF6B6B' : theme.PALLETE.primary.main};
  color: white;
`;

S.Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${C.smallText2Regular}
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
  margin-top: 4px;
`;

S.Stars = styled.span`
  color: #FFD700;
`;

S.Likes = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.PALLETE.grey.greyScale4};
`;

S.CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

S.SelectAll = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${C.smallText2Regular}
`;

S.ResetButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  /* ${props => props.active ? C.smallText2Bold : C.smallText2Regular} */
  ${({ $active }) => $active ? C.smallText2Bold : C.smallText2Regular}
  cursor: pointer;
  transition: all 0.2s;
  /* background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale0};
  color: ${props => props.active ? props.theme.PALLETE.white : props.theme.PALLETE.basic};
   */
  background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale0};
  color: ${({ $active, theme }) => $active ? theme.PALLETE.white : theme.PALLETE.basic};

  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    /* background-color: ${props => props.active ? props.theme.PALLETE.primary.main : props.theme.PALLETE.grey.greyScale1}; */
     background-color: ${({ $active, theme }) => $active ? theme.PALLETE.primary.main : theme.PALLETE.grey.greyScale1};
  }
`;

S.CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  gap: 16px;
`;

S.ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #E0E0E0;
  border-radius: 8px;
`;

S.ItemInfo = styled.div`
  flex: 1;
`;

S.ItemName = styled.div`
  ${C.smallText3Bold}
  margin-bottom: 8px;
`;

S.QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 36px;
  border: 1px solid #E0E0E0;
  background-color: #fff;
  border-radius: 6px;
  margin-top: 8px;
  padding: 0 8px;
`;

S.QuantityButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  color: #666;
  ${C.smallText3Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover:not(:disabled) {
    color: #333;
  }
  
  &:disabled {
    color: #BDBDBD;
    cursor: not-allowed;
  }
`;

S.Quantity = styled.span`
  ${C.smallText3Regular}
  color: #333;
`;

S.PriceInfo = styled.div`
  text-align: right;
`;

S.PriceRow = styled.div`
  ${C.smallText2Regular}
  color: #757575;
  margin-bottom: 4px;
`;

S.PriceValue = styled.span`
  margin-left: 8px;
  ${C.smallText2Bold}
  color: #111111;
`;

S.OrderSummary = styled.div`
  background-color: #F9F9F9;
  padding: 24px;
  border-radius: 8px;
  margin-top: 32px;
  margin-bottom: 16px;
`;

S.SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  ${C.smallText2Regular}
  
  &:last-child {
    ${C.subtitleRegular}
    font-weight: 700;
    color: #0051FF;
    margin-bottom: 0;
  }
`;

S.OrderButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #0051FF;
  color: white;
  border: none;
  border-radius: 8px;
  ${C.subtitleRegular}
  font-weight: 700;
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  
  &:hover {
    background-color: #003BBF;
  }
`;

S.DeliveryItemImage = styled.div`
width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: #E0E0E0;
  margin-right: 16px;
  background-repeat: no-repeat;  
  background-position: center;   
  background-size: cover; 
`;

S.ActionButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: ${props => props.primary ? 'none' : '1px solid #E0E0E0'};
  background-color: ${props => props.primary ? '#0051FF' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#111111'};
  

  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#003DB8' : '#F5F5F5'};
     /* background-color: ${({ $primary }) => $primary ? '#003DB8' : '#F5F5F5'}; */
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;

S.OrderItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 16px;
  background-repeat: no-repeat;   
  background-position: center;    
  background-size: cover; 

  object-fit: cover;   
  object-position: center;
  display: block;
`;

S.ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

S.OrderProductName = styled.div`
  ${C.subtitleRegular}
  font-weight: 600;
  margin-bottom: 4px;
`;

S.PurchaseDate = styled.div`
  ${C.smallText2Regular}
  color: #757575;
`;

S.OrderActionButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background-color: #0051FF;
  color: #fff;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    background-color: #003BBF;
  }

  &:disabled {
  background-color: #e0e0e0;
  color: #BDBDBD;
  cursor: not-allowed;
  }
`;

S.ReviewProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

S.ReviewStars = styled.span`
  color: #FFD700;
  ${C.titleBold}
`;

S.ReviewDate = styled.div`
  ${C.smallText2Regular}
  color: #757575;
  margin-top: 4px;
`;

S.ReviewText = styled.div`
  ${C.smallText3Regular}
  color: #111111;
  margin-top: 8px;
`;

S.ReviewActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

S.ReviewButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  ${C.smallText2Regular}
  font-family: 'Daeojamjil', sans-serif;
  cursor: pointer;
  border: 1px solid ${props => props.primary ? '#0051FF' : '#E0E0E0'};
  background-color: ${props => props.primary ? '#0051FF' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#111111'};
   /* border: 1px solid ${({ $primary }) => $primary ? '#0051FF' : '#E0E0E0'};
 background-color: ${({ $primary }) => $primary ? '#0051FF' : '#fff'};
 color: ${({ $primary }) => $primary ? '#fff' : '#111111'}; */

  transition: all 0.2s;
  font-family: 'Daeojamjil', sans-serif;
  
  &:hover {
    background-color: ${props => props.primary ? '#003DB8' : '#F5F5F5'};
    border-color: ${props => props.primary ? '#003DB8' : '#E0E0E0'};
    /* background-color: ${({ $primary }) => $primary ? '#003DB8' : '#F5F5F5'};
   border-color: ${({ $primary }) => $primary ? '#003DB8' : '#E0E0E0'}; */
  }
`;


//  MyShopLikeContainer 스타일
S.LikeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  justify-content: flex-start;
`;

S.LikeCard = styled.div`
  width: calc((100% - 48px) / 4);
  position: relative;
`;

S.ProductImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 218 / 290;              
  background: ${({ $bg }) => `url(${$bg}) center/cover no-repeat`};
  border-radius: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.PALLETE.grey.greyScale1};
  transition: transform .2s;
`;

S.LikeHeartBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  font-family: 'Daeojamjil', sans-serif;

  /* 바깥 원 */
  background: url("/assets/icons/circle.svg") center/contain no-repeat;

  /* 안쪽 하트 아이콘 */
  &::after {
    content: "";
    display: block;
    width: 12px;
    height: 11px;
    margin: 0 auto;
    background: url("/assets/icons/favorite.svg") center/contain no-repeat;
  }

  /* 클릭시 하트 아이콘 */
  ${({ $active }) => $active && `
    &::after {
      background: url("/assets/icons/filedlike.svg") center/contain no-repeat;
    }
  `}
`;

S.ProductTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: nowrap;
`;

S.ProductShopName = styled.p`
  ${C.smallText1Bold}
  ${C.basic}
`;

S.NewTag = styled.span`
  ${C.smallText0Bold}
  padding: 1px 4px;
  display: inline-block;
  color: ${({ theme }) => theme.PALLETE.secondary.main};
  background-color: rgba(248, 59, 170, 0.1);
`;

S.BestTag = styled.span`
  ${C.smallText0Bold}
  padding: 1px 4px;
  display: inline-block;
  color: ${({ theme }) => theme.PALLETE.primary.main};
  background-color: rgba(0, 81, 255, 0.1);
`;

S.PriceText = styled.p`
  ${C.smallText1Bold}
  margin: 6px 0 8px;
`;

S.MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 6px;
`;

S.IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    width: 12px;
    height: 12px;
    object-fit: contain;
    vertical-align: middle;
  }

  span {
    ${C.smallText1Regular}
    ${C.basic}
  }
`;

S.Spacer = styled.span`
  margin-left: auto;
`;


// 커스텀 체크박스
S.Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 19px;
  height: 19px;
  border-radius: 1px;
  border: 1px solid ${({ theme }) => theme.PALLETE.grey.greyScale1};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
  vertical-align: middle;

  &:hover {
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
  }

  &:checked {
    background-color: ${({ theme }) => theme.PALLETE.primary.main};
    border-color: ${({ theme }) => theme.PALLETE.primary.main};
    background-image: url("/assets/icons/checkicon.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 11px 9px;
  }
`;

export default S;
