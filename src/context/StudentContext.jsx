import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

const DEFAULT_ASSIGNMENTS = [
  {
    id: 1,
    title: 'test',
    tag: null,
    topics: 'No topics',
    dueDate: 'September 25, 2026',
    status: 'NOT SUBMITTED',
    isClosed: false,
    submissionUrl: ''
  },
  {
    id: 2,
    title: 'Student Portal',
    tag: null,
    topics: 'No topics',
    dueDate: 'September 24, 2026',
    status: 'NOT SUBMITTED',
    isClosed: true,
    submissionUrl: ''
  },
  {
    id: 3,
    title: 'Admin panel (E commerce Dashboad)',
    tag: null,
    topics: '7 Topics',
    dueDate: 'September 10, 2026',
    status: 'LATE SUBMITTED',
    isClosed: false,
    submissionUrl: 'https://github.com/example/ecommerce-admin'
  },
  {
    id: 4,
    title: 'QUICKSERVE WMA (Batch-20)',
    tag: 'HACKATHON',
    topics: 'No topics',
    dueDate: 'August 30, 2026',
    status: 'NOT SUBMITTED',
    isClosed: true,
    submissionUrl: ''
  },
  {
    id: 5,
    title: 'E-Commerce Website (React js)',
    tag: null,
    topics: '4 Topics',
    dueDate: 'August 17, 2026',
    status: 'APPROVED',
    isClosed: false,
    submissionUrl: 'https://github.com/example/react-store'
  },
  {
    id: 6,
    title: 'Portfolio Website Design',
    tag: null,
    topics: '3 Topics',
    dueDate: 'August 10, 2026',
    status: 'NOT SUBMITTED',
    isClosed: true,
    submissionUrl: ''
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 7,
    title: `Project Task #${i + 1} (JavaScript / CSS)`,
    tag: null,
    topics: `${(i % 3) + 2} Topics`,
    dueDate: `July ${15 + i}, 2026`,
    status: 'APPROVED',
    isClosed: false,
    submissionUrl: 'https://github.com/example/task-repo'
  }))
];

