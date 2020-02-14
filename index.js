const express = require("express");
const server = express();
const apiRoute = require("./routes/apiRoute.js");
const port = 5000;
server.use(express.json()); //middleware for reading json
server.use("/api", apiRoute);
server.get("/", (req, res) => {
   res.send(`<h1>Welcome to LS Week 13 Sprint</h1>`);
});
server.listen(port, () => {
   console.log(`Server listening on port http://localhost:${port}`);
});
