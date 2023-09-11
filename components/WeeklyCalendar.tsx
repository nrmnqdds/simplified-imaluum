"use client";

import styled from "styled-components";
import { range, addDateBy, areDateSame, getMonday } from "./utils";
import { useState, useEffect } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HOUR_HEIGHT = 30;
const HOUR_MARGIN_TOP = 15;

const WeeklyCalendar = () => {
  const [mondayDate, setMondayDate] = useState(getMonday());
  const [events, setEvents] = useState([
    { date: new Date(2023, 9, 9, 9), text: "first hi", howLong: 3 },
  ]);

  const onAddEvent = (date: Date) => {
    const text = prompt("text");
    const fromInput = prompt("from");
    const toInput = prompt("to");

    // Parse the input values as numbers
    const from = parseInt(fromInput, 10);
    const to = parseInt(toInput, 10);

    // Check if parsing was successful
    if (isNaN(from) || isNaN(to)) {
      alert("Invalid input. Please enter valid numbers for 'from' and 'to'.");
      return;
    }

    date.setHours(from);

    setEvents((prev) => [...prev, { text, date, howLong: to - from }]);
  };

  const hourNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();

  console.log(addDateBy(new Date(), 1));

  return (
    <Wrapper>
      <p>Today: {new Date().toDateString()}</p>
      <HGrid first={`30px`} cols={1}>
        <VGrid rows={24}>
          {range(24)
            .filter((hour) => hour >= 8 && hour <= 18)
            .map((hour, index) => (
              <Hour key={index}>{hour % 12 || 12}</Hour>
            ))}
        </VGrid>
        <HGrid cols={7}>
          {days.map((day, index) => (
            <DayWrapper
              key={index}
              onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
              isToday={areDateSame(new Date(), addDateBy(mondayDate, index))}
            >
              <p>{day}</p>
              {events.map(
                (event) =>
                  areDateSame(addDateBy(mondayDate, index), event.date) && (
                    <Event
                      key={index}
                      howLong={event.howLong}
                      fromTop={
                        event.date.getHours() * HOUR_HEIGHT +
                        HOUR_HEIGHT / 2 +
                        event.date.getMinutes() / 2
                      }
                    >
                      Hi
                    </Event>
                  )
              )}
            </DayWrapper>
          ))}
        </HGrid>
      </HGrid>
      <HourLine
        fromTop={
          hourNow * HOUR_HEIGHT +
          HOUR_MARGIN_TOP +
          HOUR_HEIGHT / 2 +
          minuteNow / 2
        }
      />
    </Wrapper>
  );
};

export default WeeklyCalendar;

const Wrapper = styled.div`
  width: calc(100% - 30px);
  border: 1px solid
  margin: 15px;
  position: relative;
  `;

const HGrid = styled.div<{ first?: string; cols: number }>`
  display: grid;
  grid-template-columns: ${({ first }) => first || ""} repeat(
      ${({ cols }) => cols},
      1fr
    );
`;

const VGrid = styled.div<{ rows: number }>`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);

  &:first-child {
    margin-top: 15px;
  }
`;

const DayWrapper = styled.span<{ isToday: boolean }>`
  border: 1px solid red;
  display: relative;
  background: ${({ isToday }) => (isToday ? "#F2CEE6" : "transparent")};
`;

const Hour = styled.span`
    display: flex;
    align-items-center;
    height: 30px;
`;

const HourLine = styled.div<{ fromTop?: number }>`
  position: absolute;
  width: 100%;
  top: ${({ fromTop }) => fromTop}px;
  border: 1px solid orange;
`;

const Event = styled.div<{ fromTop?: number; howLong?: number }>`
  position: relative;
  width: calc(100% - 10px);
  top: ${({ fromTop }) => fromTop}px;
  background: green;
  height: ${({ howLong }) => howLong * 30}px;
  margin: 0 5px;
`;
