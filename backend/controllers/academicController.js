const db = require("../config/db");
// const axios = require('axios'); // ← aktifkan nanti saat Flask sudah siap

// ─────────────────────────────────────────────────────────
//  MAPPING ENCODING
//  Sesuai label_encoders.pkl dari tim AI Engineer
//  String → angka sebelum dikirim ke model
// ─────────────────────────────────────────────────────────
const ENCODINGS = {
  Parental_Involvement: { High: 0, Low: 1, Medium: 2 },
  Access_to_Resources: { High: 0, Low: 1, Medium: 2 },
  Motivation_Level: { High: 0, Low: 1, Medium: 2 },
  Internet_Access: { No: 0, Yes: 1 },
  Family_Income: { High: 0, Low: 1, Medium: 2 },
  Teacher_Quality: { High: 0, Low: 1, Medium: 2 },
  Peer_Influence: { Negative: 0, Neutral: 1, Positive: 2 },
  Parental_Education_Level: { College: 0, "High School": 1, Postgraduate: 2 },
};

// ─────────────────────────────────────────────────────────
//  HARDCODE AI RESPONSE
//  Dipakai sementara sebelum Flask AI siap
//  Nanti diganti dengan axios.post ke Flask
// ─────────────────────────────────────────────────────────
const getHardcodedPrediction = (data) => {
  // Logika sederhana berdasarkan attendance & hours_studied
  // supaya hasilnya tidak selalu sama (lebih realistis untuk testing)
  const attendance = data.Attendance;
  const hours = data.Hours_Studied;

  if (attendance >= 75 && hours >= 15) {
    return {
      risk_category: "Low",
      confidence: 0.89,
      probabilities: { High: 0.03, Low: 0.89, Medium: 0.08 },
      risk_factors: [],
    };
  } else if (attendance >= 55 && hours >= 8) {
    return {
      risk_category: "Medium",
      confidence: 0.76,
      probabilities: { High: 0.11, Low: 0.13, Medium: 0.76 },
      risk_factors: ["Attendance", "Hours_Studied"],
    };
  } else {
    return {
      risk_category: "High",
      confidence: 0.84,
      probabilities: { High: 0.84, Low: 0.05, Medium: 0.11 },
      risk_factors: ["Attendance", "Hours_Studied", "Motivation_Level"],
    };
  }
};

