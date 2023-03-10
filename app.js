const express = require("express");
const app = express();
const { readFile, readdir } = require("fs/promises");

app.set("port", process.env.PORT || 3000);

app.get("/api/bands/:id", (req, res) => {
    // getting the params
    const id = req.params.id;
    //reading the file
    readFile(`${__dirname}/data/bands/${id}.json`, "utf8").then(
        (fileContents) => {
            //handling the data
            const bandData = JSON.parse(fileContents);
            //sending the response
            res.status(200).send({ band: bandData });
        }
    );
});

app.get("/api/songs", (req, res) => {
    const genre = req.query.genre;
    readdir(`${__dirname}/data/songs`)
        .then((fileNames) => {
            const pendingReads = fileNames.map((fileName) => {
                return readFile(`${__dirname}/data/songs/${fileName}`, "utf-8");
            });
            return Promise.all(pendingReads);
        })
        .then((fileContents) => {
            const songs = fileContents.map((file) => {
                return JSON.parse(file);
            });

            if (genre) {
                const requestedSongs = songs.filter((song) => {
                    return song.genre === genre;
                });
                res.status(200).send({ songs: requestedSongs });
            } else {
                res.status(200).send({ songs });
            }
        });
});

app.listen(app.get("port"), () => {
    console.info(`Server listen on port ${app.get("port")}`);
});
