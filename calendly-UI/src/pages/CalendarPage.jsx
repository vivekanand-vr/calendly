import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { Button, Paper, Box, Menu, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import AddEventSidebar from './AddEventSidebar';
import { AuthContext } from '../context/AuthContext';
import { Logout } from '@mui/icons-material';
import { doSignOut } from '../firebase/auth';
import moment from 'moment-timezone';

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const url = `http://localhost:9999/calendly/api/events/user/${user.email}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Sign out user and redirect to landing page
  const signOut = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (err) {
      console.error('Sign-out failed:', err.message);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const url = "http://localhost:9999/calendly/api/events";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const addedEvent = await response.json();
      setEvents([...events, addedEvent]);
      setShowSidebar(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const url = `http://localhost:9999/calendly/api/events/${updatedEvent.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const editedEvent = await response.json();
      setEvents(events.map(event => (event.id === editedEvent.id ? editedEvent : event)));
      setShowSidebar(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

   const handleDeleteEvent = async (id) => {
    try {
      const url = `http://localhost:9999/calendly/api/events/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(events.filter(event => event.id !== id));
      setShowSidebar(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    setSelectedDate(arg.date);
    toggleSidebar();
  };

  const handleSelectEvent = (info) => {
    const selectedEventData = {
      id: info.event.id,
      user: user.email,
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: info.event.start,
      end: info.event.end,
    };
    setSelectedEvent(selectedEventData);
    setSelectedDate(null);
    setShowSidebar(true);
  };

  const handleEventDrop = async (info) => {
    const userTimezone = moment.tz.guess();
    const droppedEvent = {
      ...info.event.toPlainObject(),
      user: user.email,
      start: moment.tz(info.event.start, userTimezone).toISOString(),
      end: moment.tz(info.event.end, userTimezone).toISOString(),
    };
    await handleEditEvent(droppedEvent);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  if (user == null) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        bgcolor="#D3D3D3"
      >
        <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Please Login
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            You need to log in to use Calendly.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
        <Button variant="contained" color="primary" onClick={() => { setSelectedEvent(null); setSelectedDate(new Date()); toggleSidebar(); }}>
          Add Event
        </Button>

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

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, momentTimezonePlugin]}
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
        height="100vh"
        timeZone={moment.tz.guess()}
      />

      <AddEventSidebar
        show={showSidebar}
        onHide={toggleSidebar}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;