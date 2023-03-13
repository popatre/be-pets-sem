# Sem B (2) Guidance

Objectives

-   Demonstrate how to handle multiple reads using Promise.all
-   Explore creating a path that accepts queries
-   Revise the key syntax of Express

This guidance uses bands and songs data

---

GET /songs

-   responds with an array containing all of the songs.

/api/songs?genre=pop

-   This endpoint should accept a query of genre so that users can filter songs by their genre, e.g. GET /api/songs?genre=pop responds with an array containing all the songs with a genre of pop

---

## Main Learning Points

### **Handle multiple reads/pending promises**

Reading all the songs.
They need readdir to get directory names, then multiple readFiles using these.

-   Bundle the pending reads into an array then Promise.all them through the .then
-   Promise.all return an array with resolved data in the same order

**Possible Questions**:

-   What does fs.readFile evaluate to? (A pending promise)
-   Where should the next .then go?
-   How can we resolve multiple promises at the same time?

**Common Mistakes**

-   Nesting .thens onto the readFile (Helpful to ask what are the 'rules' of .thens and where should the next .then go i.e. onto the end of the previous)
-   Nesting, then pushing to an array, with a counter - essentially like callbacks.

---

### **Recap sending back response - in object with a key**.

-   Parse the promise.all array - can take suggestions on an array method i.e. .map
-   recap how to send a response back

    -   status code
    -   in an object with appropriate key - most likely `{songs}`

---

### **Accepting a query /api/songs?genre=pop**

-   Question where would we be able to access this data and what key would make most sense i.e. req.query
-   console log result to show object - diff example of other queries to show the key changing in the object
-   Show undefined if no query
-   `const genre = req.query.genre`

    -   Optional: destructure `const {genre} = req.query`

-   Now theres access to the query - .filter needed using this query of all the songs.

-   if statement to handle genre and no genre.

**Possible Questions**:

-   How could we get access to the query?
-   What key would make sense?
-   What do you think it would evaluate to if theres no query?
-   How could we use this query to get the songs with the genre asked for?
-   How would be handle this is theres no query i.e. they want all the songs?
