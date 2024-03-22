# YOLO Backend Project README

## Introduction
Welcome to the YOLO Backend Repository. The YOLO platform is a cutting-edge social media application that focuses on user engagement and interactive content sharing. This README provides detailed guidelines for setting up, developing, and contributing to the YOLO backend.

## Technology Stack
- **Programming Languages**: Java 11, leveraging the Spring Boot framework for building RESTful APIs.
- **Database**: Use of both SQL (MySQL/PostgreSQL) and NoSQL (MongoDB) databases, optimizing data storage and retrieval.
- **Development Tools**: IntelliJ IDEA for code development, and Git for version control and source code management.

## Architecture
The backend architecture is built on microservices, ensuring system scalability and resilience. Key features include:
- Service-oriented architecture for modular and maintainable code.
- Implementation of JWT for secure authentication.
- Usage of WebSocket for real-time communication features.

## Setup and Installation
### Prerequisites
- Java Development Kit (JDK) version 11 or above.
- Maven 3.6 or above for managing project dependencies.
- A running instance of SQL (like MySQL) and/or NoSQL (like MongoDB) databases.

### Installation Steps
1. Clone the repository using `git clone [repository-url]`.
2. Open the project with IntelliJ IDEA.
3. Install Maven dependencies specified in `pom.xml` files.
4. Configure your database connection settings in the `application.properties` files.

## Running the Application
1. In IntelliJ IDEA, run the `{projectname}.java` files to start the Spring Boot application.
2. Ensure your database is running and properly connected.
3. Access the application at `http://localhost:808{0...6}`.

## API Endpoints

### Reactions API
- **PUT /api/reactions/{postId}/follow**: Add a like to a post.
- **POST /api/reactions/**: Add a reaction.
- **DELETE /api/reactions/{postId}/unlike**: Remove a like from a post.
- **GET /api/reactions/{postId}/liked**: Get likes for a post.

### Content API
- **GET /api/content/getFeedPosts/{userId}**: Retrieve feed posts for a user.
- **GET /api/content/getSuggestedPosts/{userId}**: Get suggested posts for a user.
- **GET /api/content/getFeedStories/{userId}**: Get feed stories for a user.
- **GET /api/content/getRandomFeedStories**: Get random feed stories.

### Notification API
- **PUT /api/notification/{id}**: Update a notification.
- **DELETE /api/notification/{id}**: Delete a notification.
- **GET /api/notification/{id}**: Get a specific notification.
- **POST /api/notification**: Create a new notification.
- **GET /api/notification**: Get all notifications.

### User API
- **POST /api/login**: User login.
- **PUT /api/user/update**: Update user information.
- **PATCH /api/user/updateProfilePicture**: Update user's profile picture.
- **POST /api/user/register**: Register a new user.
- **POST /api/user/{userId}/change-password**: Change a user's password.
- **GET /api/user/{userId}/change-password**: Fetch change password request.
- **POST /api/user/forgot-password/{userId}**: Password reset for forgotten password.
- **GET /api/user/forgot-password/{userId}**: Get forgotten password request.
- **DELETE /api/user/delete/{userId}**: Delete a user.
- **GET /api/user/getSession/{userId}**: Get user session.
- **GET /api/user/getUserWithId:{id}**: Get user by ID.
- **GET /api/user/allUsers**: Get all users.
## Testing
- Extensive unit and integration tests are located in the `/tests` directory.
- Execute tests via IntelliJ or using the Maven command: `mvn clean test`.
- Ensure all tests pass before pushing code changes.

## Contribution Guidelines
Contributions to the YOLO backend are highly appreciated. Please adhere to the following guidelines:
- Follow established code styles and best practices.
- Write clear, maintainable, and testable code.
- Provide comprehensive commit messages.
- Create pull requests for proposed changes, ensuring all CI checks pass.
