import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addDays, format } from "date-fns";
import Modal from "../../Modal/Modal";
import { addEvent } from "../../../store/Events/Event.action";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 32px 72px 36px;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1px;
`;

const DayHeader = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  display: flex;
  flex-direction: row;
`;

const HourRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  animation: ${fadeIn} 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TimeLabel = styled.div`
  width: 60px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const EventSlot = styled.div`
  border-left: 1px solid #e0e0e0;
  height: 100%;
  position: relative;
`;

const Event = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0, 128, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  pointer-events: none;
`;

const Label = styled.div`
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
  padding: 5px 10px;
  background-color: blue;
  border-radius: 4px;
`;

const ThreeDaysView = () => {
  const [formData, setFormData] = useState({});
  const [currentStartDay, setCurrentStartDay] = useState(new Date());
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [showModalWithHours, setShowModalWithHours] = useState({
    show: false,
    time: null,
    day: null,
  });

  const handleSlotClick = (hour, day) => {
    setShowModalWithHours({
      show: true,
      time: `${hour.toString().padStart(2, "0")}:00`,
      day,
    });
  };

  const handleSaveEvent = (formData) => {
    const hour = showModalWithHours.time;
    const day = showModalWithHours.day;
    dispatch(addEvent({ time: hour, day, event: formData }));
    setShowModalWithHours({ show: false, time: null, day: null });
  };

  const handleUpdateEvent = (hourLabel, day) => {
    const eventData = events[`${day}-${hourLabel}`];
    if (eventData) {
      setFormData(eventData);
      setShowModalWithHours({ show: false, time: null, day: null });
    }
  };

  const renderHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hourLabel = `${i.toString().padStart(2, "0")}:00`;
      const rows = [];
      for (let j = 0; j < 3; j++) {
        const day = addDays(currentStartDay, j);
        const dayLabel = format(day, "yyyy-MM-dd");
        rows.push(
          <EventSlot
            key={j}
            onClick={() => handleUpdateEvent(hourLabel, dayLabel)}
          >
            {events[`${dayLabel}-${hourLabel}`] && (
              <Event>
                <div>{events[`${dayLabel}-${hourLabel}`].description}</div>
                {events[`${dayLabel}-${hourLabel}`].labels && (
                  <Label>{events[`${dayLabel}-${hourLabel}`].labels}</Label>
                )}
              </Event>
            )}
          </EventSlot>
        );
      }
      hours.push(
        <HourRow key={i} onClick={() => handleSlotClick(i)}>
          <TimeLabel>{hourLabel}</TimeLabel>
          {rows}
        </HourRow>
      );
    }
    return hours;
  };

  const renderDayHeaders = () => {
    const headers = [];
    for (let i = 0; i < 3; i++) {
      const day = addDays(currentStartDay, i);
      headers.push(
        <DayHeader key={i}>{`${format(
          day,
          "EEEE"
        )} ${day.getDate()}/${day.getMonth()}/${day.getFullYear()}
        `}</DayHeader>
      );
    }
    return <div className="flex flex-row justify-evenly ml-80">{headers}</div>;
  };

  const handlePrevThreeDays = () => {
    setCurrentStartDay((prevDay) => addDays(prevDay, -3));
  };

  const handleNextThreeDays = () => {
    setCurrentStartDay((prevDay) => addDays(prevDay, 3));
  };

  useEffect(() => {
    renderHours();
  }, [formData, currentStartDay]);

  return (
    <CalendarWrapper>
      <Navigation>
        <Button onClick={handlePrevThreeDays}>Previous 3 Days</Button>
        <Button onClick={handleNextThreeDays}>Next 3 Days</Button>
      </Navigation>
      <WeekGrid>
        {renderDayHeaders()}
        {renderHours()}
      </WeekGrid>
      {showModalWithHours.show && (
        <Modal
          showModal={showModalWithHours}
          setShowModal={setShowModalWithHours}
          handleSave={handleSaveEvent}
          handleUpdate={handleUpdateEvent}
          formDataProps={formData}
        />
      )}
    </CalendarWrapper>
  );
};

export default ThreeDaysView;
