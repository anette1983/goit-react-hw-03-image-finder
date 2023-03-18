
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import Loader from '../Loader/Loader'
// import PropTypes from 'prop-types'


export const ImageGallery = ({ photos, toggleModal, isLoading }) => {
  return (
   <>
    <ul className="gallery" >
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            id={id}
            toggleModal={toggleModal}
          />
        );
      })}
    </ul>
     {/* {isLoading &&  <Loader/>} */}
     </>
    // <ul className="gallery" onClick={onImageClick}>
    //   {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
    //     return (
    //       <ImageGalleryItem
    //         key={id}
    //         webformatURL={webformatURL}
    //         largeImageURL={largeImageURL}
    //         tags={tags}
    //         id={id}
    //         onClick={onImageClick}
    //       />
    //     );
    //   })}
    // </ul>

  );
};

export default ImageGallery;


