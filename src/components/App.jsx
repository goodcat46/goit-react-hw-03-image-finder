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
    loader: true,
    isOpenModal: false,
    isLoadMoreBtn: true,
    searchQuery: '',
    status: 'Indeal',
  };
  onSearchInputChange = event => {
    let { target } = event;
    this.setState({ searchQuery: target.value });
  };
  onSearchFormSubmit = async event => {
    event.preventDefault();
    //* зчитую інпут
    pixabayApi.searchQuery = this.state.searchQuery;
    //* скидую лічильник
    pixabayApi.page = 1;
    //* ховаю кнопку
    // loadMoreBtnEl.classList.add('is-hidden');

    // *Варіант через async/await
    try {
      const { data } = await pixabayApi.fetchPhotosByQuery();
      console.log(data);

      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        //* очищаю галрею
        // galleryEl.innerHTML = '';
        //* виводжу повідомлення про кінець запитів
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page) {
        // Якщо ТІЛЬКИ одна сторінка то тільки відмальовуємо, (is-hidden не знімаємо)
        // galleryEl.innerHTML = makeGalleryCards(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        return;
      }
      if (data.totalHits === 0) {
        //* очищаю галрею
        // galleryEl.innerHTML = '';
        //* виводжу повідомлення про невдачу
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
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
    }
  };
  onLoadMoreBtnElClick = async event => {
    // Варіант через async/await
    try {
      pixabayApi.page += 1;
  
      const { data } = await pixabayApi.fetchPhotosByQuery();
  
      console.log(data);
  
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        // loadMoreBtnEl.classList.add('is-hidden');
        // loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnElClick);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      // galleryEl.insertAdjacentHTML('beforeend', makeGalleryCards(data.hits));
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar
          onSearchFormSubmit={this.onSearchFormSubmit}
          onSearchInputChange={this.onSearchInputChange}
        />
        <ImageGallery />
        {this.state.loader && <Loader />}
        {this.state.isLoadMoreBtn && <Button />}
        {this.state.isOpenModal && <Modal />}
      </div>
    );
  }
}
// * <Searchbar/>, <ImageGallery/>, <ImageGalleryItem/>, <Loader/>, <Button/> і <Modal/>
