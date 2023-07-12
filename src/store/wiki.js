import { makeAutoObservable } from "mobx";

class Wiki {
searchResults = [];
searchInfo = 0;

  constructor(){
    makeAutoObservable(this)
  }

  

  wikiSearch = async (search) => {
      
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    this.searchInfo=json.query.searchinfo.totalhits
    this.searchResults = json.query.search
  };
}

export const WikiInstance = new Wiki()