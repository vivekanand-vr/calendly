package com.calendly.service;

import com.calendly.model.Event;
import com.calendly.dao.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEventsByUser(String user) {
        return eventRepository.findByUser(user);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(String eventId) {
        eventRepository.deleteById(eventId);
    }
}