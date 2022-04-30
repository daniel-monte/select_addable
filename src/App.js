import React,{ useState ,useEffect } from 'react';
import { ListBox } from './components/ListBox';

function App() {
  const [options, setOptions] = useState ([]);

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
      setOptions(val)
    })
  }, [])
  
  return (
    <>
      <ListBox 
        options = { options }
        setOptions = { setOptions } />
    </>
  );
}

export default App;
