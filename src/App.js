import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {

  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);
  //将枚举类型转换成数组
  // console.log(FILTER_NAMES);

  const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
          key={name}
          name={name}
          isPressed={name === filter}
          setFilter={setFilter}
      />
  ));
  //通过数据的map方法，构建了所有的filter button对象
  // console.log(filterList);

  const taskList = tasks
      .filter(FILTER_MAP[filter])
      .map((task) => (
          <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
          />
  ));
  //map的用法和之前类似。 tasks则是从index.js传过来的参数,是一个简单对象数组。
  //taskList则是一个<Todo>组件的数组
  // console.log(tasks);
  // console.log(taskList);


  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        // console.log({...task});
        // console.log({ ...task, completed: !task.completed });
        // console.log(task.id);

        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task)=>{
      if (id === task.id) {
        return { ...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 id="list-heading">{headingText}</h2>
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading">
          {taskList}
        </ul>
      </div>
  );
}

export default App;
