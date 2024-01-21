import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth.js';
import {db} from './config/firebase.js'
import { getDocs, collection } from 'firebase/firestore';
function App() {
  const [todos,setTodos] = useState([])

  const todosCollectionRef = collection(db,'todos')
  const getTodos = async () =>{
    console.log('lewat sini')
  //READ THE DATA
  //SET THE TODOS
  try {
    const datas = await getDocs(todosCollectionRef)
    console.log(datas)
    const filteredData = datas.docs.map((doc)=>({
      ...doc.data(),
      id : doc.id
    }))
    setTodos(filteredData)
    
  } catch (error) {
    console.log(error)
  }
  }
  
  useEffect(()=>{
    getTodos();
  },[])
  return (
    <div className="App">
      <Auth/>
      <div className="">
        {todos.map((todo)=>(
          <div className="">
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
