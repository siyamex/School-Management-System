const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userManagementRoutes = require('./routes/userManagement');
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');
const classRoutes = require('./routes/classes');
const scheduleRoutes = require('./routes/schedules');
const gradeRoutes = require('./routes/grades');
const attendanceRoutes = require('./routes/attendance');
const notificationRoutes = require('./routes/notifications');
const bookSearchRoutes = require('./routes/bookSearch');
const loanManagementRoutes = require('./routes/loanManagement');
const systemSettingsRoutes = require('./routes/systemSettings');
const backupRestoreRoutes = require('./routes/backupRestore');
const auditLogsRoutes = require('./routes/auditLogs');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/userManagement', userManagementRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bookSearch', bookSearchRoutes);
app.use('/api/loanManagement', loanManagementRoutes);
app.use('/api/systemSettings', systemSettingsRoutes);
app.use('/api/backupRestore', backupRestoreRoutes);
app.use('/api/auditLogs', auditLogsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));