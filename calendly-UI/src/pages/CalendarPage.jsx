import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Button, Box, Menu, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import AddEventSidebar from './AddEventSidebar';
import { AuthContext } from '../context/AuthContext';
import { Logout } from '@mui/icons-material';
import { doSignOut } from '../firebase/auth';

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Display calendar only after user logs in
  if (user == null) {
    return <div>Please login to use calendly</div>;
  }

  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const signOut = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (err) {
      console.log(err.message);
      setError("Sign-out failed, try again later");
    }
  };

  const handleAddEvent = (newEvent) => {
    const formattedEvent = {
      ...newEvent,
      start: newEvent.start.toISOString(),
      end: newEvent.end.toISOString()
    };
    setEvents([...events, formattedEvent]);
    setShowSidebar(false);
  };

  const handleEditEvent = (updatedEvent) => {
    const formattedEvent = {
      ...updatedEvent,
      start: updatedEvent.start.toISOString(),
      end: updatedEvent.end.toISOString()
    };
    setEvents(events.map(event => (event.id === formattedEvent.id ? formattedEvent : event)));
    setShowSidebar(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setShowSidebar(false);
  };

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    toggleSidebar();
  };

  const handleSelectEvent = (info) => {
    const selectedEventData = {
      id: info.event.id,
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: info.event.start,
      end: info.event.end
    };
    setSelectedEvent(selectedEventData);
    setShowSidebar(true);
  };

  const handleEventDrop = (info) => {
    const droppedEvent = {
      ...info.event.toPlainObject(),
      start: info.event.start,
      end: info.event.end
    };
    handleEditEvent(droppedEvent);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Profile and Add Event button section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
        <Button variant="contained" color="primary" onClick={() => { setSelectedEvent(null); toggleSidebar(); }}>
          Add Event
        </Button>

        {/* Profile Icon with Dropdown */}
        <Box>
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar alt={user?.email} src="/profile-icon.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem>
              <Typography variant="body1">{user?.email}</Typography>
            </MenuItem>
            <MenuItem onClick={signOut}>
              <Logout style={{ marginRight: '8px' }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Full Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleSelectEvent}
        editable={true}
        droppable={true}
        selectable={true}
        eventDrop={handleEventDrop}
        height="60vh"
      />

      {/* Add/Edit Event Sidebar */}
      <AddEventSidebar
        show={showSidebar}
        onHide={toggleSidebar}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default CalendarPage;