<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    function saveTask(Request $request){
        //echo $request->all();
        Task::create([
            'taskname'=>$request->text,
            'date'=>$request->day,
            'reminder'=>$request->reminder
        ]);
        return response(['success'=>true, 'message'=>['Form Sucessfully Submitted.']], 200);
// return redirect('/view')->with($request);
    }
    public function getTasks(){
        return Task::all();
    }
    public function getTask($id){
        return Task::find($id);
    }

    public function updateTask(Request $request)
    {
      $res=Task::find($request->id);
      $res->reminder=$request->reminder;
      $res->save();
      return response(['success'=>true, 'message'=>['Updated Successfully']], 200);
    }

    public function deleteTask($id)
    {
       Task::find($id)->delete();
    }
}
