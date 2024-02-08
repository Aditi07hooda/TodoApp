import React, { useState, useEffect } from "react";
import Todo from "../Components/Todo.jsx";
import CreateTodo from "../Components/CreateTodo.jsx";

const Todolist = () => {
  const [inputTitle, setinputTitle] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [todolist, settodolist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token"); // Get the user token
        console.log(token)
        const response = await fetch("http://localhost:5000/todo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        settodolist(json.todoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const creatingTask = () => {
    const createData = async () => {
      try {
        const token = getCookie("token"); // Get the user token
        await fetch("http://localhost:5000/todo", {
          method: "POST",
          body: JSON.stringify({
            title: inputTitle,
            description: inputDescription,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${your_token}`,
          },
        });
        alert("Task Created");

        const response = await fetch("http://localhost:5000/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedJson = await response.json();
        settodolist(updatedJson.todoList);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    createData();
    setinputTitle("");
    setinputDescription("");
  };

  const deleteTask = async (todoItem) => {
    try {
      const token = getCookie("token"); // Get the user token
      await fetch("http://localhost:5000/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: todoItem._id }),
      });
      alert("Task deleted");
      // Fetch updated data after deletion
      const response = await fetch("http://localhost:5000/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedJson = await response.json();
      settodolist(updatedJson.todoList);
    } catch (error) {
      console.error("Error:", error);

    }
  };

  const completed = async (todoItem) => {
    try {
      const token = getCookie("token"); // Get the user token
      await fetch("http://localhost:5000/todo/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: todoItem._id }),
      });
      // Fetch updated data after deletion
      const response = await fetch("http://localhost:5000/todo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedJson = await response.json();
      settodolist(updatedJson.todoList);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to get the value of a specific cookie by name
  const getCookie = (token) => {
    const cookies = document.cookie.split("=");
    console.log(cookies)
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === token) {
        return cookieValue;
      }
    }
    return null;
  };

  return (
    <>
      <CreateTodo
        inputTitle={inputTitle}
        inputDescription={inputDescription}
        addTodoItem={creatingTask}
        setinputTitle={setinputTitle}
        setinputDescription={setinputDescription}
      />

      <div className="flex px-16 text-white">
        {todolist.map((todoItem) => (
          <Todo
            key={todoItem.id}
            title={todoItem.title}
            description={todoItem.description}
            initialCompletionStatus={todoItem.completionStatus}
            completedTodoItem={() => completed(todoItem)}
            deleteTodoItem={() => deleteTask(todoItem)}
          />
        ))}
      </div>
    </>
  );
};

export default Todolist;
