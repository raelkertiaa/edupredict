const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/guruController');

const {
  inputAcademic,
  getAcademicHistory,
} = require('../controllers/academicController');

const {
  getDashboard,
  markNotifRead,
} = require('../controllers/dashboardController');

const { verifyToken, guruOnly } = require('../middleware/auth');

// Semua route di sini wajib login sebagai guru
router.use(verifyToken, guruOnly);

// ── Dashboard ─────────────────────────────────────────────
router.get('/dashboard', getDashboard);
router.put('/notifications/:id/read', markNotifRead);

// ── CRUD Siswa ────────────────────────────────────────────
router.get('/students',     getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students',    createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// ── Input Akademik & Histori ──────────────────────────────
router.post('/academic/:studentId', inputAcademic);
router.get('/academic/:studentId',  getAcademicHistory);

module.exports = router;