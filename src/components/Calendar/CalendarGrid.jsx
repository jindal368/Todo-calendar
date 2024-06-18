import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { addEvent, updateEvent } from "../../store/Events/Event.action";
import { keyframes } from "styled-components";
import { CALENDAR_TYPE } from "../../utils/constant";
import ThreeDaysView from "./ThreeDaysView/ThreeDaysView";
import Week from "./OneDayView/Week";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 140vh;
  overflow: scroll;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-left: 72px;
  margin-right: 72px;
  margin-top: 32px;
  margin-bottom: 36px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HourRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  height: 120vh;
  overflow-y: scroll;
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
  flex: 1;
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

const CalendarGrid = ({ calendarType }) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [showModalWithHours, setShowModalWithHours] = useState({
    show: false,
    time: null,
  });
  useEffect(() => {
    // logic of assigning render of different forms
  }, [calendarType]);

  const handleSlotClick = (hour) => {
    setShowModalWithHours({
      show: true,
      time: `${hour.toString().padStart(2, "0")}:00`,
    });
  };

  const handleSaveEvent = (formData) => {
    const hour = showModalWithHours.time;
    dispatch(addEvent({ time: hour, event: formData }));
    setShowModalWithHours({ show: false, time: null });
  };

  const handleUpdateEvent = (hourLabel) => {
    const eventData = events[hourLabel];
    if (eventData) {
      setFormData(eventData);
      //dispatch(updateEvent(eventData, hourLabel));
      setShowModalWithHours({ show: false, time: null });
    }
  };

  const renderHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hourLabel = `${i.toString().padStart(2, "0")}:00`;
      hours.push(
        <HourRow key={i} onClick={() => handleSlotClick(i)}>
          <TimeLabel>{hourLabel}</TimeLabel>
          <EventSlot onClick={() => handleUpdateEvent(hourLabel)}>
            {events[hourLabel] && (
              <Event>
                <div>{events[hourLabel].description}</div>
                {events[hourLabel].labels && (
                  <Label>{events[hourLabel].labels}</Label>
                )}
              </Event>
            )}
          </EventSlot>
        </HourRow>
      );
    }
    return hours;
  };

  useEffect(() => {
    renderHours();
  }, [formData]);

  const RenderCalendar = (calendarType) => {
    const obj = {
      ONE_DAY: renderHours(),
      THREE_DAYS: <ThreeDaysView />,
      WEEK: <Week />,
    };
    return obj[calendarType];
  };

  return (
    <CalendarWrapper>
      {RenderCalendar(calendarType)}
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

export default CalendarGrid;
