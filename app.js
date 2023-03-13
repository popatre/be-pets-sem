const express = require("express");
const app = express();
const { readFile, readdir, writeFile } = require("fs/promises");

app.use(express.json());
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
                const queriedSongs = songs.filter((song) => {
                    return song.genre === genre;
                });
                res.status(200).send({ songs: queriedSongs });
            } else {
                res.status(200).send({ songs });
            }
        });
});

app.patch("/api/bands/:id", (req, res) => {
    const newYear = req.body.year;
    const bandId = req.params.id;

    readFile(`${__dirname}/data/bands/${bandId}.json`, "utf-8")
        .then((fileContents) => {
            const bandInfo = JSON.parse(fileContents);

            bandInfo.yearFormed = newYear;

            writeFile(
                `${__dirname}/data/bands/${bandId}.json`,
                JSON.stringify(bandInfo)
            );

            return bandInfo;
        })
        .then((bandInfo) => {
            res.status(200).send({ band: bandInfo });
        });
});

app.listen(app.get("port"), () => {
    console.info(`Server listen on port ${app.get("port")}`);
});
