import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth.js';
import {auth, db,storage} from './config/firebase.js'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
function App() {
  const [todos,setTodos] = useState([])

  const [newTodo, setNewTodo] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [fileUpload,setFileUpload] = useState(null)
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
  const updateTitle = async (id) =>{
    try {
      const todoDoc = doc(db, "todos",id)
  
      await updateDoc(todoDoc, {title : newTitle})
      // getDocs()
      setNewTitle('')
      getTodos()
      
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTodo = async (id) =>{
    try {
      const todoDoc = doc(db, "todos",id)
  
      // const 
      await deleteDoc(todoDoc)
      // getDocs()
      getTodos()
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const onSubmitTodo = async () => {
    try {
      await addDoc(todosCollectionRef,{
        title : newTodo,
        description : newDesc,
        userId : auth?.currentUser?.uid
      })
      setNewTodo('')
      setNewDesc('')
      getTodos()
      
    } catch (err) {
      console.log(err)
    }
  }

  const uploadFile = async () =>{
    // console.log(fileUpload)
    if(!fileUpload) return;
    console.log(fileUpload)
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload[0].name}`)
    try {
      console.log(filesFolderRef)
      console.log(fileUpload)
      await uploadBytes(filesFolderRef,fileUpload[0])
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
            <input type="text" placeholder='new Title' onChange={(e)=>setNewTitle(e.target.value)}/>
            <button onClick={()=>updateTitle(todo.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div className="">
        <input type="file" onChange={(e)=>{setFileUpload(e.target.files)}} />
        <button onClick={uploadFile}> Uploadfile </button>
      </div>
    </div>
  );
}

export default App;
