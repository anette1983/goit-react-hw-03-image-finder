import { Component } from 'react';
import {BiSearch} from 'react-icons/bi'

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    const target = event.target.value.toLowerCase();
    console.log('target :>> ', target);
    this.setState(prevState => ({
      ...prevState,
      searchQuery: target,
    }));
    
  };

 

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.searchQuery.trim()==='') {
      alert('fill in search query');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

 
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            {/* <span className="button-label">Search</span> 
            */}
            <span>
              <BiSearch width="15" height="15"/>
            </span>

          </button>

          <input onChange={this.handleQueryChange}
            className="input"
            type="text"
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
