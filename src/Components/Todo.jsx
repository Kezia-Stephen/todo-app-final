import React, { useState } from "react";

// Initial state
const init = {
  taskinput: "",
  timeofday: "",
  isCompleted: false,
};

const Todo = () => {
  const [item, setItem] = useState(init);
  const [todoList, setTodoList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [update, setUpdate] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem !== null) {
      let oldItems = [...todoList];
      oldItems[editItem] = item;
      setTodoList(oldItems);
      setItem(init);
      setUpdate(false);
      setEditItem(null);
    } else {
      setTodoList([...todoList, item]);
      setItem(init);
      console.log("Hello");
    }
  };

  const editHandler = (itm, idx) => {
    setItem(itm);
    setEditItem(idx);
    setUpdate(true);
  };

  const deleteHandler = (idx) => {
    todoList.splice(idx, 1);
    setTodoList([...todoList]);
  };

  // const completeTodo = index => {
  //   const newTodos = [...todos];
  //   newTodos[index].isCompleted = true;
  //   setTodos(newTodos);
  // };

  const completeHandler = (idx) => {
    const newList = [...todoList];
    newList[idx].isCompleted = true;
    setTodoList(newList);
  };

  return (
    <div>
      <div className="inputtab">
        <p className="h3 row h-100 justify-content-center align-items-center">
          Todo App
        </p>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="taskinput">
                      <strong>Task Name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="taskinput"
                      name="taskinput"
                      placeholder="Enter your task"
                      value={item.taskinput}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="timeofday">
                      <strong>Time of the day</strong>
                    </label>
                    <select
                      className="form-control form-control-md"
                      id="timeofday"
                      name="timeofday"
                      value={item.timeofday}
                      onChange={handleChange}
                    >
                      <option>Choose one</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                      <option>Night</option>
                    </select>
                  </div>
                </div>
                {!update ? (
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-customized"
                      disabled={!item.taskinput || !item.timeofday}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <button type="submit" className="btn btn-customized">
                      Update
                    </button>
                  </div>
                )}
                <br></br>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Todo Card List */}
      <div className="todo-list">
        {Array.isArray(todoList) &&
          todoList.map((itmlist, index) => (
            <div
              className="todo-list-item"
              key={index}
              completeHandler={completeHandler}
            >
              {/* <span>
                <input
                  type="checkbox"
                  checked={itmlist.isCompleted}
                  onChange={() => completeHandler(index)}
                />
              </span> */}

              <div
                style={{
                  textDecoration: itmlist.isCompleted ? "line-through" : "",
                  cursor: "pointer",
                }}
                className="todo-task"
                onClick={() => completeHandler(index)}
              >
                {itmlist?.taskinput} - {itmlist?.timeofday}
              </div>
              <div>
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "#A7727D", cursor: "pointer" }}
                  onClick={() => editHandler(itmlist, index)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  style={{ color: "#A7727D", cursor: "pointer" }}
                  onClick={() => deleteHandler(index)}
                ></i>
                {/* <i
                  className="fa-solid fa-square-check"
                  style={{ color: "#A7727D", cursor: "pointer" }}
                  onClick={() => completeHandler(index)}
                ></i> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
