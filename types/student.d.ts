type StudentInfo = {
  name: string;
  imageURL: string;
};

type Cgpa = {
  sessionName: string;
  gpaValue: string;
  cgpaValue: string;
};

type Result = {
  sessionName: string;
  gpaValue: string;
  cgpaValue: string;
  status: string;
  remarks: string;
  sessionName: string;
  courseCode: string;
  courseName: string;
  courseGrade: string;
};

type ImaluumData = {
  info: StudentInfo;
  courses: Courses[];
  results: Results[];
};
