const db = require('../config/db');

// ─────────────────────────────────────────────────────────
//  GET /api/guru/students
//  Ambil semua siswa beserta prediksi terbaru
// ─────────────────────────────────────────────────────────
const getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
         s.id,
         s.nisn,
         s.nama_siswa,
         s.kelas,
         s.gender,
         s.school_type,
         s.distance_from_home,
         s.parental_education_level,
         s.learning_disabilities,
         p.risk_category,
         p.confidence,
         ar.recorded_at AS last_recorded
       FROM students s
       LEFT JOIN academic_records ar ON ar.student_id = s.id
         AND ar.recorded_at = (
           SELECT MAX(ar2.recorded_at)
           FROM academic_records ar2
           WHERE ar2.student_id = s.id
         )
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       ORDER BY
         FIELD(p.risk_category, 'High', 'Medium', 'Low'),
         s.kelas ASC,
         s.nama_siswa ASC`
    );

    res.status(200).json({
      success: true,
      total: rows.length,
      data: rows,
    });

  } catch (err) {
    console.error('getAllStudents error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// ─────────────────────────────────────────────────────────
//  GET /api/guru/students/:id
//  Ambil detail 1 siswa + histori akademik & prediksi
// ─────────────────────────────────────────────────────────
const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Data statis siswa
    const [studentRows] = await db.query(
      `SELECT * FROM students WHERE id = ? LIMIT 1`,
      [id]
    );

    if (studentRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan.' });
    }

    // Histori akademik + prediksi (10 record terbaru)
    const [histori] = await db.query(
      `SELECT
         ar.id AS record_id,
         ar.hours_studied,
         ar.attendance,
         ar.sleep_hours,
         ar.previous_scores,
         ar.tutoring_sessions,
         ar.physical_activity,
         ar.parental_involvement,
         ar.access_to_resources,
         ar.extracurricular_activities,
         ar.motivation_level,
         ar.internet_access,
         ar.family_income,
         ar.teacher_quality,
         ar.peer_influence,
         ar.recorded_at,
         p.risk_category,
         p.confidence,
         p.probabilities,
         p.risk_factors
       FROM academic_records ar
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE ar.student_id = ?
       ORDER BY ar.recorded_at DESC
       LIMIT 10`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: {
        siswa: studentRows[0],
        histori: histori.reverse(), // ascending untuk grafik
      },
    });

  } catch (err) {
    console.error('getStudentById error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// ─────────────────────────────────────────────────────────
//  POST /api/guru/students
//  Tambah siswa baru
// ─────────────────────────────────────────────────────────
const createStudent = async (req, res) => {
  const {
    nisn, nama_siswa, kelas,
    gender, school_type, distance_from_home,
    parental_education_level, learning_disabilities,
  } = req.body;

  // Validasi field wajib
  if (!nisn || !nama_siswa || !kelas || !gender || !school_type ||
      !distance_from_home || !parental_education_level || !learning_disabilities) {
    return res.status(400).json({
      success: false,
      message: 'Semua field wajib diisi.',
      required: [
        'nisn', 'nama_siswa', 'kelas', 'gender', 'school_type',
        'distance_from_home', 'parental_education_level', 'learning_disabilities'
      ]
    });
  }

  try {
    // Cek NISN sudah ada atau belum
    const [existing] = await db.query(
      'SELECT id FROM students WHERE nisn = ? LIMIT 1',
      [nisn]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: `NISN ${nisn} sudah terdaftar di sistem.`,
      });
    }

    // Insert siswa baru
    const [result] = await db.query(
      `INSERT INTO students
         (nisn, nama_siswa, kelas, gender, school_type,
          distance_from_home, parental_education_level, learning_disabilities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nisn, nama_siswa, kelas, gender, school_type,
       distance_from_home, parental_education_level, learning_disabilities]
    );

    res.status(201).json({
      success: true,
      message: `Siswa ${nama_siswa} berhasil ditambahkan.`,
      data: { id: result.insertId, nisn, nama_siswa, kelas },
    });

  } catch (err) {
    console.error('createStudent error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// ─────────────────────────────────────────────────────────
//  PUT /api/guru/students/:id
//  Edit data statis siswa
// ─────────────────────────────────────────────────────────
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    nisn, nama_siswa, kelas,
    gender, school_type, distance_from_home,
    parental_education_level, learning_disabilities,
  } = req.body;

  if (!nisn || !nama_siswa || !kelas || !gender || !school_type ||
      !distance_from_home || !parental_education_level || !learning_disabilities) {
    return res.status(400).json({
      success: false,
      message: 'Semua field wajib diisi.',
    });
  }

  try {
    // Cek siswa ada
    const [existing] = await db.query(
      'SELECT id FROM students WHERE id = ? LIMIT 1',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan.' });
    }

    // Cek NISN tidak bentrok dengan siswa lain
    const [nisnCheck] = await db.query(
      'SELECT id FROM students WHERE nisn = ? AND id != ? LIMIT 1',
      [nisn, id]
    );

    if (nisnCheck.length > 0) {
      return res.status(409).json({
        success: false,
        message: `NISN ${nisn} sudah digunakan siswa lain.`,
      });
    }

    await db.query(
      `UPDATE students SET
         nisn = ?, nama_siswa = ?, kelas = ?,
         gender = ?, school_type = ?, distance_from_home = ?,
         parental_education_level = ?, learning_disabilities = ?
       WHERE id = ?`,
      [nisn, nama_siswa, kelas, gender, school_type,
       distance_from_home, parental_education_level, learning_disabilities, id]
    );

    res.status(200).json({
      success: true,
      message: `Data siswa ${nama_siswa} berhasil diperbarui.`,
    });

  } catch (err) {
    console.error('updateStudent error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// ─────────────────────────────────────────────────────────
//  DELETE /api/guru/students/:id
//  Hapus siswa (cascade → academic_records & predictions ikut terhapus)
// ─────────────────────────────────────────────────────────
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.query(
      'SELECT id, nama_siswa FROM students WHERE id = ? LIMIT 1',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan.' });
    }

    const nama = existing[0].nama_siswa;

    // DELETE CASCADE sudah diset di schema → academic_records & predictions ikut terhapus
    await db.query('DELETE FROM students WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: `Siswa ${nama} berhasil dihapus beserta seluruh data akademiknya.`,
    });

  } catch (err) {
    console.error('deleteStudent error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};