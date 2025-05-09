import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
  Typography,
  Box
} from '@mui/material';

const StudentForm = ({ onAddStudent, user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !course) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (!user) {
      setError('You must be logged in to add a student.');
      return;
    }

    const newStudent = { name, email, course };
    onAddStudent(newStudent);

    setName('');
    setEmail('');
    setCourse('');
    setError('');
  };

  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Paper elevation={4} sx={{ padding: 4, width: 500, backgroundColor: 'white' }}>
        <Typography variant="h5" mb={2}>
          Add New Student
        </Typography>

        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Course</InputLabel>
            <Select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              label="Course"
            >
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="History">History</MenuItem>
            </Select>
            <FormHelperText>Choose the student's course</FormHelperText>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Add Student
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentForm;



