
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import StyledUl from './ImageGallery.styled';
// import PropTypes from 'prop-types'


export const ImageGallery = ({ photos, toggleModal}) => {
  return (
   <>
   
    <StyledUl>
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
    </StyledUl>
     
     </>
    // <ul onClick={onImageClick}>
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


