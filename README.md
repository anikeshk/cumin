# Cumin

Cumin is a **scalable and secure** task management tool designed to handle tasks efficiently at any scale. Built with a **microservices architecture**, it ensures seamless performance while keeping security at its core.

**🔥 Features at a Glance**
- **Authentication & Security** – JWT-based authentication for secure user access.
- **Microservice Architecture** – A robust Node.js backend, orchestrated with NGINX as a reverse proxy.
- **Real-time Notifications** – Stay updated with WebSockets-powered alerts using Sockets.io .

**☁️ AWS-Powered Infrastructure**
Cumin takes full advantage of AWS services for reliability and performance:

- **Databases** – Amazon RDS (PostgreSQL) & Amazon DynamoDB for structured and NoSQL storage.
- **Messaging & Queues** – Amazon SQS handles asynchronous task processing like a pro.
- **Serverless Processing** – AWS Lambda executes background tasks with efficiency.
- **Storage** – Amazon S3 keeps your files safe and accessible.

More features coming soon! Stay tuned for updates 👉 [anikeshk.com/project/cumin](https://anikeshk.com/project/cumin/)

![](./resources/v1/cumin-architecture-v1.jpg)

Reach out to Anikesh for questions or to discuss this project: anikesh.kamath@gmail.com .

## Sequence Diagrams

**1. Standard Auth and API Flow**

This is the standard API Request/Response flow when an user uses Cumin. 

```mermaid
sequenceDiagram
    Cumin->>Auth: Login
    Auth->>Cumin: Access Token + Refresh Token (JWT)
    Cumin->>API: Request for projects/tasks
    critical Verify JWT tokens
        API-->>API: Verify access token
    option Expired
        API-->>Cumin: Response with token expired
        Cumin-->>Auth: Request for new access token
        Auth-->>Auth: Verify refresh token
        Auth-->>Cumin: Response with new access token
    option Credentials rejected
        API-->>Cumin: Response with invalid token
    end
    API-->RDS/DynamoDB: Query data
    API->>Cumin: Response with list of projects/tasks
```

- The access token has an expiry of 15 mins, and the refresh token has an expiry of 7 days.
- The same flow is applicable to adding projects/tasks, updating tasks, and creating a new export job.

**2. Tasks Aggregator**

This is what happens when the user updates the status of any task.

```mermaid
sequenceDiagram
  participant Cumin
  participant API
  participant DynamoDB
  participant RDS
  Cumin->>API: Request with task status changed
  API-->DyanmoDB: Query to update task
  API->>Cumin: Response with updated successfully
  loop aggregate
    DynamoDB-->>Lambda: New event triggered using DynamoDB Streams
    Lambda-->>RDS: Aggregates status and updates RDS with the counts
  end
  Cumin->>API: Opens Projects page
  API--> RDS: Query data
  API->>Cumin: Response with projects and count

```


**3. Tasks Exporter**

This is what happens when the user creates an export job for any project.

```mermaid
sequenceDiagram
  participant Cumin
  participant API
  participant Sockets
  Cumin->>API: Create an export job
  API-->>DynamoDB: Creates a new entry in "jobs" table
  API->>Cumin: Response with job created successfully
  loop export
    DynamoDB-->>Lambda: New event triggered using DynamoDB Streams
    Lambda-->>Lambda: Exports tasks to CSV and uploads to S3
    Lambda-->SQS: Send a message with S3 URL
  end
  SQS-->>Sockets: Receives message from queue
  Sockets->>Cumin: Emits a notification with the S3 URL
``` 