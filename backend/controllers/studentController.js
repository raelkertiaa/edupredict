const db = require("../config/db");

// POST /api/student/check

const checkNISN = async (req, res) => {
  const { nisn } = req.body;

  if (!nisn) {
    return res.status(400).json({
      success: false,
      message: "NISN wajib diisi.",
    });
  }

  try {
    // ambil data siswa + prediksi
    const [rows] = await db.query(
      `SELECT
         s.id,
         s.nisn,
         s.nama_siswa,
         s.kelas,
         s.gender,
         ar.previous_scores AS exam_score,
         ar.attendance,
         ar.hours_studied,
         ar.recorded_at,
         p.risk_category,
         p.confidence,
         p.risk_factors
       FROM students s
       LEFT JOIN academic_records ar ON ar.student_id = s.id
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE s.nisn = ?
       ORDER BY ar.recorded_at DESC
       LIMIT 1`,
      [nisn],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "NISN tersebut tidak ditemukan. Hubungi Guru",
      });
    }

    const siswa = rows[0];

    // ambil histori tren (5 record terakhir untuk grafik)

    const [histori] = await db.query(
      `SELECT
         ar.previous_scores AS exam_score,
         ar.attendance,
         ar.hours_studied,
         ar.recorded_at,
         p.risk_category
       FROM academic_records ar
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE ar.student_id = ?
       ORDER BY ar.recorded_at DESC
       LIMIT 5`,
      [siswa.id],
    );

    res.status(200).json({
      success: true,
      data: {
        siswa: {
          nisn: siswa.nisn,
          nama: siswa.nama_siswa,
          kelas: siswa.kelas,
          gender: siswa.gender,
        },
        prediksi_terbaru: siswa.risk_category
          ? {
              risk_category: siswa.risk_category,
              confidence: siswa.confidence,
              risk_factors: siswa.risk_factors,
              exam_score: siswa.exam_score,
              attendance: siswa.attendance,
              hours_studied: siswa.hours_studied,
              recorded_at: siswa.recorded_at,
            }
          : null,
        histori: histori.reverse(), //ascending grafik
      },
    });
  } catch (err) {
    console.error("Error checking NISN:", err);
    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat memeriksa NISN. Silakan coba lagi nanti.",
    });
  }
};

module.exports = {
  checkNISN,
};
    