# Calendly - Event Scheduling Application

Calendly is an event scheduling application built using React for the frontend and Spring Boot for the backend. It provides users with a calendar view to manage their events, allowing them to add, update, delete, and drag-and-drop events. The app utilizes Firebase for authentication and stores event data in a MySQL database.

### ▶️ Demo Link - <a href="https://youtu.be/Bfr_E7nezSA"> Youtube </a> ✅

## Features

- **Landing Page**: The home page of the application.
- **User Authentication**: 
  - Login via username and password or Google Sign-In.
  - Authentication is managed through Firebase.
- **Calendar View**:
  - Calendar displayed using the FullCalendar package.
  - Users can view, add, update, delete, and drag/drop events on the calendar.
- **Event Management**:
  - Events are persisted in a MySQL database through a Spring Boot backend.
  - Backend follows the MVC design pattern.
- **Material UI**: The app uses Material UI for a modern and responsive UI.

## Snapshots
<p>
  <img src="https://github.com/user-attachments/assets/70f8780b-e4ef-4619-ab0e-254404edded3" alt="Screenshot 1" width="30%" />
  <img src="https://github.com/user-attachments/assets/7cbb0719-e72c-4021-915e-027d86a71bec" alt="Screenshot 2" width="30%" />
  <img src="https://github.com/user-attachments/assets/eabe6544-40b6-4b2c-bf28-ee0d28e886eb" alt="Screenshot 3" width="30%" />
</p>
<p>
  <img src="https://github.com/user-attachments/assets/55bd65cb-51a8-4fee-b663-484fb22a867a" alt="Screenshot 4" width="30%" />
  <img src="https://github.com/user-attachments/assets/1ab0798f-3d80-4cb2-8ef9-ea107e991d7d" alt="Screenshot 5" width="30%" />
  <img src="https://github.com/user-attachments/assets/8bd6d34c-7659-4d0d-8850-cac524010a5f" alt="Screenshot 6" width="30%" />
</p>


## API Endpoints

- `GET /api/events/user/{userEmail}`: Retrieve all events for a user
- `POST /api/events`: Create a new event
- `PUT /api/events/{id}`: Update an existing event
- `DELETE /api/events/{id}`: Delete an event

## Future Enhancements
- User Profile Page: Add the ability for users to update their profile information.
- Event Reminders: Implement notifications or reminders for upcoming events.
- Recurring Events: Support for recurring events (weekly, monthly, etc.).
- Multi-language Support: Add support for multiple languages.

## Technologies Used

### Frontend:
- **React**: Frontend framework.
- **Material UI**: For styling the components and UI.
- **FullCalendar**: Calendar display and drag-and-drop functionality.
- **Firebase Authentication**: For user login via email/password and Google Sign-In.

### Backend:
- **Spring Boot**: Java backend framework following the MVC architecture.
- **MySQL**: Database to store event data.
- **Maven**: Project management and build tool for the backend.
- **Spring Data JPA**: For database persistence operations.

### Tools:
- **Node.js**: JavaScript runtime environment (for frontend).
- **Java**: Backend programming language.
- **Maven**: For backend dependency management.
- **Git**: Version control.

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/calendly.git
   ```

2. Frontend setup
   ```
   cd calendly-UI
   npm install
   ```

3. Backend setup
   ```
   cd calendly-server
   mvn clean install
   ```

4. Configure MySQL database
   - Create a new database named `calendly`
   - Update `application.properties` with your MySQL credentials

5. Configure Firebase
   - Set up a Firebase project and add your configuration to the frontend

## Running the Application

1. Start the backend server
   ```
   cd calendly-server
   mvn spring-boot:run
   ```

2. Start the frontend development server
   ```
   cd calendly-UI
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`


## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.

