# Scraping-system

This project was tested on node v14.15.3 and mongodb v4.4.5

## configuration

The service use environment variable for its configuration, you can override the default configuration by add `.env` file in the root folder or declare the relevant environment variable before the running commnd.  

| name | description | default value
|-|-|-|
| PORT | port that server listen | 3000
| MONGO_HOST |  mongo host | localhost
| MONGO_PORT | mongo port | 27017
| MONGO_DATABASE| database name for connection | test

## installation and running

1. install dependencies with `npm install`
2. start the server with `npm start`

## assumptions

### Database

I assumed that the data structure do not contain reference for each url and sub links, each url just contain its html.  
In that case i used mongoDB, because i am familiar with it and it was more convenient for me to integrate with it within the time limit.  
___
In case the data structure do contain reference, I would consider use graphDB like neo4j because our problem is structured as graph of links and urls.  

### mock parser

I assumed that the mock parser is synchronous function that perform instructions for long time.   
So I handle it as worker thread so it will not stuck the main event loop which will cause the server to be unavailable  for new requests.
___
In case the mock parser was asynchronous, I would handle it as regular async operation and let the libuv thread pool handle it just like any I/O operations.

### '/parse' endpoint result

I assumed that '/parse' endpoint will return the result immediately after parsing each url and sub-links.
___
In case it was not mendetory, I might purpose this server only to get requests for scraping and send the url to queue managment like rabbitMQ, then let another service(s) handle the actual parse url and sub-links.

### html update
I assumed it was possible for the contents of the url to change, so I updated the html each time in the database  