import React from 'react';
import { NavLink } from 'react-router-dom';

function FormLoginGuru() {
    return (
        <div className="mx-auto w-150 h-210 m-10 px-8 pt-10 pb-10 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <div className="mt-4 flex p-2 font-medium text-blue-800 bg-blue-100 w-35 rounded-3xl justify-around">
            <i class="ri-computer-line"></i>
            <h3>Portal Guru</h3>
            </div>
            <h1 className="text-4xl font-semibold mt-4">Selamat datang kembali</h1>
            <p className="text-lg mt-4 opacity-75">Masuk untuk mengakses dashboard dan prediksi risiko siswa</p>
            <div className="mt-8">
                <label className="text-lg font-medium">Username</label>
                <input className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" placeholder="masukkan username anda"/>
            </div>
            <div className="mt-4">
                <label className="text-lg font-medium">Password</label>
                <input className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" placeholder="masukkan password anda"/>
            </div>
            <div className="mt-8 flex justify-between items-center">
                <div>
                    <input type="checkbox" id="remember"/>
                    <label className="ml-2 font-medium text-base" for="remember">Ingat saya</label>
                </div>
                <button className="font-medium text-base text-blue-500">Lupa password?</button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
                <button className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900"><i class="ri-login-box-line"></i>Masuk sebagai Guru</button>
                <div className="flex-1 h-px bg-gray-900"></div>
                {/* atau */}
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm"> atau </span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                 {/* atau */}
                <NavLink to="/login-siswa" className="text-center border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50"><i class="ri-user-line"></i>Masuk sebagai Siswa</NavLink>
                <div className="mt-4 flex justify-between items-center">
                    <p  className="ml-2 font-medium text-base">Belum punya akun?</p>
                    <p className="font-medium text-base text-blue-500">Daftar sekarang</p>
                </div>
            </div>
        </div>
    )
}

export default FormLoginGuru;
