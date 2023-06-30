const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (request, response, next) => {
  const cookieValue = request.headers.cookie;
  const tokenRegex = /token=([^;]+)/;
  const tokenMatch = cookieValue.match(tokenRegex);
  let token;
  if (tokenMatch) {
    token = tokenMatch[1];
  } else {
    return response.status(400).send("No token!");
  }
  console.log(token);
  jwt.verify(token, "ANEESH", (err, res) => {
    if (err) {
      throw err;
    }
    request.user = res;
    next();
  });
};

module.exports = { verify };
