import axios from "axios";
import useSWR from "swr";

const useStudent = () => {
  console.log("running useStudent");
  const swr = useSWR("../api/student", async function (url) {
    const { student } = (await axios.get(url)).data;
    console.log("result", student);
    return student;
  });

  const student: Student | undefined = swr.data;

  return { student, ...swr };
};

export default useStudent;
