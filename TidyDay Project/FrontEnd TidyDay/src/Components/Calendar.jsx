import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useState } from "react";

import CalendarSetup from "./CalendarSetup";

function Calendar() {
  return (
    <>
      <div className="mode-user">
        <Sidebar />
        <div className="main-content " id="fondocalendar">
          <TopBar />
          <CalendarSetup />
        </div>
      </div>

    </>
  );
}
export default Calendar;
