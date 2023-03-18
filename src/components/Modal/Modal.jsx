import { Component } from 'react';
// import StyledOverlay from './Modal.styled';
import * as Css from './Modal.styled'


class Modal extends Component {
  state = {};

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

  
  render() {

    return (
      <Css.StyledOverlay onClick={this.handleBackdropClick}

        // style={{ display: 'block', backdropFilter: 'blur(5px)' }}
        // переписати в сісс
      >
        <Css.StyledModal>
          <img src={this.props.image} alt={this.props.imageName} />
        </Css.StyledModal>
      </Css.StyledOverlay>
    );
  }
}


export default Modal;
