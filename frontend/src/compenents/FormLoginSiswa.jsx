import React from 'react';
import { NavLink } from 'react-router-dom';

function FormLoginSiswa() {
    return (
        <div className="mx-auto w-150 h-180 m-10 px-8 pt-10 pb-10 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <div className="mt-4 flex p-2 font-medium text-blue-800 bg-blue-100 w-35 rounded-3xl justify-around">
            <i class="ri-user-line"></i>
            <h3>Portal Siswa</h3>
            </div>
            <h1 className="text-4xl font-semibold mt-4">Cek progres belajarmu</h1>
            <p className="text-lg mt-4 opacity-75">Masukkan NISN untuk melihat progres belajar, prediksi risiko dan rekomendasi dari AI</p>
            <div className="mt-8">
                <label className="text-lg font-medium">NISN (Nomor Induk Siswa Nasional)</label>
                <input className="w-full border-2 border-sky-600 shadow-md rounded-xl p-4 mt-1 bg-transparent" placeholder="Masukkan NISN anda"/>
            </div>
            <p className="mt-4 font-light">NISN terdiri dari 8 digit angka</p>
            <div className="mt-8 flex flex-col gap-y-4">
                <button className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900"><i class="ri-search-line"></i>Lihat Progres Belajar</button>
                 {/* atau */}
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm"> atau </span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                 {/* atau */}
                <NavLink to="/login-guru" className="text-center border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50">Masuk sebagai Guru</NavLink>
            </div>
        </div>
    )
}

export default FormLoginSiswa;
