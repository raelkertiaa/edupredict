import React from 'react';

function Navbar(){
    return(
        <div className="navbar fixed w-full transition-all py-4">
        <div className="container mx-auto px-4 bg-white-300">
         <div className="navbar-box flex item-center justify-between">
            <div className="logo-box flex gap-5">
                <img src="favicon.svg" alt="" />
                <h2>Edu Predict</h2>
            </div>
            <div className="Nav-items">
                <ul className="flex gap-12">
                    <li><a href="#" className="font-medium opacity-75">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Features</a></li>
                    <li><button><a href="./login">Login</a></button></li>
                </ul>
            </div>
         </div>
        </div>
        </div>
    );
}

export default Navbar;