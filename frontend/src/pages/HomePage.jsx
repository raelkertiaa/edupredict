import heroImg from '../assets/hero.png';

function HomePage(){
    return(
    <div className="homepage pt-24" id="beranda">
        <div className="container mx-auto px-8">
            {/* hero section  */}
            <div className="hero grid md:grid-cols-2 items-center grid-cols-1 lg:pt-0 pt-16 pb-32">
                <div className="text-center md:text-left lg:pb-0 pb-16">
                <h1 className="xl:text-7xl/tight font-semibold mb-2 lg:text-6xl/tight text-6xl">Deteksi Dini <br /> Akademik Siswa</h1>
                <p className="xl:text-base/loose opacity-75 text-sm/loose">Sistem peringatan dini berbasis data dengan integrasi Generative AI untuk menghasilkan rekomendasi intervensi berbasis faktor risiko dominan</p>
                <div className="mt-6">
                    <a href="" className="bg-blue-900 w-fit text-white p-3 rounded text-lg hover:bg-stone-900">Mulai Deteksi <i class="ri-search-ai-line pl-1"></i></a>
                </div>
                </div>
                <img src={heroImg} alt="hero" className="w-full md:block hidden"/>
            </div>
            {/* hero section  */}
        </div>

        {/* Tentang */}
        <div className="tentang" id="tentang">
            <div className="container mx-auto px-8 pt-20 pb-16 bg-white">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-5xl font-semibold mb-6">Tentang Edu Predict</h2>
                    <p className="text-lg opacity-75">EduPredict AI merupakan solusi berbasis web untuk menjawab urgensi peningkatan keberhasilan akademik siswa melalui sistem peringatan dini berbasis data.</p>
                </div>
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-5xl font-semibold mb-6 mt-30">Fitur</h2>
                    <p className="text-lg opacity-75">Berikut adalah beberapa fitur utama dari Edu Predict yang akan membantu proses deteksi dini akademik siswa.</p>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-10">
                    <div className="bg-blue-100 p-8 rounded-xl shadow-md">
                        <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-search-ai-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Deteksi Dini</h3>
                        <p className="opacity-75">Mendeteksi potensi keberhasilan akademik siswa sejak dini dengan menganalisis data historis dan faktor risiko.</p>
                    </div>
                    <div className="bg-blue-100 p-8 rounded-xl shadow-md">
                        <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-bar-chart-2-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Analisis Data</h3>
                        <p className="opacity-75">Menganalisis data akademik siswa secara mendalam untuk mengidentifikasi pola dan tren dengan klasifikasi risiko kategori: rendah, sedang, dan tinggi.</p>
                    </div>
                    <div className="bg-blue-100 p-8 rounded-xl shadow-md">
                        <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-lightbulb-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Rekomendasi Intervensi</h3>
                        <p className="opacity-75">Sistem dilengkapi fitur Simulation Mode untuk analisis skenario dan integrasi Generative AI untuk menghasilkan rekomendasi intervensi berbasis faktor risiko dominan</p>
                    </div>
                </div>
            </div>
        </div>
        {/* Tentang */}

        {/* fitur */}
        <div className="panduan" id="panduan">
            <div className="container mx-auto px-8 py-24">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-5xl font-semibold mb-6">Panduan Penggunaan</h2>
                    <p className="text-lg opacity-75">Berikut adalah beberapa fitur utama dari Edu Predict yang akan membantu proses deteksi dini akademik siswa.</p>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-search-ai-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Deteksi Dini</h3>
                        <p className="opacity-75">Mendeteksi potensi keberhasilan akademik siswa sejak dini dengan menganalisis data historis dan faktor risiko.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-bar-chart-2-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Analisis Data</h3>
                        <p className="opacity-75">Menganalisis data akademik siswa secara mendalam untuk mengidentifikasi pola dan tren yang dapat mempengaruhi prestasi.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <i className="ri-lightbulb-line text-2xl text-blue-900"></i>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Rekomendasi Intervensi</h3>
                    </div>
                </div>
            </div>
        </div>
        {/* fitur */}
    </div>
    );
}

export default HomePage;