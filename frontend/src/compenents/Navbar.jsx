import React from 'react';
import {NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';

function Navbar(){
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    const handlerClick = () => {
        setMenuActive(!menuActive);
    }
    
    useEffect(()=>{
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            window.addEventListener("scroll", onScroll);      
            return () => {
            window.removeEventListener('scroll', onScroll);
        };
        };
    })
    
    return(
        <div className={`navbar fixed w-full transition-all py-4 bg-blue-100 z-50 ${scrolled ? "border-b-2 border-stone-100" : ""}`}>
        <div className="container mx-auto px-4 bg-white-300">
         <div className="navbar-box flex items-center justify-between py-2">
            <div className="logo-box flex gap-5">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-2xl font-bold">Edu Predict</h1>
            </div>
            <div className={`Nav-items flex lg:gap-12 gap-8 absolute md:static left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-0 flex-col md:flex-row w-full text-center ${menuActive ? "top-16 opacity-100" : "-top-72 opacity-0"} md:w-auto py-10 md:py-0 transition-all md:transition-none bg-blue-100 md:opacity-100 items-center`} >
                <NavLink to={""}>Beranda</NavLink>
                <NavLink to={""}>Tentang</NavLink>
                <NavLink to={""}>Fitur</NavLink>
                <NavLink to={"team"}>Team</NavLink>
                <NavLink to={"login"} className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-stone-900">Login</NavLink>
            </div>
            <div className="menu-btn md:hidden block" onClick={handlerClick}>
                <i class="ri-menu-3-line ri-2x"></i>
            </div>
         </div>
        </div>
        </div>
    );
}

export default Navbar;