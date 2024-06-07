import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import log from 'loglevel';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

log.setLevel('info');
function DownloadPage() {
  const [filename, setFilename] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDownload = async () => {
    if (!filename) {
      setErrorMessage('Masukkan NIM terlebih dahulu.');
      Swal.fire({
        title: 'NIM TIDAK BOLEH KOSONG!',
        text: 'WISUDA GELOMBANG II TAHUN AKADEMIK 2023/2024',
        imageUrl: 'logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    try {
      const response = await axios.post(apiUrl, { filename }, { responseType: 'blob' });

      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setErrorMessage('');
      log.info(`File ${filename}.zip berhasil diunduh.`);
      Swal.fire({
        title: `FOTO WISUDA DENGAN NIM: ${filename} BERHASIL DIUNDUH!`,
        text: 'WISUDA GELOMBANG II TAHUN AKADEMIK 2023/2024',
        imageUrl: 'logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });

    } catch (error) {
      log.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('File foto tidak ditemukan, masukkan NIM dengan benar!');
        Swal.fire({
          title: 'NIM TIDAK TERDAFTAR!',
          text: 'WISUDA GELOMBANG II TAHUN AKADEMIK 2023/2024',
          imageUrl: 'logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
        });
        log.warn(`File ${filename}.zip tidak ditemukan.`);
      } else if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Terjadi kesalahan saat mengunduh file foto.');
        Swal.fire({
          title: 'TERJADI KESALAHAN SAAT MENGUNDUH FILE FOTO!',
          text: 'WISUDA GELOMBANG II TAHUN AKADEMIK 2023/2024',
          imageUrl: 'logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
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
      setErrorMessage('Panjang NIM tidak boleh melebihi 9 karakter.');
    }
  }

  const handleKeyPress = (e) => {
    if(filename.length >= 10 && e.key === 'Backspace') {
      e.preventDefault();
    } else if(e.key === 'Enter') {
      handleDownload();
    }
  };

  const clearSearchNIM = () => {
    setFilename('');
    setErrorMessage('');
  }


  return (
    <>
      <div className='container-fluid' style={{ textAlign: 'center' }}>
        <div className='row' style={{ textAlign: "center" }}>
          <div className='col-lg-12'>
            <img src='logo_wisuda2.png' className="img-fluid" alt='' style={{ width: '259px', height: '100px', marginBottom: '40px', marginTop: '25px' }} />
          </div>
        </div>

        <div className='row'>
          <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ width: "25rem", backgroundColor: 'wheat' }}>
              <div className="card-body">
                <h3 style={{ marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}>Selamat & Sukses</h3>
                {/* <h3 style={{ marginBottom: '20px', fontFamily:"'Brush Script MT', cursive", fontSize:"50px" }}>Selamat & Sukses</h3> */}
                <h5>Wisudawan dan Wisudawati</h5>
                <h5>Program Sarjana, Magister, dan Doktor</h5>
                <h5>Gelombang II TA 2023/2024</h5>
                <h5>Universitas Pasundan</h5>
                <br />
                <h5>Sasana Budaya Ganesha (SABUGA)</h5>
                <h5>Sabtu, 18 Mei 2024</h5>
                <br />
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <b>Download Foto Wisuda</b>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div> {/*end div container*/}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: '#fff6e4' }}>
            <div className="modal-header" style={{ borderBottom: 'none' }}>
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ textAlign: 'center' }}>Download Foto Wisuda Universitas Pasundan Gelombang II TA 2023/2024</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input type="number" className="form-control" placeholder="Masukkan NIM" value={filename} onChange={handleChange} onKeyDown={handleKeyPress} />
                {filename && (
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={clearSearchNIM}
                    data-toggle="tooltip"
                    title="Hapus Pencarian NIM"
                    data-placement="top"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
              {errorMessage && <b><p className="text-danger">{errorMessage}</p></b>}
            </div>
            <div className="modal-body" style={{ textAlign: 'center', display: 'block' }}>
              <button type="button" className="btn btn-success" onClick={handleDownload}><b>Download</b></button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <span className="website" style={{ fontSize: '12px' }}>
          &copy; 2024&nbsp;<b><a href="https://www.unpas.ac.id/" target="_blank" rel="noreferrer">
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
          <b> - Made with <span style={{ color: 'red' }}>❤</span>
          </b>
        </span>

        <br />

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

export default DownloadPage;
