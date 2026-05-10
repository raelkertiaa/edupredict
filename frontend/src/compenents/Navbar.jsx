import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`navbar fixed w-full transition-all py-4 bg-blue-100 z-50 ${scrolled ? "border-b-2 border-stone-100" : ""}`}>
            <div className="container mx-auto px-4">
                <div className="navbar-box flex items-center justify-between py-2">
                    <div className="logo-box flex items-center gap-3">
                        <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                        <h1 className="text-2xl font-bold">Edu Predict</h1>
                    </div>
                    <div className={`Nav-items flex lg:gap-12 gap-8 absolute md:static left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-0 flex-col md:flex-row w-full text-center ${menuActive ? "top-16 opacity-100" : "-top-72 opacity-0"} md:w-auto py-10 md:py-0 transition-all md:transition-none bg-blue-100 md:opacity-100 items-center`}>
                        <button onClick={() => scrollTo('beranda')}>Beranda</button>
                        <button onClick={() => scrollTo('tentang')}>Tentang</button>
                        <button onClick={() => scrollTo('panduan')}>Panduan Penggunaan</button>
                        <NavLink to="/team">Team</NavLink>
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-stone-900">
                                Login <i className="ri-arrow-right-up-line"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                    <NavLink to="/login-guru" onClick={() => setDropdownOpen(false)} className="block px-6 py-2 hover:bg-blue-50 text-slate-800 whitespace-nowrap">Masuk sebagai Guru</NavLink>
                                    <NavLink to="/login-siswa" onClick={() => setDropdownOpen(false)} className="block px-6 py-2 hover:bg-blue-50 text-slate-800 whitespace-nowrap">Masuk sebagai Siswa</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="menu-btn md:hidden block" onClick={() => setMenuActive(!menuActive)}>
                        <i className="ri-menu-3-line ri-2x"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
