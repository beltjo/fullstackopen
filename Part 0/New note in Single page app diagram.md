```mermaid
sequenceDiagram
    browser -->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    activate server
    server -->> database: Append new note to database
    activate database
    database -->> server: Return confirmation that note was added.
    deactivate database
    server -->> browser: Return confirmation that note was added.

    deactivate server
    browser -->> browser: Add new note to <ul> locally with javascript.
```