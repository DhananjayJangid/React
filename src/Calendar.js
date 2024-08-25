// src/Calendar.js
import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayName, setNewHolidayName] = useState('');
  const [editHoliday, setEditHoliday] = useState(null);
  const [editHolidayDate, setEditHolidayDate] = useState('');
  const [editHolidayName, setEditHolidayName] = useState('');

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleAddHoliday = () => {
    if (newHolidayDate && newHolidayName) {
      setHolidays([...holidays, { date: new Date(newHolidayDate), name: newHolidayName }]);
      setNewHolidayDate('');
      setNewHolidayName('');
    }
  };

  const handleEditHoliday = () => {
    if (editHolidayDate && editHolidayName && editHoliday) {
      setHolidays(holidays.map(holiday =>
        holiday === editHoliday
          ? { date: new Date(editHolidayDate), name: editHolidayName }
          : holiday
      ));
      setEditHoliday(null);
      setEditHolidayDate('');
      setEditHolidayName('');
    }
  };

  const generateCalendar = () => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];

    // Fill in the previous month's days
    const prevMonthDays = [];
    const firstDay = startDate.getDay();
    for (let i = 0; i < firstDay; i++) {
      prevMonthDays.push(<div className="calendar-day calendar-empty" key={`prev-${i}`} />);
    }

    // Current month days
    for (let i = 1; i <= endDate.getDate(); i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const holiday = holidays.find(holiday =>
        holiday.date.getDate() === i &&
        holiday.date.getMonth() === currentDate.getMonth() &&
        holiday.date.getFullYear() === currentDate.getFullYear()
      );

      days.push(
        <div
          className={`calendar-day ${holiday ? 'holiday' : ''}`}
          key={`current-${i}`}
          onClick={() => holiday && setEditHoliday(holiday)}
        >
          {i}
          {holiday && <div className="holiday-info">{holiday.name}</div>}
        </div>
      );
    }

    return [...prevMonthDays, ...days];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[currentDate.getMonth()];

  return (
    <div className="calendar">
      <header className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{`${monthName} ${currentDate.getFullYear()}`}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </header>
      <div className="calendar-body">
        <div className="calendar-day calendar-day-name">Sun</div>
        <div className="calendar-day calendar-day-name">Mon</div>
        <div className="calendar-day calendar-day-name">Tue</div>
        <div className="calendar-day calendar-day-name">Wed</div>
        <div className="calendar-day calendar-day-name">Thu</div>
        <div className="calendar-day calendar-day-name">Fri</div>
        <div className="calendar-day calendar-day-name">Sat</div>
        {generateCalendar()}
      </div>
      <div className="add-holiday">
        <h3>{editHoliday ? 'Edit Holiday' : 'Add Holiday'}</h3>
        <input
          type="date"
          value={editHoliday ? editHolidayDate : newHolidayDate}
          onChange={(e) => {
            const date = e.target.value;
            if (editHoliday) {
              setEditHolidayDate(date);
            } else {
              setNewHolidayDate(date);
            }
          }}
        />
        <input
          type="text"
          placeholder="Holiday Name"
          value={editHoliday ? editHolidayName : newHolidayName}
          onChange={(e) => {
            const name = e.target.value;
            if (editHoliday) {
              setEditHolidayName(name);
            } else {
              setNewHolidayName(name);
            }
          }}
        />
        <button onClick={editHoliday ? handleEditHoliday : handleAddHoliday}>
          {editHoliday ? 'Save' : 'Add'}
        </button>
        {editHoliday && (
          <button onClick={() => setEditHoliday(null)}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export default Calendar;
