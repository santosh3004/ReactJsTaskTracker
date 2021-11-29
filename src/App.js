import Header from './components/Header'
import Tasks from './components/Tasks';
import { useState } from 'react'
import AddTask from './components/AddTask';


function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'First Task Add Web App',
    day: 'Nov 29 2021',
    reminder: true
  }])
  //Add Task
  const addTask=(task)=>{
    const id=Math.floor(Math.random()*10000)+1
    const newTask={id,...task}
    setTasks([...tasks,newTask])
  }



  //Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }


  //Toggle Reminder
  const toggleRem = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task,reminder:!task.reminder} : task))
}
return (
  <div className="container">
    <Header onAddBtn={()=>setShowAddTask(!showAddTask)} showADD={showAddTask}/>
    {showAddTask&&<AddTask onAdd={addTask}/>}
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRem} /> : 'No Task ASsigned'}
  </div>
);
}

export default App;
