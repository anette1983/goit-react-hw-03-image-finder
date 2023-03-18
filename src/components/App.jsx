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



  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    if (currentQuery === prevQuery) {
      return;
    }
    if (currentQuery !== prevQuery || this.state.page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const response = await API.fetchImages(currentQuery, this.state.page);
        if(response.totalHits < 12) {
          this.setState({ isVisible: false });
        } else {
        this.setState({ isVisible: true });
        }

        this.setState({ isLoading: false });
        this.setState(prev => ({
          photos: [...prev.photos, ...response.hits],
        }));

      } catch (error) {
        this.setState({ error: error });
        // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`))
      }
    }
    console.log('this.setState :>> ', this.state.searchQuery);
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.setState({
      photos: [],
      page: 1,
      // searchQuery,
    });
  };


  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.setState({
      isLoading: true,
    });
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
        {isLoading && <Loader/>}
        {photos.length > 0 && (
        <ImageGallery photos={photos} toggleModal={this.toggleModal} onLoadMoreClick={this.loadMoreButton} />
        )}
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
