import {Component} from 'react';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';





export class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
        const photos = await API.fetchImages("react");
        console.log('photos :>> ', photos);
        this.setState({ photos});
        
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    } 

  render() {
    const {photos} = this.state; 
    return (
      <>
      <Searchbar/>
      <ImageGallery photos={photos}/>
      </>
      
    );
  }
};
