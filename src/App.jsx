import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)

    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-purple-200 md:w-1/2 max-w-[95vw] min-h-[80vh]">

        <h1 className="font-bold text-xl text-center">iTask - Manage your todos at one place</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-lg px-4 py-1" />
          <button onClick={handleAdd} disabled={todo.length <= 2} className="bg-violet-800 hover:bg-violet-950 disabled:bg-gray-600 text-white p-3 py-2 rounded-md text-sm font-semibold">Save</button>
        </div>

        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished Todos

        <div className="h-[1px] bg-black opacity-25 w-[90%] mx-auto my-2"></div>

        <h2 className="text-lg font-bold my-2">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-3'>No Todos to display</div>}

          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-[60%] my-3 justify-between">
              <div className='flex gap-4'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />

                <div className={item.isCompleted ? "line-through text-lg" : "text-lg"}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-md text-sm mx-1 font-semibold"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-md text-lg mx-1 font-semibold"><AiFillDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App