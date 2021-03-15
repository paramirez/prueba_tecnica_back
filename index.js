const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.post("/auth", async (req, res, next) => {
  const { url, id, secret, code } = req.body;
  try {
    const result = await axios.post(
      url,
      { client_id: id, client_secret: secret, code },
      { headers: { accept: "application/json" } }
    );
    res.json(result.data);
  } catch (err) {
    console.log(err);
    res.json({ err: err.message || "error" });
  }
});
app.get("/", (req, res, next) => res.send("funcionando"));
app.listen(8001, () => console.log("Funcionado en " + 8001));
