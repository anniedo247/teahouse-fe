import React from "react";
import { Container ,Row} from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import AlertMsg from "./AlertMsg";
import PublicNavbar from  "../../components/PublicNavbar"
import SideMenu from "../../components/SideMenu"
import UserInfo from "../../pages/User/UserInfo";
import UserOrders from "../../pages/User/UserOrders";
import UserFavorite from "../../pages/User/UserFavorite";
import UserOrdersDetail from "../../pages/User/UserOrdersDetail";
import NotFoundPage from "../../pages/NotFoundPage"
import Footer from "../../components/Footer";

const UserLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Container
        fluid
        className="d-flex align-items-center justify-content-center user-header"
      >
        <span className="header-title">MY ACCOUNT</span>
      </Container>
      <Row>
      <SideMenu/>
        <Switch>
          <Route exact path="/users/me/profile" component={UserInfo} />
          <Route exact path="/users/me/orders" component={UserOrders} />
          <Route exact path="/users/me/favorite" component={UserFavorite} />
          <Route exact path="/users/me/orders/:orderId" component={UserOrdersDetail} />

          <Route component={NotFoundPage} />
        </Switch>
      </Row>
        
      </Container>
      <Footer/>
    </>
  );
};

export default UserLayout;
