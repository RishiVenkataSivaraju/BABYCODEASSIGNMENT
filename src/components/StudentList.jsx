import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from '@mui/material';

function StudentList({ students, courseFilter, loading }) {
  // Filter students by course
  const filteredStudents = courseFilter
    ? students.filter(student => student.course.toLowerCase() === courseFilter.toLowerCase())
    : students;

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" mb={2}>Student List</Typography>
      {filteredStudents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredStudents.map(student => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card elevation={3} sx={{ backgroundColor: 'white', padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{student.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Email: {student.email}</Typography>
                  <Typography variant="body2" color="textSecondary">Course: {student.course}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No students found.</Typography>
      )}
    </Box>
  );
}

export default StudentList;

