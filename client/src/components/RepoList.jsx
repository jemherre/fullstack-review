import React from 'react';

const RepoList = (props) => (
  <div>
    {/* <h4> Repo List Component </h4>
    There are {props.repos.length} repos. */}
    <ul>
      {RenderRepo(props.repos)} 
    </ul>
  </div>
)

const SingleRepo = (doc) => {
  return <li><a href='#' onClick={(e)=>{console.log(e)}}>{doc.repo.name}</a></li>;
} 

var RenderRepo = function(list){
  var html = [];
  list.map((doc)=>{
    html.push(<SingleRepo repo={doc} key={doc.name}/>);
  });

  return html;
};

export default RepoList;