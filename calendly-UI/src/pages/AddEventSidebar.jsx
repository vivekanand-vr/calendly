import React, { useState, useEffect, useContext } from 'react';
import { Drawer, TextField, Button, Box } from '@mui/material';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/AuthContext';

const AddEventSidebar = ({ show, onHide, onAddEvent, onEditEvent, onDeleteEvent, selectedEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDescription(selectedEvent.description || '');
      setStartDate(selectedEvent.start ? moment(selectedEvent.start).format('YYYY-MM-DD') : '');
      setStartTime(selectedEvent.start ? moment(selectedEvent.start).format('HH:mm') : '');
      setEndDate(selectedEvent.end ? moment(selectedEvent.end).format('YYYY-MM-DD') : '');
      setEndTime(selectedEvent.end ? moment(selectedEvent.end).format('HH:mm') : '');
    } else {
      resetForm();
    }
  }, [selectedEvent]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
  };

  const handleSubmit = () => {
    const eventData = {
      id: selectedEvent ? selectedEvent.id : uuidv4(),
      user: user.email,
      title,
      description,
      start: moment(`${startDate} ${startTime}`).toDate(),
      end: moment(`${endDate} ${endTime}`).toDate(),
    };

    if (selectedEvent) {
      onEditEvent(eventData);
    } else {
      onAddEvent(eventData);
    }

    onHide();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      onHide();
    }
  };

  return (
    <Drawer anchor="right" open={show} onClose={onHide}>
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
          label="Start Date"
          type="date"
          fullWidth
          margin="normal"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          InputLabelProperties={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          margin="normal"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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