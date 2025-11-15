// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import S from './style';

// const OrderManagementContainer = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('orders');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // 더미 데이터 - 주문
//   const orders = [
//     { id: 1, orderNumber: 'ORD-001', user: 'user1', product: '블루코튼 티셔츠', quantity: 2, total: 50000, status: 'pending', orderDate: '2024-12-10' },
//     { id: 2, orderNumber: 'ORD-002', user: 'user2', product: '블루코튼 후드', quantity: 1, total: 80000, status: 'shipped', orderDate: '2024-12-09' },
//     { id: 3, orderNumber: 'ORD-003', user: 'user3', product: '블루코튼 캡', quantity: 3, total: 45000, status: 'delivered', orderDate: '2024-12-08' },
//     { id: 4, orderNumber: 'ORD-004', user: 'user4', product: '블루코튼 가방', quantity: 1, total: 60000, status: 'pending', orderDate: '2024-12-11' },
//   ];

//   // 더미 데이터 - 상품
//   const products = [
//     { id: 1, name: '블루코튼 티셔츠', price: 25000, stock: 50, category: '의류', status: 'active', createDate: '2024-11-01' },
//     { id: 2, name: '블루코튼 후드', price: 80000, stock: 30, category: '의류', status: 'active', createDate: '2024-11-05' },
//     { id: 3, name: '블루코튼 캡', price: 15000, stock: 100, category: '악세서리', status: 'active', createDate: '2024-11-10' },
//     { id: 4, name: '블루코튼 가방', price: 60000, stock: 20, category: '악세서리', status: 'inactive', createDate: '2024-11-15' },
//   ];

//   // 더미 데이터 - 배송 관리
//   const deliveries = [
//     { id: 1, orderNumber: 'ORD-001', orderId: 1, user: 'user1', product: '블루코튼 티셔츠', trackingNumber: '1234567890', address: '서울시 강남구 테헤란로 123', status: 'preparing', shipDate: null, deliveryDate: null },
//     { id: 2, orderNumber: 'ORD-002', orderId: 2, user: 'user2', product: '블루코튼 후드', trackingNumber: '0987654321', address: '서울시 서초구 서초대로 456', status: 'shipped', shipDate: '2024-12-09', deliveryDate: null },
//     { id: 3, orderNumber: 'ORD-003', orderId: 3, user: 'user3', product: '블루코튼 캡', trackingNumber: '1122334455', address: '서울시 송파구 올림픽로 789', status: 'delivered', shipDate: '2024-12-08', deliveryDate: '2024-12-10' },
//     { id: 4, orderNumber: 'ORD-004', orderId: 4, user: 'user4', product: '블루코튼 가방', trackingNumber: null, address: '서울시 마포구 홍대로 321', status: 'preparing', shipDate: null, deliveryDate: null },
//   ];

