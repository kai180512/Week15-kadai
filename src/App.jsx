import {useState, useEffect } from "react";
import TaskItem from './components/TaskItem';

function App(){
  const[tasks, setTasks] = useState(() =>{
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
    });

    const[input, setInput] = useState("");
    const[filter, setFilter] = useState("all");

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (event) => {
      event.preventDefault();
      const text = input.trim();
      if(text===""){
        return;
      }

      setTasks([...tasks, { id:Date.now(), text, done: false}]);
      setInput("");
    };

    const toggleTask =(id)=> {
      setTasks(tasks.map((task) => task.id === id ? {...task, done: !task.done} : task
    )
  );
};

const visibleTasks = tasks.filter((task) => {
  if(filter==="done"){
    return task.done;
  }
  if(filter==="undone"){
    return !task.done;
  }
  return true;
});

const deleteTask =(id)=>{
  setTasks(tasks.filter((task)=>task.id !== id));
};

return (
  <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
        className="border rounded px-3 py-2 flex-1"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="新しいタスクを入力..."
        />

        <button type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:scale-105"
        >追加</button>

      </form>

      <div className="flex gap-2 mb-4">
        <button
        onClick={() => setFilter("undone")}
        className={
          filter === "undone"
          ? "bg-blue-500 text-white px-3 py-1 rounded"
          : "border px-3 py-1 rounded"
        }
          >未完了</button>

      <button
      onClick={() => setFilter("done")}
      className = {
        filter==="done"
        ?"bg-blue-500 text-white px-3 py-1 rounded"
        :"border px-3 py-1 rounded"
      }
      >完了</button>

      <button
      onClick={() => setFilter("all")}
      className={
        filter==="all"
        ? "bg-blue-500 text-white px-3 py-1 rounded"
        : "border px-3 py-1 rounded"
      }
      >すべて</button>
      </div>

      <ul className="space-y-2">
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
      
            {tasks.length === 0 && (
              <p className="text-center text-gray-400 mt-8">
                タスクがありません
              </p>
            )}
          </main>
        );
      }

export default App;