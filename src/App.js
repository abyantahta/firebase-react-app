import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth.js';
import {db} from './config/firebase.js'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
function App() {
  const [todos,setTodos] = useState([])

  const [newTodo, setNewTodo] = useState('')
  const [newDesc, setNewDesc] = useState('')

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
  const deleteTodo = async (id) =>{
    const todoDoc = doc(db, "todos",id)

    // const 
    await deleteDoc(todoDoc)
    // getDocs()
    getTodos()
  }
  
  const onSubmitTodo = async () => {
    try {
      await addDoc(todosCollectionRef,{
        title : newTodo,
        description : newDesc
      })
      setNewTodo('')
      setNewDesc('')
      getTodos()
      
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getTodos();
  },[])
  return (
    <div className="App">
      <Auth/>

      <div className="">
        <input type="text" value={newTodo} placeholder='todo ' onChange={(e)=>setNewTodo(e.target.value)} />
        <input type="text" value={newDesc} placeholder='description' onChange={(e)=>setNewDesc(e.target.value)} />
        <button onClick={onSubmitTodo}>Add</button>
      </div>
      {console.log(todos)}
      <div className="">
        {todos.map((todo)=>(
          <div className="">
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <button onClick={()=>deleteTodo(todo.id)}>Delete Todo</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