// ─────────────────────────────────────────────────────────
//  POST /api/guru/academic/:studentId
//  Input data akademik siswa + jalankan prediksi AI
// ─────────────────────────────────────────────────────────
const inputAcademic = async (req, res) => {
  const { studentId } = req.params;
  const {
    hours_studied,
    attendance,
    sleep_hours,
    previous_scores,
    tutoring_sessions,
    physical_activity,
    parental_involvement,
    access_to_resources,
    motivation_level,
    internet_access,
    family_income,
    teacher_quality,
    peer_influence,
  } = req.body;

  // Validasi field wajib
  const requiredFields = {
    hours_studied,
    attendance,
    sleep_hours,
    previous_scores,
    tutoring_sessions,
    physical_activity,
    parental_involvement,
    access_to_resources,
    motivation_level,
    internet_access,
    family_income,
    teacher_quality,
    peer_influence,
  };

  const missingFields = Object.keys(requiredFields).filter(
    (key) =>
      requiredFields[key] === undefined ||
      requiredFields[key] === null ||
      requiredFields[key] === "",
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Field berikut wajib diisi.",
      missing: missingFields,
    });
  }

  try {
    // Cek siswa ada
    const [studentRows] = await db.query(
      "SELECT id, nama_siswa, parental_education_level FROM students WHERE id = ? LIMIT 1",
      [studentId],
    );

    if (studentRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Siswa tidak ditemukan." });
    }

    const siswa = studentRows[0];

    // ── STEP 1: Simpan ke academic_records ──────────────
    const [insertResult] = await db.query(
  `INSERT INTO academic_records
     (student_id, hours_studied, attendance, sleep_hours, previous_scores,
      tutoring_sessions, physical_activity, parental_involvement,
      access_to_resources, motivation_level, internet_access,
      family_income, teacher_quality, peer_influence, parental_education_level)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    studentId,
    hours_studied,
    attendance,
    sleep_hours,
    previous_scores,
    tutoring_sessions,
    physical_activity,
    parental_involvement,
    access_to_resources,
    motivation_level,
    internet_access,
    family_income,
    teacher_quality,
    peer_influence,
    siswa.parental_education_level,
  ]
);

    const academicRecordId = insertResult.insertId;

    // ── STEP 2: Susun 14 fitur untuk AI ─────────────────
    // Sesuai FEATURE_COLS dari notebook tim AI Engineer
    const rawInput = {
      Hours_Studied: Number(hours_studied),
      Attendance: Number(attendance),
      Parental_Involvement: parental_involvement,
      Access_to_Resources: access_to_resources,
      Sleep_Hours: Number(sleep_hours),
      Previous_Scores: Number(previous_scores),
      Motivation_Level: motivation_level,
      Internet_Access: internet_access,
      Tutoring_Sessions: Number(tutoring_sessions),
      Family_Income: family_income,
      Teacher_Quality: teacher_quality,
      Peer_Influence: peer_influence,
      Physical_Activity: Number(physical_activity),
      Parental_Education_Level: siswa.parental_education_level,
    };

    // ── STEP 3: Panggil AI (hardcode dulu) ──────────────
    let prediksi;

    // ╔══════════════════════════════════════════════════╗
    // ║  GANTI BLOK INI SAAT FLASK SUDAH SIAP:          ║
    // ║                                                  ║
    // ║  const flaskRes = await axios.post(             ║
    // ║    'http://localhost:5001/predict', rawInput     ║
    // ║  );                                             ║
    // ║  prediksi = flaskRes.data;                      ║
    // ╚══════════════════════════════════════════════════╝

    prediksi = getHardcodedPrediction(rawInput); // ← hapus baris ini saat Flask siap

    // ── STEP 4: Simpan hasil prediksi ───────────────────
    const [predictionResult] = await db.query(
  `INSERT INTO predictions
     (student_id, academic_record_id, risk_category, confidence,
      probabilities, risk_factors, raw_input)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    studentId,
    academicRecordId,
    prediksi.risk_category,
    prediksi.confidence,
    JSON.stringify(prediksi.probabilities),
    JSON.stringify(prediksi.risk_factors),
    JSON.stringify(rawInput),
  ]
);

const predictionId = predictionResult.insertId;

    // ── STEP 5: Kirim notifikasi jika risiko tinggi ─────
    if (prediksi.risk_category === 'High') {
  await db.query(
    `INSERT INTO notifications
       (user_id, student_id, prediction_id, title, message, type)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      studentId,
      predictionId,
      'Peringatan Risiko Tinggi',
      `${siswa.nama_siswa} terdeteksi berisiko TINGGI — segera lakukan intervensi!`,
      'High',
    ]
  );
} else if (prediksi.risk_category === 'Medium') {
  await db.query(
    `INSERT INTO notifications
       (user_id, student_id, prediction_id, title, message, type)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      studentId,
      predictionId,
      'Peringatan Risiko Sedang',
      `${siswa.nama_siswa} berisiko SEDANG — pantau perkembangannya.`,
      'Medium',
    ]
  );
}

    res.status(201).json({
      success: true,
      message: "Data akademik berhasil disimpan dan prediksi telah dilakukan.",
      data: {
        academic_record_id: academicRecordId,
        siswa: siswa.nama_siswa,
        prediksi: {
          risk_category: prediksi.risk_category,
          confidence: prediksi.confidence,
          probabilities: prediksi.probabilities,
          risk_factors: prediksi.risk_factors,
        },
      },
    });
  } catch (err) {
    console.error("inputAcademic error:", err);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

// ─────────────────────────────────────────────────────────
//  GET /api/guru/academic/:studentId
//  Ambil histori akademik + prediksi siswa
// ─────────────────────────────────────────────────────────
const getAcademicHistory = async (req, res) => {
  const { studentId } = req.params;

  try {
    const [studentRows] = await db.query(
      "SELECT id, nama_siswa, nisn, kelas FROM students WHERE id = ? LIMIT 1",
      [studentId],
    );

    if (studentRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Siswa tidak ditemukan." });
    }

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
       ORDER BY ar.recorded_at ASC`,
      [studentId],
    );

    res.status(200).json({
      success: true,
      data: {
        siswa: studentRows[0],
        total: histori.length,
        histori,
      },
    });
  } catch (err) {
    console.error("getAcademicHistory error:", err);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

module.exports = { inputAcademic, getAcademicHistory };
