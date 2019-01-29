import React from 'react';

const RepoList = (props) => (
  <div>
    <ul>
      {RenderRepo(props)}
    </ul>
  </div>
)

const SingleRepo = (doc) => {
  return <li><a href='#' onClick={(e)=>{doc.onClick(doc.repo.url,e)}}>{doc.repo.name}</a></li>;
} 

var RenderRepo = function(arr){
  var html = [];
  // console.log(arr);
  arr.repos.map((doc)=>{
    html.push(<SingleRepo repo={doc} key={doc.name} onClick={arr.onClick}/>);
  });
  // console.log(html.length, html)
  if(html.length > 0){
    return html;
  }
  return null;
};

export default RepoList;