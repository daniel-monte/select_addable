import React,{ useState ,useEffect } from 'react';
import { SelectAddable } from './components/SelectAddable';
import { categories } from './__mocks__/categories';

function App() {
  const [optionsInput, setOptionsInput] = useState ([]);
  const [selectedInput, setSelectedInput] = useState ({});
  const [newOption, setNewOption] = useState ();

  useEffect (()=> {
    const getCategoriesAPI = async () =>{
      try {
        const url = "http://localhost:3004/categories"; // json-server
        const response = await fetch (url);
        const result = await response.json();
        
      } catch ( error ){
        //console.log( error );
        return categories;
      }
    }

    getCategoriesAPI().then( data => {

      data.map( element => {
        element.name = element.name[0].toUpperCase() + element.name.slice(1); //Mayuscula la primera letra
        return element
      })
      //ordenando un poco antes de enviar
      data.sort( (a, b)=>{
        return  a.name > b.name ? 1  :
                a.name < b.name ? -1 :
                0
      })

      setOptionsInput(data)
    })

  }, [])

  useEffect(()=>{
    const handleSubmitOption = async (option)=>{
      try {
        const url = "http://localhost:3004/categories"; // json-server
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(option),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json();
        console.log(result)
        
      } catch ( error ) {
        //console.log(error);
      }
    }

    newOption !== undefined && handleSubmitOption(newOption)
    

  }, [ newOption ])
  
  return (
    <div className="flex justify-center pt-16">
      <SelectAddable 
        options = { optionsInput }
        setOptions = { setOptionsInput }

        selected = { selectedInput }
        setSelected = { setSelectedInput } 

        setNewOption = { setNewOption } 
        />
    </div>
  );
}

export default App;
