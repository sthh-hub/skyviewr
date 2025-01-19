# skyviewr


                 +--------------------+
                 |   React Frontend   |  (Dockerized)
                 +--------------------+
                           |
         User Interactions | Fetch/Send Data
                           v
 +---------------------+   ^    +----------------------+
 | External Weather API|<--|--->| Express Backend API  |  (Dockerized)
 +---------------------+        +----------------------+
            |                          |
    Fetch Weather Data           Store Interactions
            |                          |
 +---------------------+        +----------------------+
 |     AWS DynamoDB    |<-------|  AWS Lambda (Agg.)   |
 +---------------------+        +----------------------+

