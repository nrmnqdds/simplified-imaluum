type StudentInfo = {
  name: string;
  imageURL: string;
  matricNo: string;
  password?: string;
};

type Cgpa = {
  sessionName: string;
  gpaValue: string;
  cgpaValue: string;
};

type Result = {
  sessionName: string;
  sessionQuery: string;
  gpaValue: string;
  cgpaValue: string;
  status: string;
  remarks: string;
  result: {
    courseCode: string;
    courseName: string;
    courseGrade: string;
  }[];
};

type ImaluumData = {
  info: StudentInfo;
  courses: Courses[];
  results: Results[];
};
