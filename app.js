const express = require("express");
const app = express();
const { readFile } = require("fs/promises");

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

app.listen(app.get("port"), () => {
    console.info(`Server listen on port ${app.get("port")}`);
});
