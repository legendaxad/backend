import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

function App() {
  const [toDo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const addAndEditTodo = async () => {
    try {
      if (!id) {
        const { data } = await axios.post("http://localhost:8080/todo/add", {
          title,
        });
        if (data.success) {
          getallTodo();
          setTitle(" ");
          toast.success(data.msg);
        }
      } else {
        const { data } = await axios.put(
          "http://localhost:8080/todo/edit/" + id,
          {
            title,
          }
        );
        if (data.success) {
          getallTodo();
          setTitle(" ");
          setId("");
          toast.success(data.msg);
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const getallTodo = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/todo/get-all");
      // console.log(data);
      if (data.success) {
        setTodo(data.todo);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const DeleteTodo = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/todo/delete/" + id
      );
      if (data.success) {
        getallTodo();
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const editTodo = async () => {};
  useEffect(() => {
    getallTodo();
  }, []);
  return (
    <div style={{ margin: "50px" }}>
      <h1>Todo List</h1>
      <hr />
      <div>
        <input
          type="text"
          placeholder="add item"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>
      <br />
      <button onClick={addAndEditTodo}>{id ? "Edit" : "Add"}</button>

      <div>
        {toDo.map((value) => (
          <p key={value.id}>
            {value.title}{" "}
            <button
              onClick={() => DeleteTodo(value.id)}
              style={{ height: "20px" }}
            >
              Delete
            </button>
            <button
              style={{ height: "20px" }}
              onClick={() => {
                setTitle(value.title);
                setId(value.id);
              }}
            >
              Edit
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
