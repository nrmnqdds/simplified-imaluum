const request = require("request-promise");

async function tryLogin() {
  const options = {
    method: "POST",
    url: "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome",
    formData: {
      username: "2214227",
      password: "Qryskalyst1_",
      execution: "e1s1",
      _eventId: "submit",
      geolocation: "",
    },
  };
  try {
    const response = await request(options);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

tryLogin();
