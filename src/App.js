import React,{ useState ,useEffect } from 'react';
import { SelectAddable } from './components/SelectAddable';

function App() {
  const [optionsInput, setOptionsInput] = useState ([]);
  const [selectedInput, setSelectedInput] = useState ({});

  useEffect (()=> {
    const getCategoriesAPI = async () =>{
      try {
        const url = "http://localhost:3004/categories";
        const response = await fetch (url);
        const result = await response.json();

        //ordenando un poco antes de enviar
        return result.sort( (a, b)=>{
          return  a.name > b.name ? 1  :
                  a.name < b.name ? -1 :
                  0
        })
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

        selected = { selectedInput }
        setSelected = { setSelectedInput } 
        />
    </div>
  );
}

export default App;
