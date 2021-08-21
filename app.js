const express = require("express");
const https = require("https");
// const postmanRequest = require("postman-request");
// const request = require("request");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/fd013d007c";

  const options = {
    method: "POST",
    auth: "cody:3dc2874ef7b9854e28de1d8309c84024-us5",
  }

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});

// mailchip apiKey
// 3dc2874ef7b9854e28de1d8309c84024-us5

// audience list id
// fd013d007c
