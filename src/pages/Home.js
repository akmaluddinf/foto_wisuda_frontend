import React, { useState } from 'react';
import '../App.css'
import axios from 'axios';
import log from 'loglevel';
import Swal from 'sweetalert2'; // Impor SweetAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';


// Set level log yang diinginkan (error, warn, info, debug, trace)
log.setLevel('info'); // Atur sesuai kebutuhan

function App() {
  const [filename, setFilename] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    if (!filename) {
      setErrorMessage('Masukkan NIM terlebih dahulu!');
      // Tampilkan SweetAlert ketika input kosong
      Swal.fire({
        title: 'NIM TIDAK BOLEH KOSONG!',
        text: 'DOWNLOAD FOTO WISUDA GELOMBANG I TAHUN AKADEMIK 2023/2024',
        imageUrl: 'logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#198754'
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/download`, {
        params: { filename },
        responseType: 'blob',
        withCredentials: true
      });

      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setErrorMessage('');
      log.info(`File ${filename}.zip berhasil diunduh.`); // Menyisipkan pesan log di sini
      // Tampilkan SweetAlert ketika unduhan berhasil
      Swal.fire({
        title: `FOTO WISUDA DENGAN NIM: ${filename} BERHASIL DIUNDUH!`,
        text: 'DOWNLOAD FOTO WISUDA GELOMBANG I TAHUN AKADEMIK 2023/2024',
        imageUrl: 'logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#198754'
      });

    } catch (error) {
      log.error(error); // Mencatat error ke log
      if (error.response && error.response.status === 404) {
        setErrorMessage('NIM tidak ditemukan!');
        // Tampilkan SweetAlert ketika file tidak ditemukan
        Swal.fire({
          title: 'NIM TIDAK DITEMUKAN!',
          text: 'DOWNLOAD FOTO WISUDA GELOMBANG I TAHUN AKADEMIK 2023/2024',
          imageUrl: 'logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#198754'
        });
        log.warn(`File ${filename}.zip tidak ditemukan.`); // Menyisipkan pesan log di sini
      } else if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Terjadi kesalahan saat mengambil data!');
        // Tampilkan SweetAlert untuk kesalahan umum
        Swal.fire({
          title: 'TERJADI KESALAHAN SAAT MENGAMBIL DATA!',
          text: 'DOWNLOAD FOTO WISUDA GELOMBANG I TAHUN AKADEMIK 2023/2024',
          imageUrl: 'logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#198754'
        });
      }
    }
  };


  function handleChange(event) {
    const inputFileName = event.target.value;
    if (inputFileName.length <= 9) {
      setFilename(inputFileName);
      setErrorMessage('');
    } else {
      setErrorMessage('Panjang NIM melebihi 9 karakter.');
    }
  }

  // Function to handle key press event
  const handleKeyPress = (e) => {
    if (filename.length >= 10 && e.key === 'Backspace') {
      e.preventDefault(); // Mencegah penghapusan jika panjang sudah maksimal
    }
    if (e.key === 'Enter'){
      handleDownload();
    }
  };

  const backgroundImageStyle = {
    backgroundImage:"url('bgmob2.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };

  return (
    <>
      <div className='container-fluid' style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
      {/* <div className='container-fluid'> */}
        <div className='row' style={{ textAlign: "center" }}>
          <div className='col-lg-12'>
            <img src='logo_wisuda.png' className="img-fluid" alt='' style={{ width: '259px', height: '100px', marginBottom: '40px', marginTop: '50px' }} />
          </div>
          <div className='col-lg-12'>
            <h3 style={{ marginBottom: '20px', fontFamily: "'Rammetto One', sans-serif", color: '#C44D18' }}>Selamat & Sukses</h3>
            <h4>Wisudawan dan Wisudawati</h4>
            <h4>Program Sarjana, Magister, dan Doktor</h4>
            <h4>Wisuda Gelombang I TA 2023/2024</h4>
            {/* <br /> */}
            <h4>Universitas Pasundan</h4>
            <br />
            <h4>Sasana Budaya Ganesha, 11 November 2023</h4>
            <br />
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <b>Download Foto Wisuda</b>
            </button>
          </div>
        </div>

        {/* modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={backgroundImageStyle}>
              <div className="modal-header" style={{ borderBottom: 'none' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ textAlign: 'center' }}>Download Foto Wisuda Universitas Pasundan Gelombang I TA 2023/2024</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" id="floatingInput" placeholder="Nomor Induk Mahasiswa" value={filename} onChange={handleChange} onKeyDown={handleKeyPress} />
                  <label htmlFor="floatingInput">Nomor Induk Mahasiswa</label>
                </div>
                {errorMessage && <b><p className="text-danger">{errorMessage}</p></b>}
              </div>
              <div className="modal-body" style={{ textAlign: 'center', display: 'block' }}>
                <button type="button" className="btn btn-success" onClick={handleDownload}><b>Download</b></button>
              </div>
            </div>
          </div>
        </div>

      </div> {/*end div container*/}

      <footer>
        <span className="website" style={{ fontSize: '12px' }}>
          &copy; 2023&nbsp;<b><a href="https://www.unpas.ac.id/" target="_blank" rel="noreferrer">
            Universitas Pasundan
          </a></b>&nbsp;-&nbsp;
          <b><a href="https://sptik.unpas.ac.id/" target="_blank" rel="noreferrer">
            LP2TIK
          </a></b>&nbsp;-&nbsp;
          <span>
            All Rights Reserved&nbsp;-&nbsp;
          </span>
          <b><a href="https://www.unpas.ac.id/?page_id=58414" target="_blank" rel="noreferrer">
            Privacy and Copyright
          </a></b>
        </span>

        <br />

        {/* Logo dan Tautan Sosial Media */}
        <span className="sosial-media">
          <a href="https://www.instagram.com/univ_pasundan/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://web.facebook.com/universitaspasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '5px' }} />
            Universitas Pasundan
          </a>
          <a href="https://twitter.com/univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '5px' }} />
            @univ_pasundan
          </a>
          <a href="https://www.tiktok.com/@univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTiktok} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://www.youtube.com/c/UniversitasPasundanOfficial" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '5px' }} />
            Universitas Pasundan Official
          </a>
        </span>

      </footer>

    </>
  );
}

export default App;
