const ImageGalleryItem = ({ webformatURL, largeImageURL, tags}) => {
  console.log('webformatURL :>> ', webformatURL);
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
