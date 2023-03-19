import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export class App extends Component {
  state = {
    photos: [],
    page: 1,
    searchQuery: '',
    largeImage: '',
    isLoading: false,
    error: null,
    isShownModal: false,
    isVisible: false,
    imageAlt: '',
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextState.searchQuery :>> ', nextState.searchQuery);
  //   console.log('this.state.searchQuery :>> ', this.state.searchQuery);
  //   console.log('nextState !== this.state :>> ', nextState !== this.state);
  //   return nextState !== this.state;
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (
      searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.getPhotos(searchQuery, page);
    //   if (page > 1) {
    //     window.scrollBy({
    //       top: 10000,
    //       behavior: 'smooth',
    //     });
    // }
    } else {
      return;
    }
    console.log('page > 1 :>> ', page > 1);

   
  }
  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    // if (!query) {
    //   return;
    // }

    try {
      const response = await API.fetchImages(query, page);
      console.log('response.totalHits === 0 :>> ', response.totalHits === 0);
      if (response.totalHits < 12) {
        this.setState({ isVisible: false });
      } else {
        this.setState({ isVisible: true });
      }
      if (response.totalHits === 0) {
        alert(`There is no photos for ${this.state.searchQuery} query`);
      }
      this.setState(prev => ({
        photos: [...prev.photos, ...response.hits],
      }));
    } catch (error) {
      this.setState({ error: error });
      // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`))
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({
      searchQuery,
      isVisible: false,
      photos: [],
      page: 1,
    });
  };

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  toggleModal = (image, imageTags) => {
    this.setState(({ isShownModal }) => ({
      isShownModal: !isShownModal,
      largeImage: image,
      imageAlt: imageTags,
    }));
    console.log('this.state.isShownModal :>> ', this.state.isShownModal);
  };

  render() {
    const { photos, isShownModal, largeImage, isVisible, isLoading, imageAlt} =
      this.state;
      
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.error && <p>Something went wrong :( Try again later!</p>}
        {photos.length > 0 && (
          <ImageGallery
            photos={photos}
            toggleModal={this.toggleModal}
            onLoadMoreClick={this.loadMoreButton}
          />
        )}
        {isLoading && <Loader />}
        {(isVisible && !isLoading) && <Button onClick={this.loadMoreButton} />}
        {isShownModal && (
          <Modal
            image={largeImage}
            onClose={this.toggleModal}
            alt={imageAlt}
          />
        )}
      </div>
    );
  }
}
