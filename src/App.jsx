import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import CalendarGrid from "./components/Calendar/CalendarGrid";
import { CALENDAR_TYPE } from "./utils/constant";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [calendarType, setCalendarType] = useState(CALENDAR_TYPE.ONE_DAY);

  return (
    <>
      {
        <Navbar
          showModal={showModal}
          setShowModal={setShowModal}
          setCalendarType={setCalendarType}
          calendarType={calendarType}
        />
      }
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      <div className="max-h-screen overflow-scroll">
        <CalendarGrid calendarType={calendarType} />
      </div>
    </>
  );
}

export default App;
