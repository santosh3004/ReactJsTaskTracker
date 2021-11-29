import Header from './components/Header'
import Tasks from './components/Tasks';
import {useState} from 'react'


function App() {
  const [tasks,setTasks]=useState([{
    id:1,
    text:'First Task Add Web App',
    day:'Nov 29 2021',
    reminder:true
  }])
  //Delete task
  const deleteTask=(id)=>{
    setTasks(tasks.filter((task)=> task.id!==id))
  }
  return (
    <div className="container">
      <Header/>
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask}/>:''}
    </div>
  );
}

export default App;
