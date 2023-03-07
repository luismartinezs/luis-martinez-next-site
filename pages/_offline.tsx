import type { NextPage } from "next";

import PageLayout from "components/PageLayout";
import Notification from "components/Notification";

const Offline: NextPage = () => {
  return (
    <PageLayout title="">
      <Notification type="warning">You are offline</Notification>
    </PageLayout>
  );
};

export default Offline;
