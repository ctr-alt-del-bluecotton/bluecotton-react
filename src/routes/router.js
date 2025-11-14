import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../pages/main/MainContainer";
import Layout from "../pages/layout/Layout";
import NotFound from "../pages/notFound/NotFound";
import SignUp from "../pages/signUp/SignUp";
import Intro from "../pages/intro/Intro";
import Shop from "../pages/shop/read/Shop";
import Login from "../pages/login/Login";
import ReadContent from "../pages/main/readcontent/ReadContent";
import MapContainer from "../pages/map/MapContainer";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import MySomContainer from "../pages/myPage/mysom/MySomContainer";
import MySomAuthContainer from "../pages/myPage/mysom/mysomauth/MySomAuthContainer";
import MyShopContainer from "../pages/myPage/myshop/MyShopContainer";
import MySomSoloContainer from "../pages/myPage/mysom/mysomsolo/MySomSoloContainer";
import ShopContainer from "../pages/shop/ShopContainer";
import ShopOrder from "../pages/shop/order/ShopOrder";
import PostContainer from "../pages/post/PostContainer";
import MySomPartyContainer from "../pages/myPage/mysom/mysomparty/MySomPartyContainer";
import MySomCandyContainer from "../pages/myPage/mysom/mysomcandy/MySomCandyContainer";
import MySomRankContainer from "../pages/myPage/mysom/mysomrank/MySomRankContainer";
import MyShopLikeContainer from "../pages/myPage/myshop/myshoplike/MyShopLikeContainer";
import MyShopCartContainer from "../pages/myPage/myshop/myshopcart/MyShopCartContainer";
import MyShopReviewContainer from "../pages/myPage/myshop/myshopreview/MyShopReviewContainer";
import MyShopDeliveryContainer from "../pages/myPage/myshop/myshopdelivery/MyShopDeliveryContainer";
import MyShopOrderContainer from "../pages/myPage/myshop/myshoporder/MyShopOrderContainer";
import MyPostContainer from "../pages/myPage/mypost/MyPostContainer";
import MyPostLikeContainer from "../pages/myPage/mypost/mypostlike/MyPostLikeContainer";
import MyPostWriteContainer from "../pages/myPage/mypost/mypostwrite/MyPostWriteContainer";
import MyPostCommnetContainer from "../pages/myPage/mypost/mypostcomment/MyPostCommnetContainer";
import MyPostSaveContainer from "../pages/myPage/mypost/mypostsave/MyPostSaveContainer";
import MyPostRecentContainer from "../pages/myPage/mypost/mypostrecent/MyPostRecentContainer";
import MyInfoContainer from "../pages/myPage/myinfo/MyInfoContainer";
import PostReadContent from "../pages/post/readcontent/PostReadContent";
import PostWriteContent from "../pages/post/postwritecontent/PostWriteContent";
import PostModifyContent from "../pages/post/postModifyContent/PostModifyContent";
import MySomCheck from "../pages/myPage/mysom/mysomcheck/MySomCheck";
import SocialRedirect from "../pages/login/success/SocialRedirect";
import LoginLayOut from "../pages/layout/LoginLayout";
import ManagerContainer from "../pages/manager/ManagerContainer";
import UserManagementContainer from "../pages/manager/UserManagementContainer";
import SomManagementContainer from "../pages/manager/SomManagementContainer";
import PostManagementContainer from "../pages/manager/PostManagementContainer";
import OrderManagementContainer from "../pages/manager/OrderManagementContainer";
import FindId from "../pages/findemail/FindEmail";
import FindEmail from "../pages/findemail/FindEmail";
import FindPassword from "../pages/findpassword/FindPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />
  },
  {
    path: "/main",
    element: <Layout />,
    children: [
      {
        path: "som/:category",
        element: <MainContainer />
      },
      {
        path: "som/read/:id",
        element: <ReadContent />
      }, 
      {
        path: "map",
        element: <MapContainer />
      },
      {
        element: <LoginLayOut />, // 여기에 감싸면 로그인 필요한 모든 하위 경로가 보호됨
        children: [
          {
            path: "my-page",
            element: <MyPageContainer />,
            children: [
              {
                path: "my-som",
                element: <MySomContainer />,
                children: [
                  { path: "auth", element: <MySomAuthContainer /> },
                  { path: "solo", element: <MySomSoloContainer /> },
                  { path: "party", element: <MySomPartyContainer /> },
                  { path: "candy", element: <MySomCandyContainer /> },
                  { path: "rank", element: <MySomRankContainer /> },
                ],
              },
              { path: "my-som-check", element: <MySomCheck /> },
              {
                path: "my-shop",
                element: <MyShopContainer />,
                children: [
                  { path: "like", element: <MyShopLikeContainer /> },
                  { path: "cart", element: <MyShopCartContainer /> },
                  { path: "review", element: <MyShopReviewContainer /> },
                  { path: "delivery", element: <MyShopDeliveryContainer /> },
                  { path: "order", element: <MyShopOrderContainer /> },
                ],
              },
              {
                path: "my-post",
                element: <MyPostContainer />,
                children: [
                  { path: "like", element: <MyPostLikeContainer /> },
                  { path: "write", element: <MyPostWriteContainer /> },
                  { path: "comment", element: <MyPostCommnetContainer /> },
                  { path: "save", element: <MyPostSaveContainer /> },
                  { path: "recent", element: <MyPostRecentContainer /> },
                ],
              },
              { path: "my-info", element: <MyInfoContainer /> },
            ],
          },
        ]
      },
      {
        path: "shop",
        element: <ShopContainer />
      },
      {
        path: "shop/read/:id",
        element: <Shop />
      },
      {
        path: "shop/order",
        element: <ShopOrder />
      },
      {
        path: "post/:category",
        element: <PostContainer />
      },
      {
        path: "post/read/:id",
        element: <PostReadContent />
      },
      {
        path: "post/write",
        element: <PostWriteContent />
      },
      {
        path: "post/modify/:id",
        element: <PostModifyContent />
      }
    ]
  },
  {
    path : "/login",
    element : <Login></Login>
  },
  {
    path : "/oauth2/success",
    element: <SocialRedirect />
  },
  {
    path : "/sign-up",
    element : <SignUp></SignUp>
  },
  {
    path: "/find-email",
    element: <FindEmail />
  },
  {
    path: "/find-password",
    element: <FindPassword />
  },
  {
    path : "/main/manager",
    element: <ManagerContainer />
  },
  {
    path : "/main/manager/users",
    element: <UserManagementContainer />
  },
  {
    path : "/main/manager/soms",
    element: <SomManagementContainer />
  },
  {
    path : "/main/manager/posts",
    element: <PostManagementContainer />
  },
  {
    path : "/main/manager/orders",
    element: <OrderManagementContainer />
  },
  {
    path : "*",
    element : <NotFound />
  },
])

export default router;