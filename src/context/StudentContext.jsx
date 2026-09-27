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
  { classNo: 1, date: 'Wed, Sep 2, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 2, date: 'Fri, Sep 4, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 3, date: 'Mon, Sep 7, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 4, date: 'Wed, Sep 9, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 5, date: 'Fri, Sep 11, 2026', month: 'Sep 2026', status: 'ABSENT' },
  { classNo: 6, date: 'Mon, Sep 14, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 7, date: 'Wed, Sep 16, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 8, date: 'Fri, Sep 18, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 9, date: 'Mon, Sep 21, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 10, date: 'Wed, Sep 23, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 11, date: 'Fri, Sep 25, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 12, date: 'Mon, Sep 28, 2026', month: 'Sep 2026', status: 'PRESENT' },
  { classNo: 13, date: 'Wed, Sep 30, 2026', month: 'Sep 2026', status: 'ABSENT' }
];

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

const DEFAULT_STUDENT = {
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

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('smit_student_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STUDENT,
          ...parsed,
          attendance: parsed.attendance || DEFAULT_STUDENT.attendance,
          assignment: parsed.assignment || DEFAULT_STUDENT.assignment,
          attendanceStats: parsed.attendanceStats || DEFAULT_STUDENT.attendanceStats,
          attendanceRecords: parsed.attendanceRecords || DEFAULT_ATTENDANCE_LIST,
          modules: parsed.modules || DEFAULT_MODULES,
          assignments: parsed.assignments || DEFAULT_ASSIGNMENTS,
          feeRecords: parsed.feeRecords || DEFAULT_STUDENT.feeRecords
        };
      }
      return DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  });

  useEffect(() => {
    localStorage.setItem('smit_student_data', JSON.stringify(student));
  }, [student]);

  const updateProfile = (updatedData) => {
    setStudent((prev) => ({ ...prev, ...updatedData }));
  };

  const submitAssignment = (id, submissionUrl) => {
    setStudent((prev) => {
      const updatedList = (prev.assignments || []).map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'SUBMITTED',
            submissionUrl: submissionUrl
          };
        }
        return item;
      });
      return { ...prev, assignments: updatedList };
    });
  };

  return (
    <StudentContext.Provider value={{ student, updateProfile, submitAssignment }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);