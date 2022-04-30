import React,{ useState ,useEffect } from 'react';

function App() {
  const [options, setOptions] = useState ([]);

  useEffect (()=> {
    const getCategoriesAPI = async () =>{
      try{
        const url = "http://localhost:3004";
        const response = await fetch (url);
        const result = await response.json;

        return result;
      } catch (error){
        console.log(error);
      }
    }

    setOptions( getCategoriesAPI() );
  }, [])
  
  return (
    <>ddd</>
  );
}

export default App;
