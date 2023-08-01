
## Run the project with docker compose
0.  Create .env
    ```
      cp .env.example .env
    ```

1.  Build the images

    ```
    $ docker compose --env-file ./config/.env build
    ```

2.  Start the containers

    ```
    $ docker compose --env-file ./config/.env up -d
    ```

## SUMMARY
Unfortunately, the given time was not enough to create a proper application. I am absolutely not satisfied, I did not have enough time to handle all the cases at every API endpoint. After I realized this, I started focusing on the functionality.
Moreover, I did not have time to make tests which is unacceptable.
If I would get 1-2 hours more I could be finished properly.
