import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({photos}) => {
  console.log('photos :>> ', photos);
  
    return (
    <ul className="gallery">{
      photos.map(({id,webformatURL, largeImageURL, tags}) => {
        console.log('largeImageURL :>> ', largeImageURL);

        return (
        <ImageGalleryItem key={id} webformatURL={webformatURL}largeImageURL={largeImageURL} tags={tags}/>
        )
})
    }</ul>
    );
  };
  
  export default ImageGallery;



  