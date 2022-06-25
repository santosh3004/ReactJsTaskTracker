import {useState} from 'react'

const AddTask=(props)=>{
  const [text,setText]=useState('')
  const [day,setDay]=useState('')
  const [reminder,setReminder]=useState(false)

const onSubmit=(e)=>{
  e.preventDefault()
  if (!text) {
    alert('Please Add Task')
    return
  }
  props.onAdd({text,day,reminder})
  setText('')
  setDay('')
  setReminder(false)
}

  return(
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Add Task'/>
      </div>

      <div className='form-control'>
        <label>Day & Time</label>
        <input value={day} onChange={(e)=>setDay(e.target.value)} type='text' placeholder='Add Day and Time'/>
      </div>

      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input checked={reminder} value={text} onChange={(e)=>setReminder(e.currentTarget.checked)} type='checkbox'/>
      </div>

      <input className='btn btn-block' type='submit' value='Save'/>
    </form>
  )
}
export default AddTask