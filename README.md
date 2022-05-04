# URL Shortening #
The main purpose of this app is to provide a 8 character unique identifier for any given URL.

## Starting the app

``yarn start``

By default this will run the Express server on `http://locahost:4000`.
The port can be changed from the `.env` file.

## Testing the app
The backend has a suite of unit and e2e tests that can be run via `yarn test`

The graphql interface and manual testing can be done via visiting `http://localhost:4000/graphql`.

GraphQL examples queries/mutations:
```
mutation shortenUrl($longUrl: String!) {
    shortenUrl(longUrl: $longUrl) {
        originalUrl
        shortUrl
    }
}

query listShortUrls($afterId: String, $limit: Int) {
    shortUrls(afterId: $afterId, limit: $limit) {
        id
        originalUrl
        shortUrl
    }
}
```

## Spinning up containers
The app runs using 3 containers. A frontend, a backend and a database.
They can be spun up using `docker-compose up`.
This will allow the frontend app to be viewed at `http://localhost:3000/`
