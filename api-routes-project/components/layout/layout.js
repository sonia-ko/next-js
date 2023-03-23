import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const context = useContext(NotificationContext);

  const activeNotification = context.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          message={activeNotification.message}
          title={activeNotification.title}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
