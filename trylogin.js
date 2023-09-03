// https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome

const superagent = require("superagent").agent();

const Login = async () => {
  const dashboard = await superagent
    .post(
      "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome"
    )
    .send({
      username: "2214227",
      password: "Qryskalyst1_",
      execution: "e1s1",
      _eventId: "submit",
      geolocation: "",
    })
    .set("Content-Type", "application/x-www-form-urlencoded");

  console.log(dashboard.text);
};

Login();
