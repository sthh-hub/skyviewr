# Skyviewr

Skyviewr is a simple web application designed to provide real-time weather data and track user interactions. This project leverages a microservices architecture, including a React frontend, Express backend, and AWS services for storage and data processing.

---

## Architecture Overview

```plaintext
                      +--------------------+
                      |   React Frontend   |  (Dockerized)
                      +--------------------+
                                |
            User Interactions   |   Fetch/Send Data
                                v
    +---------------------+     ^     +----------------------+
    | External Weather API|<----|---->| Express Backend API  |  (Dockerized)
    +---------------------+           +----------------------+
                |                                |
       Fetch Weather Data                Store Interactions
                |                                |
    +---------------------+           +----------------------+
    |     AWS DynamoDB    |<----------|  AWS Lambda (Agg.)   |
    +---------------------+           +----------------------+
