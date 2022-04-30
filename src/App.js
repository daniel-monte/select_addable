import React,{ useState ,useEffect } from 'react';
import { InputBox } from './components/InputBox';

function App() {
  const [options, setOptions] = useState ([]);
  const [selected, setSelected] = useState (0);

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
      <InputBox 
        options = { options }
        setOptions = { setOptions }

        selected = { selected }
        setSelected = { setSelected } 
        
        />
    </>
  );
}

export default App;
