import React, { useState, Suspense } from "react";
import { Header, SideBar } from "../components/chats";
import { Box, styled } from "@mui/material";
// import { Outlet, Route, Routes } from "react-router-dom";
import SuspenseLoader from "../components/chats/common/SuspenseLoader";

import SideNavBar from "../components/emails/SideNavBar";
import MyCalendar from "../components/calendar/calendar";


const Wrapper = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  
`;

const MainContent = styled(Box)`
  flex: 2;
  overflow: hidden;
`;

const Calendar = (props) => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />

      <Wrapper>
        <SideNavBar />
        {/* <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} /> */}
        <MainContent>
          
          <Suspense fallback={<SuspenseLoader />}>
            
                <MyCalendar style={{marginLeft: 40}}/>
            
          </Suspense>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default Calendar;
