import { observer } from "mobx-react";
import { WikiInstance } from "./store/wiki";
import { useState } from "react";


const SearchList = observer(() => {
  const {searchResults, searchInfo, wikiSearch} = WikiInstance;
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === ""){
      return;
    }
    wikiSearch(search);
  };
  return (
<div className="App">
      <header>
        <h1>Wiki Viewer</h1>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="What are u looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {searchInfo ? (
          <p>Search results: {searchInfo} </p>
        ) : (
          ""
        )}
      </header>
      <div className="results">
        {searchResults.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={i} >
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
              <a href={url} target="_blank" rel="noreferrer">Read more</a>
            </div>
          );
        })}
      </div>
    </div>

  )
})

export default SearchList;