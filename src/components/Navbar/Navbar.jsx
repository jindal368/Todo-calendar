import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiGooglecalendar } from "react-icons/si";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Sidebar from "../Sidebar/Sidebar";
import { PiPlusBold } from "react-icons/pi";
import { CALENDAR_TYPE } from "../../utils/constant";
const Navbar = ({ showModal, setShowModal, setCalendarType, calendarType }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row p-8">
        <RxHamburgerMenu
          size={"2rem"}
          className="hover:bg-slate-100 rounded-full "
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />

        <div className="flex flex-row px-8 space-x-2">
          <SiGooglecalendar color={"blue"} size={"2rem"} />
          <h4 className="text-xl mt-1">Calendar</h4>
        </div>
        {/* calendar controls */}
        <div className="flex flex-row space-x-5">
          <div className="border border-gray-700 shadow-xl rounded-lg h-10 w-24 cursor-pointer hover:bg-slate-200">
            <p className="text-lg ml-6 mt-1">Today</p>
          </div>
          <IoIosArrowBack size={"1.5rem"} className="mt-2 hover:bg-slate-200" />
          <IoIosArrowForward
            size={"1.5rem"}
            className="mt-2 hover:bg-slate-200"
          />
          {/* display date */}
          <div className="border border-gray-700 shadow-xl rounded-lg h-10 w-24 cursor-pointer hover:bg-slate-200">
            <div
              className="flex flex-row justify-center"
              onClick={() => setShowModal(true)}
            >
              <PiPlusBold size={"1.2rem"} className="mt-2 hover:bg-slate-200" />
              <p className="text-lg ml-2 mt-1">New</p>
            </div>
          </div>
        </div>
        {/* Viewssss */}
        <div className="flex flex-1  justify-end space-x-2">
          <div className="border border-gray-700 shadow-xl  rounded-lg h-10 w-24 cursor-pointer hover:bg-slate-200">
            <p className="text-lg ml-6 mt-1">Board</p>
          </div>
          <div
            className="border border-gray-700 shadow-xl rounded-lg h-10 w-48 cursor-pointer hover:bg-slate-200"
            onClick={() => setCalendarType(CALENDAR_TYPE.ONE_DAY)}
            style={{
              backgroundColor:
                calendarType === CALENDAR_TYPE.ONE_DAY && "#007bff",
            }}
          >
            <p className="text-lg ml-6 mt-1">Calendar : One day</p>
          </div>
          <div
            className="border border-gray-700 shadow-xl rounded-lg h-10 w-56 cursor-pointer hover:bg-slate-200"
            onClick={() => setCalendarType(CALENDAR_TYPE.THREE_DAYS)}
            style={{
              backgroundColor:
                calendarType === CALENDAR_TYPE.THREE_DAYS && "#007bff",
            }}
          >
            <p className="text-lg ml-6 mt-1">Calendar : Three days</p>
          </div>
          <div
            className="border border-gray-700 shadow-xl rounded-lg h-10 w-52 cursor-pointer hover:bg-slate-200"
            onClick={() => setCalendarType(CALENDAR_TYPE.WEEK_DAYS)}
            style={{
              backgroundColor:
                calendarType === CALENDAR_TYPE.WEEK_DAYS && "#007bff",
            }}
          >
            <p className="text-lg ml-6 mt-1">Calendar : weekdays</p>
          </div>
          <div
            className="border border-gray-700 shadow-xl rounded-lg h-10 w-48 cursor-pointer hover:bg-slate-200"
            onClick={() => setCalendarType(CALENDAR_TYPE.WEEK)}
            style={{
              backgroundColor: calendarType === CALENDAR_TYPE.WEEK && "#007bff",
            }}
          >
            <p className="text-lg ml-6 mt-1">Calendar : Week</p>
          </div>
          <div
            className="border border-gray-700 shadow-xl rounded-lg h-10 w-48 cursor-pointer hover:bg-slate-200"
            onClick={() => setCalendarType(CALENDAR_TYPE.MONTH)}
          >
            <p className="text-lg ml-6 mt-1">Calendar : Month</p>
          </div>
        </div>
      </div>

      {/* sideBar componete */}
      {isSideBarOpen && <Sidebar />}
    </div>
  );
};

export default Navbar;
