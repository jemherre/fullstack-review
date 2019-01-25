import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'example'
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    console.log('seach comp >>');
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={(e)=>{this.onChange(e)}}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;