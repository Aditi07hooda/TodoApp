import React from "react";

const CreateTodo = (props) => {
  return (
    <div className="border-2 border-white p-3 mx-16 my-16 w-fit">
      <input
        type="text"
        placeholder="Enter title"
        className="py-1 px-3"
        value={props.inputTitle}
        onChange={(e) => {
          props.setinputTitle(e.target.value);
        }}
        required
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter description"
        className="py-1 px-3"
        value={props.inputDescription}
        onChange={(e) => props.setinputDescription(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={props.addTodoItem}
        className="border-2 rounded-xl border-white text-white py-1 px-3 hover:bg-white hover:text-black"
      >
        Add Item
      </button>
    </div>
  );
};

export default CreateTodo;
