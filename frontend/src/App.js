import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Classes from './components/Classes';
import Schedules from './components/Schedules';
import Grades from './components/Grades';
import Attendance from './components/Attendance';
import Profile from './components/Profile';
import AdmissionDetails from './components/AdmissionDetails';
import AttendanceRecords from './components/AttendanceRecords';
import AttendanceReports from './components/AttendanceReports';
import ExamSchedules from './components/ExamSchedules';
import ExamResults from './components/ExamResults';
import OnlineExams from './components/OnlineExams';
import ClassSchedules from './components/ClassSchedules';
import BookSearch from './components/BookSearch';
import LoanManagement from './components/LoanManagement';
import OnlineClasses from './components/OnlineClasses';
import ClassMaterials from './components/ClassMaterials';
import ProgressTracking from './components/ProgressTracking';
import Messages from './components/Messages';
import Documents from './components/Documents';
import UploadAssignment from './components/UploadAssignment';
import TaskTracking from './components/TaskTracking';
import TaskSubmission from './components/TaskSubmission';
import TeacherProfile from './components/TeacherProfile';
import AdmissionManagement from './components/AdmissionManagement';
import AttendanceManagement from './components/AttendanceManagement';
import GradeManagement from './components/GradeManagement';
import ExamManagement from './components/ExamManagement';
import TimetableManagement from './components/TimetableManagement';
import Notifications from './components/Notifications';
import AcademicReports from './components/AcademicReports';
import UserManagement from './components/UserManagement';
import SystemSettings from './components/SystemSettings';
import BackupRestore from './components/BackupRestore';
import AuditLogs from './components/AuditLogs';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Container>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/students" component={Students} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/classes" component={Classes} />
        <Route path="/schedules" component={Schedules} />
        <Route path="/grades" component={Grades} />
        <Route path="/attendance" component={Attendance} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/admission/:id" component={AdmissionDetails} />
        <Route path="/attendance/records/:id" component={AttendanceRecords} />
        <Route path="/attendance/reports/:id" component={AttendanceReports} />
        <Route path="/examSchedules/:id" component={ExamSchedules} />
        <Route path="/examResults/:id" component={ExamResults} />
        <Route path="/onlineExams/:id" component={OnlineExams} />
        <Route path="/classSchedules/:id" component={ClassSchedules} />
        <Route path="/bookSearch" component={BookSearch} />
        <Route path="/loanManagement/:id" component={LoanManagement} />
        <Route path="/onlineClasses/:id" component={OnlineClasses} />
        <Route path="/classMaterials/:id" component={ClassMaterials} />
        <Route path="/progressTracking/:id" component={ProgressTracking} />
        <Route path="/messages/:recipient" component={Messages} />
        <Route path="/documents" component={Documents} />
        <Route path="/uploadAssignment/:id" component={UploadAssignment} />
        <Route path="/taskTracking/:id" component={TaskTracking} />
        <Route path="/taskSubmission/:id" component={TaskSubmission} />
        <Route path="/teacherProfile/:id" component={TeacherProfile} />
        <Route path="/admissionManagement" component={AdmissionManagement} />
        <Route path="/attendanceManagement/class/:id" component={AttendanceManagement} />
        <Route path="/gradeManagement/class/:id" component={GradeManagement} />
        <Route path="/examManagement/class/:id" component={ExamManagement} />
        <Route path="/timetableManagement/class/:id" component={TimetableManagement} />
        <Route path="/notifications/:id" component={Notifications} />
        <Route path="/academicReports/class/:id" component={AcademicReports} />
        <Route path="/attendanceReports/class/:id" component={AttendanceReports} />
        <Route path="/userManagement" component={UserManagement} />
        <Route path="/systemSettings" component={SystemSettings} />
        <Route path="/backupRestore" component={BackupRestore} />
        <Route path="/auditLogs" component={AuditLogs} />
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}

export default App;