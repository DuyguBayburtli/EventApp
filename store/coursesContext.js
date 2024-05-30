import { createContext, useReducer, useState, useEffect } from 'react';
import { db } from '../firebase'; // Firestore bağlantısını içe aktar

export const CoursesContext = createContext({
  courses: [],
  isAdmin: false,
  addCourse: ({ description, amount, date }) => {},
  setCourses: (courses) => {},
  deleteCourse: (id) => {},
  updateCourse: (id, { description, amount, date }) => {},
  loginAsAdmin: () => {},
  logout: () => {},
});

function coursesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'DELETE':
      return state.filter((course) => course.id !== action.payload);
    case 'SET':
      return action.payload.reverse();
    case 'UPDATE':
      const updatableCourseIndex = state.findIndex(
        (course) => course.id === action.payload.id
      );
      const updatedCourse = { ...state[updatableCourseIndex], ...action.payload.data };
      const updatedCourses = [...state];
      updatedCourses[updatableCourseIndex] = updatedCourse;
      return updatedCourses;
    default:
      return state;
  }
}

function CoursesContextProvider({ children }) {
  const [coursesState, dispatch] = useReducer(coursesReducer, []);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = db.collection('courses');
      const snapshot = await coursesRef.get();
      const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch({ type: 'SET', payload: coursesData });
    };

    fetchCourses();
  }, []);

  function addCourse(courseData) {
    dispatch({ type: 'ADD', payload: courseData });
  }

  function deleteCourse(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setCourses(courses) {
    dispatch({ type: 'SET', payload: courses });
  }

  function updateCourse(id, courseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: courseData } });
  }

  function loginAsAdmin() {
    setIsAdmin(true);
  }

  function logout() {
    setIsAdmin(false);
  }

  const value = {
    courses: coursesState,
    isAdmin,
    addCourse,
    setCourses,
    deleteCourse,
    updateCourse,
    loginAsAdmin,
    logout,
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}

export default CoursesContextProvider;
