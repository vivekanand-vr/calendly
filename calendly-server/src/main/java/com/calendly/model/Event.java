package com.calendly.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@Table(name = "events")
public class Event {
    @Id
    private String id;
    
    @Column(nullable = false)
    private String user;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private OffsetDateTime start;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private OffsetDateTime end;
}