//   // 더미 데이터 - 리뷰 신고
//   const reviewReports = [
//     { id: 1, reviewId: 101, orderId: 3, orderNumber: 'ORD-003', product: '블루코튼 캡', reviewContent: '부적절한 리뷰 내용입니다...', rating: 1, reportedUser: 'user3', reporter: 'user100', reason: '허위 리뷰', reportDate: '2024-12-10', status: 'pending' },
//     { id: 2, reviewId: 102, orderId: 2, orderNumber: 'ORD-002', product: '블루코튼 후드', reviewContent: '욕설이 포함된 리뷰', rating: 2, reportedUser: 'user2', reporter: 'user101', reason: '욕설/비방', reportDate: '2024-12-09', status: 'pending' },
//     { id: 3, reviewId: 103, orderId: 1, orderNumber: 'ORD-001', product: '블루코튼 티셔츠', reviewContent: '스팸 리뷰', rating: 5, reportedUser: 'user1', reporter: 'user102', reason: '스팸', reportDate: '2024-12-08', status: 'resolved' },
//   ];

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.product.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const filteredProducts = products.filter(product => {
//     return product.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   const filteredDeliveries = deliveries.filter(delivery => {
//     const matchesSearch = delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          delivery.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          delivery.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (delivery.trackingNumber && delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesFilter = filterStatus === 'all' || delivery.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const filteredReviewReports = reviewReports.filter(report => {
//     const matchesSearch = report.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          report.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          report.reviewContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const handleOrderStatusChange = (orderId, newStatus) => {
//     console.log(`주문 ${orderId} 상태 변경: ${newStatus}`);
//     // TODO: API 호출
//   };

//   const handleProductStatusChange = (productId, newStatus) => {
//     console.log(`상품 ${productId} 상태 변경: ${newStatus}`);
//     // TODO: API 호출
//   };

//   const handleAddProduct = () => {
//     console.log('상품 등록 모달 열기');
//     // TODO: 상품 등록 모달 구현
//   };

//   const handleDeliveryStatusChange = (deliveryId, newStatus) => {
//     console.log(`배송 ${deliveryId} 상태 변경: ${newStatus}`);
//     // TODO: API 호출
//   };

//   const handleTrackingNumberUpdate = (deliveryId, trackingNumber) => {
//     console.log(`배송 ${deliveryId} 추적번호 업데이트: ${trackingNumber}`);
//     // TODO: API 호출
//   };

//   const handleReviewReportResolve = (reportId) => {
//     console.log(`리뷰 신고 ${reportId} 처리 완료`);
//     // TODO: API 호출
//   };

//   const handleReviewDelete = (reviewId) => {
//     console.log(`리뷰 ${reviewId} 삭제`);
//     // TODO: API 호출
//   };

//   return (
//     <S.ManagerWrapper>
//       <S.ManagerContainer>
//         <S.Header>
//           <S.BackButton onClick={() => navigate('/main/manager')}>← 뒤로가기</S.BackButton>
//           <S.Title>주문 관리</S.Title>
//           <S.Subtitle>주문 및 상품 관리</S.Subtitle>
//         </S.Header>

//         <S.TabContainer>
//           <S.TabButton $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
//             주문 관리
//           </S.TabButton>
//           <S.TabButton $active={activeTab === 'deliveries'} onClick={() => setActiveTab('deliveries')}>
//             배송 관리
//           </S.TabButton>
//           <S.TabButton $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
//             상품 등록/관리
//           </S.TabButton>
//           <S.TabButton $active={activeTab === 'reviewReports'} onClick={() => setActiveTab('reviewReports')}>
//             리뷰 신고
//           </S.TabButton>
//         </S.TabContainer>

//         {activeTab === 'orders' && (
//           <S.ContentSection>
//             <S.FilterBar>
//               <S.SearchInput
//                 type="text"
//                 placeholder="주문번호, 사용자, 상품명으로 검색..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//                 <option value="all">전체 상태</option>
//                 <option value="pending">대기중</option>
//                 <option value="shipped">배송중</option>
//                 <option value="delivered">배송완료</option>
//                 <option value="cancelled">취소됨</option>
//               </S.FilterSelect>
//             </S.FilterBar>

//             <S.Table>
//               <S.TableHeader>
//                 <S.TableRow>
//                   <S.TableHeaderCell>주문번호</S.TableHeaderCell>
//                   <S.TableHeaderCell>사용자</S.TableHeaderCell>
//                   <S.TableHeaderCell>상품</S.TableHeaderCell>
//                   <S.TableHeaderCell>수량</S.TableHeaderCell>
//                   <S.TableHeaderCell>총액</S.TableHeaderCell>
//                   <S.TableHeaderCell>상태</S.TableHeaderCell>
//                   <S.TableHeaderCell>주문일</S.TableHeaderCell>
//                   <S.TableHeaderCell>작업</S.TableHeaderCell>
//                 </S.TableRow>
//               </S.TableHeader>
//               <tbody>
//                 {filteredOrders.map((order) => (
//                   <S.TableRow key={order.id}>
//                     <S.TableCell>{order.orderNumber}</S.TableCell>
//                     <S.TableCell>{order.user}</S.TableCell>
//                     <S.TableCell>{order.product}</S.TableCell>
//                     <S.TableCell>{order.quantity}</S.TableCell>
//                     <S.TableCell>{order.total.toLocaleString()}원</S.TableCell>
//                     <S.TableCell>
//                       <S.StatusBadge $status={order.status}>
//                         {order.status === 'pending' ? '대기중' :
//                          order.status === 'shipped' ? '배송중' :
//                          order.status === 'delivered' ? '배송완료' : '취소됨'}
//                       </S.StatusBadge>
//                     </S.TableCell>
//                     <S.TableCell>{order.orderDate}</S.TableCell>
//                     <S.TableCell>
//                       <S.ButtonGroup>
//                         <S.Button
//                           onClick={() => handleOrderStatusChange(order.id, 'shipped')}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                           disabled={order.status !== 'pending'}
//                         >
//                           배송시작
//                         </S.Button>
//                         <S.SecondaryButton
//                           onClick={() => console.log(`주문 ${order.id} 상세보기`)}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                         >
//                           상세
//                         </S.SecondaryButton>
//                       </S.ButtonGroup>
//                     </S.TableCell>
//                   </S.TableRow>
//                 ))}
//               </tbody>
//             </S.Table>
//           </S.ContentSection>
//         )}

//         {activeTab === 'deliveries' && (
//           <S.ContentSection>
//             <S.FilterBar>
//               <S.SearchInput
//                 type="text"
//                 placeholder="주문번호, 사용자, 상품명, 추적번호로 검색..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//                 <option value="all">전체 상태</option>
//                 <option value="preparing">준비중</option>
//                 <option value="shipped">배송중</option>
//                 <option value="delivered">배송완료</option>
//               </S.FilterSelect>
//             </S.FilterBar>

//             <S.Table>
//               <S.TableHeader>
//                 <S.TableRow>
//                   <S.TableHeaderCell>배송 ID</S.TableHeaderCell>
//                   <S.TableHeaderCell>주문번호</S.TableHeaderCell>
//                   <S.TableHeaderCell>사용자</S.TableHeaderCell>
//                   <S.TableHeaderCell>상품</S.TableHeaderCell>
//                   <S.TableHeaderCell>배송 주소</S.TableHeaderCell>
//                   <S.TableHeaderCell>추적번호</S.TableHeaderCell>
//                   <S.TableHeaderCell>상태</S.TableHeaderCell>
//                   <S.TableHeaderCell>발송일</S.TableHeaderCell>
//                   <S.TableHeaderCell>배송완료일</S.TableHeaderCell>
//                   <S.TableHeaderCell>작업</S.TableHeaderCell>
//                 </S.TableRow>
//               </S.TableHeader>
//               <tbody>
//                 {filteredDeliveries.map((delivery) => (
//                   <S.TableRow key={delivery.id}>
//                     <S.TableCell>{delivery.id}</S.TableCell>
//                     <S.TableCell>{delivery.orderNumber}</S.TableCell>
//                     <S.TableCell>{delivery.user}</S.TableCell>
//                     <S.TableCell>{delivery.product}</S.TableCell>
//                     <S.TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                       {delivery.address}
//                     </S.TableCell>
//                     <S.TableCell>{delivery.trackingNumber || '-'}</S.TableCell>
//                     <S.TableCell>
//                       <S.StatusBadge $status={delivery.status}>
//                         {delivery.status === 'preparing' ? '준비중' :
//                          delivery.status === 'shipped' ? '배송중' : '배송완료'}
//                       </S.StatusBadge>
//                     </S.TableCell>
//                     <S.TableCell>{delivery.shipDate || '-'}</S.TableCell>
//                     <S.TableCell>{delivery.deliveryDate || '-'}</S.TableCell>
//                     <S.TableCell>
//                       <S.ButtonGroup>
//                         {delivery.status === 'preparing' && (
//                           <S.Button
//                             onClick={() => handleDeliveryStatusChange(delivery.id, 'shipped')}
//                             style={{ padding: '6px 12px', fontSize: '12px' }}
//                           >
//                             배송시작
//                           </S.Button>
//                         )}
//                         {delivery.status === 'shipped' && (
//                           <S.Button
//                             onClick={() => handleDeliveryStatusChange(delivery.id, 'delivered')}
//                             style={{ padding: '6px 12px', fontSize: '12px' }}
//                           >
//                             배송완료
//                           </S.Button>
//                         )}
//                         <S.SecondaryButton
//                           onClick={() => {
//                             const trackingNumber = prompt('추적번호를 입력하세요:');
//                             if (trackingNumber) {
//                               handleTrackingNumberUpdate(delivery.id, trackingNumber);
//                             }
//                           }}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                         >
//                           추적번호 입력
//                         </S.SecondaryButton>
//                       </S.ButtonGroup>
//                     </S.TableCell>
//                   </S.TableRow>
//                 ))}
//               </tbody>
//             </S.Table>
//           </S.ContentSection>
//         )}

//         {activeTab === 'products' && (
//           <S.ContentSection>
//             <S.FilterBar>
//               <S.SearchInput
//                 type="text"
//                 placeholder="상품명으로 검색..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <S.Button onClick={handleAddProduct} style={{ marginLeft: '12px' }}>
//                 + 상품 등록
//               </S.Button>
//             </S.FilterBar>

//             <S.Table>
//               <S.TableHeader>
//                 <S.TableRow>
//                   <S.TableHeaderCell>ID</S.TableHeaderCell>
//                   <S.TableHeaderCell>상품명</S.TableHeaderCell>
//                   <S.TableHeaderCell>가격</S.TableHeaderCell>
//                   <S.TableHeaderCell>재고</S.TableHeaderCell>
//                   <S.TableHeaderCell>카테고리</S.TableHeaderCell>
//                   <S.TableHeaderCell>상태</S.TableHeaderCell>
//                   <S.TableHeaderCell>등록일</S.TableHeaderCell>
//                   <S.TableHeaderCell>작업</S.TableHeaderCell>
//                 </S.TableRow>
//               </S.TableHeader>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <S.TableRow key={product.id}>
//                     <S.TableCell>{product.id}</S.TableCell>
//                     <S.TableCell>{product.name}</S.TableCell>
//                     <S.TableCell>{product.price.toLocaleString()}원</S.TableCell>
//                     <S.TableCell>{product.stock}개</S.TableCell>
//                     <S.TableCell>{product.category}</S.TableCell>
//                     <S.TableCell>
//                       <S.StatusBadge $status={product.status}>
//                         {product.status === 'active' ? '판매중' : '판매중지'}
//                       </S.StatusBadge>
//                     </S.TableCell>
//                     <S.TableCell>{product.createDate}</S.TableCell>
//                     <S.TableCell>
//                       <S.ButtonGroup>
//                         <S.Button
//                           onClick={() => console.log(`상품 ${product.id} 수정`)}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                         >
//                           수정
//                         </S.Button>
//                         <S.SecondaryButton
//                           onClick={() => handleProductStatusChange(product.id, product.status === 'active' ? 'inactive' : 'active')}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                         >
//                           {product.status === 'active' ? '판매중지' : '판매재개'}
//                         </S.SecondaryButton>
//                       </S.ButtonGroup>
//                     </S.TableCell>
//                   </S.TableRow>
//                 ))}
//               </tbody>
//             </S.Table>
//           </S.ContentSection>
//         )}

//         {activeTab === 'reviewReports' && (
//           <S.ContentSection>
//             <S.FilterBar>
//               <S.SearchInput
//                 type="text"
//                 placeholder="주문번호, 상품명, 리뷰 내용, 신고자, 피신고자로 검색..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <S.FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//                 <option value="all">전체 상태</option>
//                 <option value="pending">대기중</option>
//                 <option value="resolved">처리완료</option>
//               </S.FilterSelect>
//             </S.FilterBar>

//             <S.Table>
//               <S.TableHeader>
//                 <S.TableRow>
//                   <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
//                   <S.TableHeaderCell>리뷰 ID</S.TableHeaderCell>
//                   <S.TableHeaderCell>주문번호</S.TableHeaderCell>
//                   <S.TableHeaderCell>상품</S.TableHeaderCell>
//                   <S.TableHeaderCell>리뷰 내용</S.TableHeaderCell>
//                   <S.TableHeaderCell>평점</S.TableHeaderCell>
//                   <S.TableHeaderCell>피신고자</S.TableHeaderCell>
//                   <S.TableHeaderCell>신고자</S.TableHeaderCell>
//                   <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
//                   <S.TableHeaderCell>신고일</S.TableHeaderCell>
//                   <S.TableHeaderCell>상태</S.TableHeaderCell>
//                   <S.TableHeaderCell>작업</S.TableHeaderCell>
//                 </S.TableRow>
//               </S.TableHeader>
//               <tbody>
//                 {filteredReviewReports.map((report) => (
//                   <S.TableRow key={report.id}>
//                     <S.TableCell>{report.id}</S.TableCell>
//                     <S.TableCell>{report.reviewId}</S.TableCell>
//                     <S.TableCell>{report.orderNumber}</S.TableCell>
//                     <S.TableCell>{report.product}</S.TableCell>
//                     <S.TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                       {report.reviewContent}
//                     </S.TableCell>
//                     <S.TableCell>{'⭐'.repeat(report.rating)}</S.TableCell>
//                     <S.TableCell>{report.reportedUser}</S.TableCell>
//                     <S.TableCell>{report.reporter}</S.TableCell>
//                     <S.TableCell>{report.reason}</S.TableCell>
//                     <S.TableCell>{report.reportDate}</S.TableCell>
//                     <S.TableCell>
//                       <S.StatusBadge $status={report.status}>
//                         {report.status === 'pending' ? '대기중' : '처리완료'}
//                       </S.StatusBadge>
//                     </S.TableCell>
//                     <S.TableCell>
//                       <S.ButtonGroup>
//                         <S.Button
//                           onClick={() => handleReviewReportResolve(report.id)}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                           disabled={report.status === 'resolved'}
//                         >
//                           처리
//                         </S.Button>
//                         <S.SecondaryButton
//                           onClick={() => handleReviewDelete(report.reviewId)}
//                           style={{ padding: '6px 12px', fontSize: '12px' }}
//                         >
//                           삭제
//                         </S.SecondaryButton>
//                       </S.ButtonGroup>
//                     </S.TableCell>
//                   </S.TableRow>
//                 ))}
//               </tbody>
//             </S.Table>
//           </S.ContentSection>
//         )}
//       </S.ManagerContainer>
//     </S.ManagerWrapper>
//   );
// };

// export default OrderManagementContainer;


// src/pages/manager/order/OrderManagementContainer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";
import AdminDashboard from "./AdminDashboard";

const OrderManagementContainer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // 기본: 대시보드
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 더미 데이터 - 주문
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      user: "user1",
      product: "블루코튼 티셔츠",
      quantity: 2,
      total: 50000,
      status: "pending",
      orderDate: "2024-12-10",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      user: "user2",
      product: "블루코튼 후드",
      quantity: 1,
      total: 80000,
      status: "shipped",
      orderDate: "2024-12-09",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      user: "user3",
      product: "블루코튼 캡",
      quantity: 3,
      total: 45000,
      status: "delivered",
      orderDate: "2024-12-08",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      user: "user4",
      product: "블루코튼 가방",
      quantity: 1,
      total: 60000,
      status: "pending",
      orderDate: "2024-12-11",
    },
  ];

  // 더미 데이터 - 상품
  const products = [
    {
      id: 1,
      name: "블루코튼 티셔츠",
      price: 25000,
      stock: 50,
      category: "의류",
      status: "active",
      createDate: "2024-11-01",
    },
    {
      id: 2,
      name: "블루코튼 후드",
      price: 80000,
      stock: 30,
      category: "의류",
      status: "active",
      createDate: "2024-11-05",
    },
    {
      id: 3,
      name: "블루코튼 캡",
      price: 15000,
      stock: 100,
      category: "악세서리",
      status: "active",
      createDate: "2024-11-10",
    },
    {
      id: 4,
      name: "블루코튼 가방",
      price: 60000,
      stock: 20,
      category: "악세서리",
      status: "inactive",
      createDate: "2024-11-15",
    },
  ];

  // 더미 데이터 - 배송 관리
  const deliveries = [
    {
      id: 1,
      orderNumber: "ORD-001",
      orderId: 1,
      user: "user1",
      product: "블루코튼 티셔츠",
      trackingNumber: "1234567890",
      address: "서울시 강남구 테헤란로 123",
      status: "preparing",
      shipDate: null,
      deliveryDate: null,
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      orderId: 2,
      user: "user2",
      product: "블루코튼 후드",
      trackingNumber: "0987654321",
      address: "서울시 서초구 서초대로 456",
      status: "shipped",
      shipDate: "2024-12-09",
      deliveryDate: null,
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      orderId: 3,
      user: "user3",
      product: "블루코튼 캡",
      trackingNumber: "1122334455",
      address: "서울시 송파구 올림픽로 789",
      status: "delivered",
      shipDate: "2024-12-08",
      deliveryDate: "2024-12-10",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      orderId: 4,
      user: "user4",
      product: "블루코튼 가방",
      trackingNumber: null,
      address: "서울시 마포구 홍대로 321",
      status: "preparing",
      shipDate: null,
      deliveryDate: null,
    },
  ];

  // 더미 데이터 - 리뷰 신고
  const reviewReports = [
    {
      id: 1,
      reviewId: 101,
      orderId: 3,
      orderNumber: "ORD-003",
      product: "블루코튼 캡",
      reviewContent: "부적절한 리뷰 내용입니다...",
      rating: 1,
      reportedUser: "user3",
      reporter: "user100",
      reason: "허위 리뷰",
      reportDate: "2024-12-10",
      status: "pending",
    },
    {
      id: 2,
      reviewId: 102,
      orderId: 2,
      orderNumber: "ORD-002",
      product: "블루코튼 후드",
      reviewContent: "욕설이 포함된 리뷰",
      rating: 2,
      reportedUser: "user2",
      reporter: "user101",
      reason: "욕설/비방",
      reportDate: "2024-12-09",
      status: "pending",
    },
    {
      id: 3,
      reviewId: 103,
      orderId: 1,
      orderNumber: "ORD-001",
      product: "블루코튼 티셔츠",
      reviewContent: "스팸 리뷰",
      rating: 5,
      reportedUser: "user1",
      reporter: "user102",
      reason: "스팸",
      reportDate: "2024-12-08",
      status: "resolved",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (delivery.trackingNumber &&
        delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter =
      filterStatus === "all" || delivery.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredReviewReports = reviewReports.filter((report) => {
    const matchesSearch =
      report.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reviewContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleOrderStatusChange = (orderId, newStatus) => {
    console.log(`주문 ${orderId} 상태 변경: ${newStatus}`);
  };

  const handleProductStatusChange = (productId, newStatus) => {
    console.log(`상품 ${productId} 상태 변경: ${newStatus}`);
  };

  const handleAddProduct = () => {
    console.log("상품 등록 모달 열기");
  };

  const handleDeliveryStatusChange = (deliveryId, newStatus) => {
    console.log(`배송 ${deliveryId} 상태 변경: ${newStatus}`);
  };

  const handleTrackingNumberUpdate = (deliveryId, trackingNumber) => {
    console.log(
      `배송 ${deliveryId} 추적번호 업데이트: ${trackingNumber}`
    );
  };

  const handleReviewReportResolve = (reportId) => {
    console.log(`리뷰 신고 ${reportId} 처리 완료`);
  };

  const handleReviewDelete = (reviewId) => {
    console.log(`리뷰 ${reviewId} 삭제`);
  };

  const fmt = (n) => Number(n || 0).toLocaleString("ko-KR");

  return (
    <S.ManagerWrapper>
      <S.ManagerContainer>
        <S.Header>
          <S.BackButton onClick={() => navigate("/main/manager")}>
            ← 뒤로가기
          </S.BackButton>
          <S.Title>주문 관리</S.Title>
          <S.Subtitle>
            주문 / 배송 / 상품 / 리뷰 신고 & 수익 대시보드
          </S.Subtitle>
        </S.Header>

        <S.TabContainer>
          <S.TabButton
            $active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          >
            대시보드
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          >
            주문 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "deliveries"}
            onClick={() => setActiveTab("deliveries")}
          >
            배송 관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          >
            상품 등록/관리
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "reviewReports"}
            onClick={() => setActiveTab("reviewReports")}
          >
            리뷰 신고
          </S.TabButton>
        </S.TabContainer>

        {/* ===== 대시보드 탭: 컴포넌트 분리 ===== */}
        {activeTab === "dashboard" && (
          <AdminDashboard orders={orders} products={products} />
        )}

        {/* ===== 주문 관리 탭 ===== */}
        {activeTab === "orders" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
                <option value="cancelled">취소됨</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>수량</S.TableHeaderCell>
                  <S.TableHeaderCell>총액</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>주문일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredOrders.map((order) => (
                  <S.TableRow key={order.id}>
                    <S.TableCell>{order.orderNumber}</S.TableCell>
                    <S.TableCell>{order.user}</S.TableCell>
                    <S.TableCell>{order.product}</S.TableCell>
                    <S.TableCell>{order.quantity}</S.TableCell>
                    <S.TableCell>{fmt(order.total)}원</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={order.status}>
                        {order.status === "pending"
                          ? "대기중"
                          : order.status === "shipped"
                          ? "배송중"
                          : order.status === "delivered"
                          ? "배송완료"
                          : "취소됨"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{order.orderDate}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            handleOrderStatusChange(order.id, "shipped")
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={order.status !== "pending"}
                        >
                          배송시작
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() =>
                            console.log(`주문 ${order.id} 상세보기`)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          상세
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* ===== 배송 관리 탭 ===== */}
        {activeTab === "deliveries" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 사용자, 상품명, 추적번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="preparing">준비중</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>배송 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>사용자</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>배송 주소</S.TableHeaderCell>
                  <S.TableHeaderCell>추적번호</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>발송일</S.TableHeaderCell>
                  <S.TableHeaderCell>배송완료일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <S.TableRow key={delivery.id}>
                    <S.TableCell>{delivery.id}</S.TableCell>
                    <S.TableCell>{delivery.orderNumber}</S.TableCell>
                    <S.TableCell>{delivery.user}</S.TableCell>
                    <S.TableCell>{delivery.product}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {delivery.address}
                    </S.TableCell>
                    <S.TableCell>{delivery.trackingNumber || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={delivery.status}>
                        {delivery.status === "preparing"
                          ? "준비중"
                          : delivery.status === "shipped"
                          ? "배송중"
                          : "배송완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{delivery.shipDate || "-"}</S.TableCell>
                    <S.TableCell>{delivery.deliveryDate || "-"}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        {delivery.status === "preparing" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "shipped"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송시작
                          </S.Button>
                        )}
                        {delivery.status === "shipped" && (
                          <S.Button
                            onClick={() =>
                              handleDeliveryStatusChange(
                                delivery.id,
                                "delivered"
                              )
                            }
                            style={{ padding: "6px 12px", fontSize: "12px" }}
                          >
                            배송완료
                          </S.Button>
                        )}
                        <S.SecondaryButton
                          onClick={() => {
                            const trackingNumber =
                              prompt("추적번호를 입력하세요:");
                            if (trackingNumber) {
                              handleTrackingNumberUpdate(
                                delivery.id,
                                trackingNumber
                              );
                            }
                          }}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          추적번호 입력
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* ===== 상품 탭 ===== */}
        {activeTab === "products" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="상품명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.Button onClick={handleAddProduct} style={{ marginLeft: "12px" }}>
                + 상품 등록
              </S.Button>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>ID</S.TableHeaderCell>
                  <S.TableHeaderCell>상품명</S.TableHeaderCell>
                  <S.TableHeaderCell>가격</S.TableHeaderCell>
                  <S.TableHeaderCell>재고</S.TableHeaderCell>
                  <S.TableHeaderCell>카테고리</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>등록일</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredProducts.map((product) => (
                  <S.TableRow key={product.id}>
                    <S.TableCell>{product.id}</S.TableCell>
                    <S.TableCell>{product.name}</S.TableCell>
                    <S.TableCell>{fmt(product.price)}원</S.TableCell>
                    <S.TableCell>{product.stock}개</S.TableCell>
                    <S.TableCell>{product.category}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={product.status}>
                        {product.status === "active" ? "판매중" : "판매중지"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>{product.createDate}</S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            console.log(`상품 ${product.id} 수정`)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          수정
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() =>
                            handleProductStatusChange(
                              product.id,
                              product.status === "active" ? "inactive" : "active"
                            )
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          {product.status === "active"
                            ? "판매중지"
                            : "판매재개"}
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}

        {/* ===== 리뷰 신고 탭 ===== */}
        {activeTab === "reviewReports" && (
          <S.ContentSection>
            <S.FilterBar>
              <S.SearchInput
                type="text"
                placeholder="주문번호, 상품명, 리뷰 내용, 신고자, 피신고자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <S.FilterSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="resolved">처리완료</option>
              </S.FilterSelect>
            </S.FilterBar>

            <S.Table>
              <S.TableHeader>
                <S.TableRow>
                  <S.TableHeaderCell>신고 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 ID</S.TableHeaderCell>
                  <S.TableHeaderCell>주문번호</S.TableHeaderCell>
                  <S.TableHeaderCell>상품</S.TableHeaderCell>
                  <S.TableHeaderCell>리뷰 내용</S.TableHeaderCell>
                  <S.TableHeaderCell>평점</S.TableHeaderCell>
                  <S.TableHeaderCell>피신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고자</S.TableHeaderCell>
                  <S.TableHeaderCell>신고 사유</S.TableHeaderCell>
                  <S.TableHeaderCell>신고일</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>작업</S.TableHeaderCell>
                </S.TableRow>
              </S.TableHeader>
              <tbody>
                {filteredReviewReports.map((report) => (
                  <S.TableRow key={report.id}>
                    <S.TableCell>{report.id}</S.TableCell>
                    <S.TableCell>{report.reviewId}</S.TableCell>
                    <S.TableCell>{report.orderNumber}</S.TableCell>
                    <S.TableCell>{report.product}</S.TableCell>
                    <S.TableCell
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {report.reviewContent}
                    </S.TableCell>
                    <S.TableCell>{"⭐".repeat(report.rating)}</S.TableCell>
                    <S.TableCell>{report.reportedUser}</S.TableCell>
                    <S.TableCell>{report.reporter}</S.TableCell>
                    <S.TableCell>{report.reason}</S.TableCell>
                    <S.TableCell>{report.reportDate}</S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={report.status}>
                        {report.status === "pending" ? "대기중" : "처리완료"}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ButtonGroup>
                        <S.Button
                          onClick={() =>
                            handleReviewReportResolve(report.id)
                          }
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          disabled={report.status === "resolved"}
                        >
                          처리
                        </S.Button>
                        <S.SecondaryButton
                          onClick={() => handleReviewDelete(report.reviewId)}
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          삭제
                        </S.SecondaryButton>
                      </S.ButtonGroup>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.ContentSection>
        )}
      </S.ManagerContainer>
    </S.ManagerWrapper>
  );
};

export default OrderManagementContainer;

