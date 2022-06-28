const client = require("./db_config");
const express = require("express");
const port = process.env.PORT || 5001;
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});
client.connect().then(() => console.log("Connected!"));

app.get("/custom-search", async (req, res) => {
  const response = await axios.post("https://www.zaubacorp.com/custom-search", {
    search: req.query.search,
    filter: "company",
  });
  console.log("res", typeof response.data);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(response.data);
});

app.get("/companies", (req, res) => {
  console.log("here");
  client.query(`Select * from public."Company"`, (err, result) => {
    if (!err) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.send(result.rows);
    }
  });
  client.end;
});

app.post("/add_company", (req, res) => {
  // console.log(req)
  const { company_name, cin } = req.body;
  client.query(
    `Insert into public."Company" (company_name, cin) values ($1, $2)`,
    [company_name, cin],
    (err, result) => {
      if (!err) {
        res.json({ status: true, message: "Company Added!" });
      } else {
        res.json({ status: false, message: "Couldn't add company!" });
      }
    }
  );
  client.end;
});
