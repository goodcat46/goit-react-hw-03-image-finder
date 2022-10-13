import React, { Component } from 'react';
import { PixabayApi } from './services/fetchAPI';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './app.module.css';

const pixabayApi = new PixabayApi();
// console.log(pixabayApi);

export class App extends Component {
  state = {
    isLoader: false,
    isOpenModal: false,
    isLoadMoreBtn: false,
    searchQuery: '',
    loadedData: [],
    totalHits: null,
    status: 'Indeal',
    currentImgUrl: '',
  };
  onSearchInputChange = event => {
    let { target } = event;
    this.setState({ searchQuery: target.value.trim() });
  };
  onSearchFormSubmit = async event => {
    event.preventDefault();
    //* зчитую інпут
    pixabayApi.searchQuery = this.state.searchQuery.trim();
    //* скидую лічильник
    pixabayApi.page = 1;

    // * Якщо відправляться пусте поле запит не відбудеться
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.info('Please type your query');
      return;
    }
    // *Варіант через async/await
    try {
      const { data } = await pixabayApi.fetchPhotosByQuery();
      this.setState({
        isLoader: true,
        isLoadMoreBtn: true,
        loadedData: data.hits,
      });
      console.log(data);

      if (data.totalHits === 0) {
        this.setState({ isLoadMoreBtn: false });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        //* ховаю кнопку
        this.setState({ isLoadMoreBtn: false });
        //* виводжу повідомлення про кінець запитів
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page) {
        // Якщо ТІЛЬКИ одна сторінка то тільки відмальовуємо
        this.setState({ isLoadMoreBtn: false });
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        return;
      }

      //* малюю галерею
      // galleryEl.innerHTML = makeGalleryCards(data.hits);
      //* показую кнопку
      // loadMoreBtnEl.classList.remove('is-hidden');
      //* додаю слухач подій на кнопку
      // loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } catch (err) {
      // помилка піде у лог
      console.log(err);
    } finally {
      this.setState({ isLoader: false });
    }
  };
  onLoadMoreBtnClick = async event => {
    // Варіант через async/await
    try {
      pixabayApi.page += 1;

      const { data } = await pixabayApi.fetchPhotosByQuery();

      console.log(data);

      //* показую лоадер
      this.setState(prevState => ({
        isLoader: true,
        isLoadMoreBtn: true,
        loadedData: [...prevState.loadedData, ...data.hits],
      }));

      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        this.setState({ isLoadMoreBtn: false });
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoader: false });
    }
  };
  handleToggleModal = el => {
    let { isOpenModal } = this.state;
    this.setState({ isOpenModal: !isOpenModal, currentImgUrl: el });
  };
  componentDidMount() {}
  render() {
    const { currentImgUrl, loadedData } = this.state;
    return (
      <div className={css.App}>
        <Searchbar
          onSearchFormSubmit={this.onSearchFormSubmit}
          onSearchInputChange={this.onSearchInputChange}
        />
        {loadedData.length !== 0 && (
          <ImageGallery
            loadedData={loadedData}
            onToggleModal={this.handleToggleModal}
          />
        )}

        {this.state.isLoader && <Loader />}
        {this.state.isLoadMoreBtn && (
          <Button onLoadMoreBtnClick={this.onLoadMoreBtnClick} />
        )}
        {this.state.isOpenModal && (
          <Modal
            currentImgUrl={currentImgUrl}
            onToggleModal={this.handleToggleModal}
          />
        )}
      </div>
    );
  }
}
// * <Searchbar/>, <ImageGallery/>, <ImageGalleryItem/>, <Loader/>, <Button/> і <Modal/>
