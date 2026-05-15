const db = require('../config/db');

// ─────────────────────────────────────────────────────────
//  GET /api/guru/dashboard
//  Ringkasan data untuk halaman utama dashboard guru
// ─────────────────────────────────────────────────────────
const getDashboard = async (req, res) => {
  try {
    // Total siswa
    const [[{ total_siswa }]] = await db.query(
      'SELECT COUNT(*) AS total_siswa FROM students'
    );

    // Ringkasan risiko berdasarkan prediksi terbaru tiap siswa
    const [risikoRows] = await db.query(
      `SELECT
         p.risk_category,
         COUNT(*) AS jumlah
       FROM students s
       LEFT JOIN academic_records ar ON ar.student_id = s.id
         AND ar.recorded_at = (
           SELECT MAX(ar2.recorded_at)
           FROM academic_records ar2
           WHERE ar2.student_id = s.id
         )
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE p.risk_category IS NOT NULL
       GROUP BY p.risk_category`
    );

    // Format hasil risiko
    const ringkasanRisiko = { High: 0, Medium: 0, Low: 0 };
    risikoRows.forEach(row => {
      ringkasanRisiko[row.risk_category] = row.jumlah;
    });

    // Siswa berisiko tinggi (untuk daftar peringatan)
    const [siswaBerisiko] = await db.query(
      `SELECT
         s.id,
         s.nisn,
         s.nama_siswa,
         s.kelas,
         p.risk_category,
         p.confidence,
         p.risk_factors,
         ar.recorded_at AS last_recorded
       FROM students s
       JOIN academic_records ar ON ar.student_id = s.id
         AND ar.recorded_at = (
           SELECT MAX(ar2.recorded_at)
           FROM academic_records ar2
           WHERE ar2.student_id = s.id
         )
       JOIN predictions p ON p.academic_record_id = ar.id
       WHERE p.risk_category IN ('High', 'Medium')
       ORDER BY
         FIELD(p.risk_category, 'High', 'Medium'),
         p.confidence DESC
       LIMIT 10`
    );

    // Notifikasi yang belum dibaca
    const [[{ unread_notif }]] = await db.query(
      'SELECT COUNT(*) AS unread_notif FROM notifications WHERE user_id = ? AND is_read = 0',
      [req.user.id]
    );

    // Notifikasi terbaru (5 terakhir)
    const [notifikasi] = await db.query(
      `SELECT id, pesan, tipe, is_read, created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 5`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      data: {
        ringkasan: {
          total_siswa,
          risiko_tinggi  : ringkasanRisiko.High,
          risiko_sedang  : ringkasanRisiko.Medium,
          risiko_rendah  : ringkasanRisiko.Low,
          belum_diprediksi: total_siswa - (ringkasanRisiko.High + ringkasanRisiko.Medium + ringkasanRisiko.Low),
        },
        siswa_berisiko : siswaBerisiko,
        notifikasi     : {
          unread  : unread_notif,
          terbaru : notifikasi,
        },
      },
    });

  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// ─────────────────────────────────────────────────────────
//  PUT /api/guru/notifications/:id/read
//  Tandai notifikasi sudah dibaca
// ─────────────────────────────────────────────────────────
const markNotifRead = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.status(200).json({ success: true, message: 'Notifikasi ditandai sudah dibaca.' });

  } catch (err) {
    console.error('markNotifRead error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { getDashboard, markNotifRead };