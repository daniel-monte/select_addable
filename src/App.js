import React,{ useState ,useEffect } from 'react';
import { SelectAddable } from './components/SelectAddable';

function App() {
  const [optionsInput, setOptionsInput] = useState ([]);
  const [queryInput, setQueryInput] = useState (0);

  useEffect (()=> {
    const getCategoriesAPI = async () =>{
      try {
        const url = "http://localhost:3004/categories";
        const response = await fetch (url);
        const result = await response.json();
        return result
      } catch (error){
        console.log(error);
      }
    }

    getCategoriesAPI().then( val => {  
      setOptionsInput(val)
    })
  }, [])
  
  return (
    <div className="flex justify-center pt-16">
      <SelectAddable 
        options = { optionsInput }
        setOptions = { setOptionsInput }

        query = { queryInput }
        setQuery = { setQueryInput } 
        />
    </div>
  );
}

export default App;
