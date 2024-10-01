import React, { useState, useEffect, useContext } from 'react';
import { Drawer, TextField, Button, Box } from '@mui/material';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/AuthContext';

const AddEventSidebar = ({ show, onHide, onAddEvent, onEditEvent, onDeleteEvent, selectedEvent, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (selectedEvent) {
      const eventStart = moment(selectedEvent.start);
      const eventEnd = moment(selectedEvent.end);
      
      setTitle(selectedEvent.title || '');
      setDescription(selectedEvent.description || '');
      setDate(eventStart.format('YYYY-MM-DD'));
      setStartTime(eventStart.format('HH:mm'));
      setEndTime(eventEnd.format('HH:mm'));
    } else if (selectedDate) {
      resetForm();
      setDate(moment(selectedDate).format('YYYY-MM-DD'));
      setStartTime('00:00');
      setEndTime('23:59');
    } else {
      resetForm();
    }
  }, [selectedEvent, selectedDate]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  const handleSubmit = () => {
    const userTimezone = moment.tz.guess();
    const startDateTime = moment.tz(`${date} ${startTime}`, userTimezone);
    const endDateTime = moment.tz(`${date} ${endTime}`, userTimezone);

    const eventData = {
      id: selectedEvent ? selectedEvent.id : uuidv4(),
      user: user.email,
      title,
      description,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    };

    if (selectedEvent) {
      onEditEvent(eventData);
    } else {
      onAddEvent(eventData);
    }

    onHide();
    resetForm();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      onHide();
      resetForm();
    }
  };

  return (
    <Drawer anchor="right" open={show} onClose={() => { onHide(); resetForm(); }}>
      <Box sx={{ width: 300, padding: 3 }}>
        <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Start Time"
          type="time"
          fullWidth
          margin="normal"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Time"
          type="time"
          fullWidth
          margin="normal"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {selectedEvent ? 'Update' : 'Submit'}
          </Button>
          {selectedEvent && (
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddEventSidebar;