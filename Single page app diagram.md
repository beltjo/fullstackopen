```mermaid
sequenceDiagram
    participant browser
    participant server
    participant database


    browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->> browser: Return HTML document
    deactivate server

    browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: Return stylesheet
    deactivate server

    browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: Return javascript file.
    deactivate server

    browser -->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server

    server -->> database: Fetch note data
    activate database
    database -->> server: Return note data
    deactivate database

    server -->> browser: Return note data
    deactivate server


    browser -->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    activate server
    server -->> database: Append new note to database
    activate database
    database -->> server: Return confirmation that note was added.
    deactivate database
    server -->> browser: Return confirmation that note was added.

    deactivate server
    browser -->> browser: Update notes locally with new note



```