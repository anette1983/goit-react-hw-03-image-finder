import { Component } from 'react';


class Modal extends Component {
  state = {};

  // треба повісити по кліку на карент таргет

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
	
  }

  // звірити з модлко реепти, додати закриття по кліку на бекдропі

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = e => {
    console.log('object :>> ', Date.now());
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
  
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  // showModal = () => {
  //   this.setState({ isShowModal: true });
  // };

  // closeModal = () => {
  //   this.setState({ isShowModal: false });
  // };

  
  render() {
  //   const { currentImage} = this.props;
  //   const { largeImageURL, tags } = currentImage;

  // console.log('currentImage :>> ', currentImage);

    return (
      <div className="overlay" onClick={this.handleBackdropClick}

        // style={{ display: 'block', backdropFilter: 'blur(5px)' }}
        // переписати в сісс
      >
        <div className="modal">
          <img src={this.props.image} alt={this.props.imageName} />
        </div>
      </div>
    );
  }
}
//якось визначити, яку саме фотку у модалку закладати

export default Modal;
