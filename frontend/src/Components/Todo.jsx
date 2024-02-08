import React, { useState } from "react";

const Todo = (props) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [completion, setcompletion] = useState(props.initialCompletionStatus);
  const taskCompletion = () => {
    setcompletion(!completion);
    if (props.completedTodoItem) {
      props.completedTodoItem();
    }
  };
  return (
    <div>
      <div className="border border-white text-white p-5 m-2">
        <h3 className="my-1 font-semibold text-xl">
          {capitalizeFirstLetter(props.title)}
        </h3>
        <h5 className="my-1 font-medium text-lg pl-2">{props.description}</h5>
        <button
          className="border-2 rounded-xl border-white text-white py-1 px-3 hover:bg-white hover:text-black mt-5"
          onClick={props.deleteTodoItem}
        >
          Delete
        </button>
        <button
          className="border-2 rounded-xl border-white text-white py-1 px-3 hover:bg-white hover:text-black mt-5 ml-2"
          onClick={taskCompletion}
        >
          {completion ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
