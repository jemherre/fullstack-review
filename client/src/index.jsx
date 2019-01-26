import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    
  }

  search (term) {
    console.log(`${term} was searched`);
    var app =this;
    console.log('this---- ',this);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {
        'user': term
      },
      success: function(result){
        console.log('success',result);
        //another ajax request to get and load info
        $.ajax({
          method: 'GET',
          url: '/repos',
          success: function (result){
            var obj = JSON.parse(result); //used for printing # of repos
            app.setState({repos: obj});
          }
        });

      }
    });
  }

  handleClick(link){
    $.ajax({
      method: 'POST',
      url: '/repo',
      data: {link},
      success: function (result){
        // var obj = JSON.parse(result); //used for printing # of repos
        console.log(result);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} onClick={this.handleClick.bind(this)}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));