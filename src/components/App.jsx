import { Component } from 'react';
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
    // currentImage: {},
  };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   try {
  //       const photos = await API.fetchImages();
  //       // як сюди передати квері і чи потрібен цей метод
  //       this.setState({ photos});

  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    if (currentQuery !== prevQuery || this.state.page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const response = await API.fetchImages(currentQuery, this.state.page);
        console.log('response :>> ', response);
        // if (!response.length) {
        //   // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`));
        //   throw new Error(
        //     `There is no photos for ${this.state.searchQuery} query`
        //   );
        // }
        if(response.totalHits < 12) {
          this.setState({ isVisible: false });
        } else {
        this.setState({ isVisible: true });
        }

        this.setState({ isLoading: false });
        this.setState(prev => ({
          photos: [...prev.photos, ...response.hits],
        }));

        // this.setState({ photos });
      } catch (error) {
        this.setState({ error: error });
        // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`))
      }
    }
    // if (prevProps.searchQuery !== this.props.searchQuery) {
    //   try {
    //     this.setState({ status: 'pending' });
    //     const photos = await API.fetchImages(this.props.searchQuery);
    //     // this.setState({ photos });
    //     this.setState(state => ({
    //       photos,
    //       status: 'resolved',
    //     }));
    //   } catch (error) {
    //     this.setState({ status: 'rejected' });
    //     // return Promise.reject(new Error(`There is no photos for ${this.props.searchQuery} query`))
    //   }
    // }
    console.log('this.setState :>> ', this.state.searchQuery);
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.setState({
      photos: [],
      page: 1,
    });
    // this.addImages(searchQuery);
  };

  // handleImageClick = id => {
  //   // сюди отримуємо айді картинки
  //   // if(id) {

  //   // }
  //   console.log(id);
  //   const photo = this.state.photos.find(item => item.id === id);
  //   console.log('photo :>> ', photo);
  //   this.setState({ currentImage: photo });
  //   this.toggleModal();
  // };

  // addImages = async searchQuery => {
  //   try {
  //     this.setState({ status: 'pending', photos: [] });
  //     const photos = await API.fetchImages(searchQuery);
  //     // this.setState({ photos });
  //     this.setState(state => ({
  //       photos,
  //       searchQuery,
  //       status: 'resolved'
  //     }));
  //     // не працює. із лоудінг фолс вже працює
  //   } catch (error) {
  //     this.setState({ status: 'rejected' });
  //   }
  // };
  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.setState({
      isLoading: true,
    });
  };
  // переписати з функцією!!! бо від попереднього

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
      <>
      {/* додати сюди ще спіннер при із лоудінг чи не сюди. а у галерею */}
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {photos.length > 0 && (
        <ImageGallery photos={photos} toggleModal={this.toggleModal} onLoadMoreClick={this.loadMoreButton} isLoading={isLoading} />
        )}
        {isVisible && <Button onClick={this.loadMoreButton} />}
        {isShownModal && (
        <Modal
            image={largeImage}
            onClose={this.toggleModal}
            alt={photos.tag}
          />
        )}

        {/* {this.state.error && <p>{this.state.error.message}</p>} */}
        {/* {true && <Modal currentImage={this.state.currentImage} />} */}
       
      </>
    );

    // if (status === 'idle') {
    //   return (
    //     <>
    //     <Searchbar
    //         onSubmit={this.addImages}
    //         getSearchQueryValue={this.handleSearchSubmit}
    //       />
    //       <p>Enter search query</p>
    //     </>
    //   );
    // }

    // if (status === 'pending') {
    //   return <p>Loading...</p>;
    // }

    // if (status === 'rejected' || photos.length === 0) {
    //   // console.log(error.message);
    //   // return <p>Whoops, something went wrong: {error.message}</p>;
    //   return (
    //    <>
    //     <Searchbar
    //         onSubmit={this.addImages}
    //         getSearchQueryValue={this.handleSearchSubmit}
    //       />
    //   <p>Whoops, something went wrong</p>
    //   </>
    //   )
    // }

    // if (status === 'resolved') {
    //   return (
    //     <>
    //      <Searchbar
    //         onSubmit={this.addImages}
    //         getSearchQueryValue={this.handleSearchSubmit}
    //       />
    //       <ImageGallery photos={photos} searchQuery={this.searchQuery} />
    //       <Modal photos={photos} />
    //     </>
    //   );
    // }

    //         <GlobalStyle/>
    //         <Searchbar onSubmit={this.addImages} getSearchQueryValue={this.handleSearchSubmit}/>
    //         {error && <p>Whoops, something went wrong: {error.message}</p>}
    //         {/* {!searchQuery && <p>Enter search query</p>} */}
    //         {isLoading && <p>Loading...</p>}
    //         {/* {!photos.length && <p>There is no such picture</p>} */}
    //         {photos.length > 0 && <ImageGallery photos={photos} searchQuery={searchQuery}/>}

    //         {/* так пешка висит все время до запроса */}
    //         <Modal photos={photos}/>
    //       </>
    //     );
    //   }
  }
}
