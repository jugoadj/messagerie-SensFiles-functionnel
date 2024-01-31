import React, { useState, Suspense } from "react";
import { Header, SideBar } from "../components/emails";
import { Box, styled } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import SuspenseLoader from "../components/emails/common/SuspenseLoader";

import SideNavBar from "../components/emails/SideNavBar";


import ViewEmailg from "../components/gmail/ViewEmailg";
import Emailsg from "../components/gmail/Emailsg";
import SideBarg from "../components/gmail/SideBarg";

const Wrapper = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
`;

const MainContent = styled(Box)`
  flex: 1;
  overflow: hidden;
`;

const Gmail = () => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />

      <Wrapper>
        <SideNavBar />
        <SideBarg toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
        <MainContent>
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
                <Route path="/view" element={<ViewEmailg openDrawer={openDrawer} />} />
                <Route path="/bin" element={<Emailsg openDrawer={openDrawer} mailboxEndpoint="api/email/bin" />} />
                 <Route path="/inbox" element={<Emailsg openDrawer={openDrawer} mailboxEndpoint="api/email/inbox" />} /> 
                 <Route path="/sent" element={<Emailsg openDrawer={openDrawer} mailboxEndpoint="api/email/sent" />} />
                 <Route path="/starred" element={<Emailsg openDrawer={openDrawer} mailboxEndpoint="api/email/starred" />} />
                 <Route
                index // This makes this route the default child route
                element={<Navigate to="inbox" replace />} // Redirect to /email/inbox
              />
            </Routes>
          </Suspense>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default Gmail;
