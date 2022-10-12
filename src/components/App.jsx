import React, { Component } from 'react';
import {getFetchApi} from './services/fetchAPI'
import Serchbar from './Searchbar/Serchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './app.module.css';

console.log(getFetchApi);
// import Button
export class App extends Component {
  state = {
    loader: true,
    isOpenModal: false,
    isLoadMoreBtn: true,
    searchQuery: '',
    status: 'Indeal',
  };
  render() {
    return (
      <div className={css.App}>
        <Serchbar />
        <ImageGallery />
        {this.state.loader && <Loader />}
        {this.state.isLoadMoreBtn && <Button />}
        {this.state.isOpenModal && <Modal />}
      </div>
    );
  }
}
// * <Searchbar/>, <ImageGallery/>, <ImageGalleryItem/>, <Loader/>, <Button/> і <Modal/>
