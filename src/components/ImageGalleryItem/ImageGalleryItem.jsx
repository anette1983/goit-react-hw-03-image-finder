const ImageGalleryItem = ({  id, webformatURL, largeImageURL, tags, toggleModal}) => {
  return (

    <li className="gallery-item" onClick={() => toggleModal(largeImageURL)}>
       
      <img src={webformatURL} alt={tags} />
    </li>
    // <li className="gallery-item" onClick={(id) => onClick(id)}>
       
    //   <img src={webformatURL} alt={tags} />
    // </li>
  );
};



export default ImageGalleryItem;
