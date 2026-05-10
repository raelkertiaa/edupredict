import React from 'react';

function Footer() {
  return (
    <div className='bg-blue-900 text-white p-8'>
        <div className='container mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-xl font-bold'>Edu Predict</h2>
                    <p className='text-sm'>Sistem yang dirancang untuk membantu tenaga pendidik dalam mendeteksi risiko akademik siswa secara proaktif</p>
                </div>
                <div className='flex space-x-4'>
                    <a href="#" className='hover:text-blue-300'>Tentang Kami</a>
                    <a href="#" className='hover:text-blue-300'>Kontak</a>
                    <a href="#" className='hover:text-blue-300'>Privasi</a>
                </div>
            </div>
            <div className='mt-6 text-center text-sm text-blue-300'>
                &copy; {new Date().getFullYear()} Edu Predict
            </div>
        </div>
    </div>
  );
}

export default Footer;