type StudentInfo = {
  name: string;
  imageURL: string;
};

type Cgpa = {
  sessionName: string;
  gpaValue: string;
  cgpaValue: string;
};

type ImaluumData = {
  info: StudentInfo;
  courses: Courses[];
  cgpa: Cgpa[];
};