const DEFAULT_ATTENDANCE_LIST = [
  // Aug 2026
  { classNo: 1, date: 'Mon, Aug 3, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 2, date: 'Wed, Aug 5, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 3, date: 'Fri, Aug 7, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 4, date: 'Mon, Aug 10, 2026', month: 'Aug 2026', status: 'ABSENT' },
  { classNo: 5, date: 'Wed, Aug 12, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 6, date: 'Fri, Aug 14, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 7, date: 'Mon, Aug 17, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 8, date: 'Wed, Aug 19, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 9, date: 'Fri, Aug 21, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 10, date: 'Mon, Aug 24, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 11, date: 'Wed, Aug 26, 2026', month: 'Aug 2026', status: 'PRESENT' },
  { classNo: 12, date: 'Fri, Aug 28, 2026', month: 'Aug 2026', status: 'PRESENT' },
  // Sep 2026
  { classNo: 13, date: 'Wed, Sep 2, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 14, date: 'Fri, Sep 4, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 15, date: 'Mon, Sep 7, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 16, date: 'Wed, Sep 9, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 17, date: 'Fri, Sep 11, 2026', month: 'Sep 2026', status: 'ABSENT' },
  { classNo: 18, date: 'Mon, Sep 14, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 19, date: 'Wed, Sep 16, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 20, date: 'Fri, Sep 18, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 21, date: 'Mon, Sep 21, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 22, date: 'Wed, Sep 23, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 23, date: 'Fri, Sep 25, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 24, date: 'Mon, Sep 28, 2026', month: 'Sep 2026', status: 'PRESENT' }
];

const DEFAULT_QUIZZES = {
  upcoming: [],
  completed: [
    { id: 1, title: 'Quiz 1: HTML & CSS Core', date: 'July 20, 2026', score: 90, total: 100 },
    { id: 2, title: 'Quiz 2: JavaScript ES6 & DOM', date: 'August 14, 2026', score: 80, total: 100 }
  ]
};

const DEFAULT_MODULES = [
  {
    id: 1,
    title: 'Web Designing',
    completed: 20,
    total: 20,
    percentage: 100,
    subTopics: [
      'HTML5 Semantic Tags & Structure',
      'CSS3 Flexbox & Grid Systems',
      'Responsive Web Design & Media Queries',
      'Bootstrap 5 Framework',
      'Tailwind CSS Basics & Components'
    ]
  },
  {
    id: 2,
    title: 'Front-End Development',
    completed: 27,
    total: 31,
    percentage: 87,
    subTopics: [
      'JavaScript ES6+ Syntax & Features',
      'DOM Manipulation & Event Handling',
      'Asynchronous JS, Promises & Async/Await',
      'Fetch API & RESTful Endpoints',
      'Local Storage & Session Storage'
    ]
  },
  {
    id: 3,
    title: 'Modern Front-End Development',
    completed: 10,
    total: 14,
    percentage: 71,
    subTopics: [
      'React Fundamentals & JSX',
      'State & Props Management',
      'React Hooks (useState, useEffect, useContext)',
      'React Router DOM v6',
      'Custom Hooks & Performance Optimization'
    ]
  },
  {
    id: 4,
    title: 'Back-End Development',
    completed: 1,
    total: 16,
    percentage: 6,
    subTopics: [
      'Node.js Runtime & NPM Ecosystem',
      'Express.js Server & Routing',
      'MongoDB & Mongoose Schema Modeling',
      'JWT Authentication & Password Hashing',
      'Deployment on Cloud Platforms'
    ]
  }
];

const DATA_VERSION = 2;

const DEFAULT_STUDENT = {
  dataVersion: DATA_VERSION,
  name: 'Muhammad Hassan',
  rollNumber: '770860',
  batch: '20',
  campus: 'Zaitoon Ashraf IT Park',
  city: 'Karachi',
  courseName: 'Modern Web Application Development',
  progress: 75,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  // Backward compatible keys for Dashboard
  attendance: { attended: 92, total: 113 },
  assignment: { completed: 14, total: 18 },
  // Modern keys for Detailed Pages
  attendanceStats: {
    totalClasses: 113,
    present: 92,
    leave: 0,
    absent: 21
  },
  attendanceRecords: DEFAULT_ATTENDANCE_LIST,
  modules: DEFAULT_MODULES,
  assignments: DEFAULT_ASSIGNMENTS,
  quizzes: DEFAULT_QUIZZES,
  nextDueDate: '10 Oct 2026',
  feeRecords: [
    {
      month: 'August 2026',
      amount: 'Rs. 1,000',
      type: 'Tuition Fee',
      dueDate: '10 Aug 2026',
      voucherId: 'VCH-88291',
      status: 'Paid'
    },
    {
      month: 'September 2026',
      amount: 'Rs. 1,000',
      type: 'Tuition Fee',
      dueDate: '10 Sep 2026',
      voucherId: 'VCH-99412',
      status: 'Paid'
    }
  ]
};

function loadStudent() {
  try {
    const saved = localStorage.getItem('smit_student_data');
    if (!saved) return DEFAULT_STUDENT;
    const parsed = JSON.parse(saved);
    // Purana saved data ho to sirf profile (name/roll/avatar) rakho, baqi naya default lo
    if (parsed.dataVersion !== DATA_VERSION) {
      return {
        ...DEFAULT_STUDENT,
        name: parsed.name || DEFAULT_STUDENT.name,
        rollNumber: parsed.rollNumber || DEFAULT_STUDENT.rollNumber,
        avatar: parsed.avatar || DEFAULT_STUDENT.avatar,
        assignments: parsed.assignments || DEFAULT_ASSIGNMENTS
      };
    }
    return { ...DEFAULT_STUDENT, ...parsed };
  } catch {
    return DEFAULT_STUDENT;
  }
}

// Due date ke baad submit ho to LATE SUBMITTED, warna SUBMITTED
function statusForSubmission(dueDate) {
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) return 'SUBMITTED';
  due.setHours(23, 59, 59, 999);
  return new Date() > due ? 'LATE SUBMITTED' : 'SUBMITTED';
}

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(loadStudent);

  useEffect(() => {
    try {
      localStorage.setItem('smit_student_data', JSON.stringify(student));
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  }, [student]);

  const updateProfile = (updatedData) => {
    setStudent((prev) => ({ ...prev, ...updatedData }));
  };

  const submitAssignment = (id, submissionUrl) => {
    setStudent((prev) => ({
      ...prev,
      assignments: (prev.assignments || []).map((item) =>
        item.id === id
          ? { ...item, status: statusForSubmission(item.dueDate), submissionUrl }
          : item
      )
    }));
  };

  return (
    <StudentContext.Provider value={{ student, updateProfile, submitAssignment }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);