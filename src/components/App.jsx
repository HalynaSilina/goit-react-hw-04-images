import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchImages from '../api/ApiService';
import Loader from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchValue === '') return;
    async function getImages() {
      try {
        setLoading(true);
        await fetchImages(searchValue, page).then(data => {
          if (data.hits.length === 0) {
            setLoading(false);
            return Promise.reject(
              new Error(`Nothing found for "${searchValue}"`)
            );
          }
          setImages(state => [...state, ...data.hits]);
          setLoading(false);
          setTotalHits(data.totalHits);
        });
      } catch (error) {
        setLoading(false);
        setError(error);
        toast.error(`${error.message}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
    getImages();
  }, [page, searchValue]);

  useEffect(() => {
    if (images.length !== 0) setIsActive(true)
    if (images.length === totalHits) setIsActive(false);
  }, [images.length, totalHits]);

  const handleFormSubmit = value => {
    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage(state => state + 1);
  };

  const handleOpenModal = image => {
    const largeImage = { url: image.largeImageURL, alt: image.tags };
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p className={css.error}>{error.message}</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {loading && <Loader />}
      {isActive && <Button onClick={handleLoadMoreClick} />}
      {showModal && <Modal image={largeImage} onClose={handleCloseModal} />}
      <ToastContainer />
    </div>
  );
};

export default App;
