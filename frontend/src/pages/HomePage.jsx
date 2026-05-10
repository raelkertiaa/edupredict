import heroImg from '../assets/hero.png';

function HomePage(){
    return(
    <div className="homepage pt-24">
        <div className="container mx-auto px-8">
            {/* hero section  */}
            <div className="hero grid grid-cols-2 items-center">
                <div>
                <h1 className="text-7xl/tight font-semibold mb-2">Deteksi Dini <br /> Akademik Siswa</h1>
                <p className="text-base/loose opacity-75">Sistem peringatan dini berbasis data dengan integrasi Generative AI untuk menghasilkan rekomendasi intervensi berbasis faktor risiko dominan</p>
                <div className="mt-6">
                    <a href="" className="bg-blue-900 w-fit text-white p-3 rounded text-lg hover:bg-stone-900">Login</a>
                </div>
                </div>
                <img src={heroImg} alt="hero" className="w-full md:block hidden"/>
            </div>
            {/* hero section  */}
        </div>
    </div>
    );
}

export default HomePage;