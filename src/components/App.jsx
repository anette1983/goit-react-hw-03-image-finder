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
    };



  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, '<><><><><>');
    const {searchQuery, page} = this.state;

    if (searchQuery !== prevState.searchQuery || this.state.page !== prevState.page) {
      this.getPhotos(searchQuery, page);

    console.log('this.setState :>> ', this.state.searchQuery);
  }
}

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    
    try {
      const response = await API.fetchImages(query, page);
      if(response.totalHits < 12) {
        this.setState({ isVisible: false });
      } else {
        this.setState({ isVisible: true });
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
  } 

  handleSearchSubmit = searchQuery => {
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
  

  toggleModal = image => {
    this.setState(({ isShownModal }) => ({
      isShownModal: !isShownModal,
      largeImage: image,
    }));
    console.log('this.state.isShownModal :>> ', this.state.isShownModal);
  };

  render() {
    const { photos, isShownModal, largeImage, isVisible, isLoading } = this.state;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.error && <p>Something went wrong :( Try again later!</p>}
        {photos.length > 0 && (
          <ImageGallery photos={photos} toggleModal={this.toggleModal} onLoadMoreClick={this.loadMoreButton} />
          )}
        {/* {photos.length === 0 && <p>There are no photos for your query :( </p>}   */}
        {isLoading && <Loader/>}
        {isVisible && <Button onClick={this.loadMoreButton} />}
        {isShownModal && (
          <Modal
          image={largeImage}
          onClose={this.toggleModal}
          alt={photos.tag}
          />
          )}
      
      </div>
    );
  }
}
