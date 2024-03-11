import { useEffect, useState} from 'react'
import { RxCross1 } from "react-icons/rx"
import { TiPencil } from "react-icons/ti"
import './App.css';

const todoItemsAre = () => {
  const storedTodo = JSON.parse(localStorage.getItem('todoItems'));
  return storedTodo ? storedTodo : []
}

function App() {
  const [todo, setTodo] = useState(todoItemsAre())
  const [todoItem, setTodoItem] = useState("")
  const [count, setCount] = useState("Add a todo")
  const [editItemId, setEditItemId] = useState(null);
 
 
  useEffect(() => {
   localStorage.setItem("todoItems", JSON.stringify(todo))
  },[todo])

  const handlingForm = (event) =>{
    event.preventDefault();
    if(todoItem === ""){
      alert("Please Enter a Valid Text")
    }else{
      const newTodo = {text:todoItem, status:false, id: Math.random()}   
          setTodo([...todo, newTodo])  
      const countvalue = todo.filter((each) => (
        each.text === todoItem
      ))
      if(countvalue.length > 0){
        setCount(`${todoItem} ${countvalue.length + 1}`)
      }
      else{
        setCount("Add a todo")
      }
      setTodoItem("")
    }
    
  }

  const onClickingDelete = (id) => {
    const filterdTodo = todo.filter((each) => each.id !== id)
    console.log(filterdTodo.length)
    const countvalue = filterdTodo.filter((each) => (
      each.text === todo.text
    ))
    setTodo(filterdTodo)
    setCount("Add a todo")
  }

  const handleEdit = (id, newText) => {
    const updatedTodo = todo.map((each) => {
      if (each.id === id) {
        each.text = newText;
      }
      return each;
    });

    setTodo(updatedTodo);
    setEditItemId(null);
  };

  return (
    <div className='container'>
      <form onSubmit = {handlingForm} className='form'>
        <h1>Days Goals!</h1>
        <input className='input' type = 'text' placeholder = {`${count}`} value={todoItem} onChange={(e) => {setTodoItem(e.target.value)}}/><br/>
        <button className='addBtn' type = 'submit'>Add Todo</button>
      </form>
      <ul>
        {todo.map((each) => (
          <li key={each.id} className='todo-item'>
            {editItemId === each.id ? (
              <>
                <input className='editsearch'
                  type="text"
                  value={each.text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setTodo((prevTodo) =>
                      prevTodo.map((item) =>
                        item.id === each.id ? { ...item, text: newText } : item
                      )
                    );
                  }}
                />
                <button
                  className='save'
                  type="button"
                  onClick={() => handleEdit(each.id, each.text)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>{each.text}</p>  
                  <div><TiPencil  className='pencil' onClick={() => setEditItemId(each.id)}/>
                  <RxCross1 className='cross' onClick={() => onClickingDelete(each.id)}/>
                  </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;

