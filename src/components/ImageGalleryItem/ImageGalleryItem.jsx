import StyledLi from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, toggleModal}) => {
  return (

    <StyledLi onClick={() => toggleModal(largeImageURL)}>
      <img src={webformatURL} alt={tags} />
    </StyledLi>
    
    // <li onClick={(id) => onClick(id)}>
       
    //   <img src={webformatURL} alt={tags} />
    // </li>
  );
};



export default ImageGalleryItem;
