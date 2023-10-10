import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function CreateTask() {
  const {token, fetchTasks, tasks, categories, fetchCategories} = useOutletContext();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectCategory, setSelectCategory] = useState("")

  const navigate= useNavigate();

  async function handleSubmit(e){
    setError("");
    e.preventDefault();
    console.log(title, description, selectCategory)

    const res = await fetch(`${API}/tasks`,{
      method:"POST", 
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title, 
        description,
        categoryId : selectCategory,
      })
    });
    const info = await res.json();

    if(!info.success) {
      return setError(info.error)
    }
    setDescription("");
    setTitle("");
    fetchTasks();
    fetchCategories();
    navigate("/");
  }


  return !token ? (
    <h2>Please login to create a task.</h2>
  ) : (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="selectCategory"> Select Category</label>
          <select className="" onChange={(e) => setSelectCategory(e.target.value)} value={selectCategory}>
          <option value="">Select a Category</option>
          {categories.map((_category) => (
            <option key={_category.id} value={_category.id}>
              {_category.name}
            </option>
          ))}
          </select>
        </div>
        <div>
          <input className="" type="description" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="enter task" />
        </div>
        <div className="">
         <textarea   className="" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description"/>
        </div>
        <div>
          <button className="" onChange={(e) => setCategory(e.target.value)} value={(selectCategory)}>Create Task</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
