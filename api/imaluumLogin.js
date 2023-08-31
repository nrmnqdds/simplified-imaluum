import axios from "axios";

const imaluumLogin = async ({ username, password }) => {
  const data = {
    username: username,
    password: password,
  };

  if (data.username === "" || data.password === "") {
    return;
  }

  const response = axios.post(
    "https://cas.iium.edu.my:8448/cas/login?service=https%3a%2f%2fimaluum.iium.edu.my%2fhome",
    data
  );
  console.log(response);
};

export default imaluumLogin;
