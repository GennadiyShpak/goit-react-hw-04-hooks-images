import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import ZoomPicture from './ZoomPicture';
import FetchImg from '../services/fetchImg';

function App() {
  const [pictureInfo, setPictureInfo] = useState('');
  const [fetchResponce, setFetchResponce] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!pictureInfo) {
      return;
    }
    async function fetchImages() {
      setLoading(true);
      try {
        const data = await FetchImg(pictureInfo, currentPage);
        if (data.hits.length === 0) {
          setError(true);
        } else {
          setFetchResponce(prevState => [...prevState, ...data.hits]);
          setLoading(false);
        }
      } catch {
        console.log('error', error);
      }
    }
    fetchImages();
  }, [currentPage, error, pictureInfo]);

  useEffect(() => {
    if (!pictureInfo) {
      return;
    }
    function scrollToNextPage() {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    scrollToNextPage();
  });

  function togleModal() {
    setShowModal(!showModal);
  }

  function modalImgHandler({ target }) {
    const { url } = target.dataset;
    setDatasetUrl(url);
  }

  function handleSearchValue(data) {
    if (pictureInfo === data) {
      return;
    } else {
      setPictureInfo(data);
      setFetchResponce([]);
      setCurrentPage(1);
      setLoading(true);
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearchValue} />
      {error && (
        <h1>
          По вашему запросу <span className="error">"{pictureInfo}"</span>{' '}
          ничего не найденно, введите корректный запрос
        </h1>
      )}
      {loading && (
        <Loader type="Audio" color="#00BFFF" height={80} width={80} />
      )}
      <ImageGallery
        showModal={togleModal}
        fetchArr={fetchResponce}
        onClick={modalImgHandler}
      />
      {fetchResponce && !error && (
        <Button
          onClick={() => {
            setCurrentPage(prevState => prevState + 1);
          }}
        />
      )}
      {showModal && (
        <Modal onClose={togleModal}>
          <ZoomPicture imageSrc={datasetUrl} />
        </Modal>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
