import express = require("express");

const app = express();
const port = 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/endpoint", (req, res) => {
  res.json({ msg: "Hello world and you!" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
