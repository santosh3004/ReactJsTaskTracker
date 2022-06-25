import Header from './components/Header'
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import { useState,useEffect} from 'react'
import AddTask from './components/AddTask';
//import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom'
import About from './components/About';
import {BrowserRouter,Switch,Route} from 'react-router-dom';



function App() {
  var csrf_token='<?php echo csrf_token(); ?>'
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // const fetchTasks=async()=>{
  //   const res=await fetch('http://localhost:5000/tasks')
  //   const data=await res.json()
  //   console.log(data);
  //   return data
  // }

  const fetchTasks=async()=>{
      const res=await fetch('https://api-tasktracker.usedones.xyz/api/tasks')
      const data=await res.json();
      console.log(data);
      return data;
    }

  const fetchTask=async(id)=>{
  //   const res=await fetch('http://localhost:5000/tasks/${id}')
  //   const data=await res.json()
  //   return data
    const res=await fetch(`https://api-tasktracker.usedones.xyz/api/task/${id}`)
    const data=await res.json()
    return data;
  }


  //Add Task
  const addTask=async(task)=>{
  //   const res =await fetch('http://localhost:5000/tasks',{
  //     method:'POST',headers:{
  //       'Content-type':'application/json'
  //     },
  //     body:JSON.stringify(task)
  //   })
    //var csrf_token='<?php echo csrf_token(); ?>'
    const res =await fetch('https://api-tasktracker.usedones.xyz/api/savetask',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRF-TOKEN': csrf_token
      },
      body:JSON.stringify(task)
    })
    //const data=await res.json()
    //console.log(data);
    setTasks([...tasks,task])
    // const id=Math.floor(Math.random()*10000)+1
    // const newTask={id,...task}
    // setTasks([...tasks,newTask])
  }
  //Delete task
  const deleteTask = async (id) => {
    const toDeleteId=id
// await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'});
//     setTasks(tasks.filter((task) => task.id !== id))


await fetch(`https://api-tasktracker.usedones.xyz/api/delete`,{method:'POST',headers:{
  'Content-type':'application/json',
  'X-CSRF-TOKEN': csrf_token
},
body:JSON.stringify({id:toDeleteId})})
    setTasks(tasks.filter((task) => task.id !== id))

  }


//   //Toggle Reminder
  const toggleRem = async (id) => {
    const taskToToggle=await fetchTask(id)
    // const updTask={...taskToToggle,reminder:!taskToToggle.reminder
      const updTask={reminder:!taskToToggle.reminder}
    

//     const res =await fetch('http://localhost:5000/tasks/${id}',{
//       method:'PUT',
//       headers:{
//         'Content-type':'application/json'
//       },
//       body:JSON.stringify(updTask)
//     })
//     const data=await res.json()


    const res =await fetch(`https://api-tasktracker.usedones.xyz/api/updatetask/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json',
        'X-CSRF-TOKEN': csrf_token
      },
      body:JSON.stringify(updTask)
    })
     const data=await res.json()

     setTasks(tasks.map((task) => task.id === id ? { ...task,reminder:!task.reminder} : task))
}
return (
  
  <div className="container">
    <BrowserRouter>
    <Header onAddBtn={()=>setShowAddTask(!showAddTask)} showADD={showAddTask}/>
    <Switch>
      <Route path='/' exact render={(props)=>(
      <>{showAddTask&&<AddTask onAdd={addTask}/>}
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRem} /> : 'No Task Assigned'}
      </>
    )}/>
      <Route path='/about'><About/></Route> 
      {/* component={About}/> */}
   </Switch>
    <Footer/>
    </BrowserRouter>
  </div>
);
}

export default App;
