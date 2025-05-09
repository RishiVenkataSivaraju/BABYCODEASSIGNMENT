import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Login from './components/Login';
import { Button, TextField, Box, Typography } from '@mui/material';

function App() {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { id: 1, name: 'Alice', email: 'alice@example.com', course: 'Math' },
        { id: 2, name: 'Bob', email: 'bob@example.com', course: 'Science' },
      ]);
    }, 1000);
  }, []);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, { id: Date.now(), ...newStudent }]);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };
 const filteredStudents = students.filter((student) =>
    student.course.toLowerCase().includes(courseFilter.toLowerCase())
  );


  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        {user ? (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Welcome, {user.displayName || 'User'}</Typography>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Login onLogin={setUser} />
        )}
      </header>

      {user && (
        <>
          <StudentForm onAddStudent={handleAddStudent} user={user} />

          <Box mt={4} mb={2}>
            <TextField
              label="Filter by Course"
              variant="outlined"
              fullWidth
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            />
          </Box>
        </>
      )}

      <StudentList students={filteredStudents} loading={loading} courseFilter={courseFilter} />
    </Box>
  );
}

export default App;





