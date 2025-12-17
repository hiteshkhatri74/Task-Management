import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Pencil, Trash2, Plus } from "lucide-react";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } 
    catch {
      toast.error("Failed to load profile");
    }
  };

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/tasks`,
        { withCredentials: true }
      );
      setTasks(res.data.data);
    } 
    catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  /* ---------------- CREATE / UPDATE TASK ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${editId}`,
          { title, description },
          { withCredentials: true }
        );
        toast.success("Task updated");
      } 
      else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks`,
          { title, description },
          { withCredentials: true }
        );
        toast.success("Task created");
      }

      setTitle("");
      setDescription("");
      setEditId(null);
      fetchTasks();
    } 
    catch {
      toast.error("Task operation failed");
    }
  };

  /* ---------------- DELETE TASK ---------------- */
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`,
        { withCredentials: true }
      );
      toast.success("Task deleted");
      fetchTasks();
    }
    catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- EDIT TASK ---------------- */
  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task._id);
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-center" />

      {/* Header */}
      <div className="bg-white p-4 rounded shadow mb-6 flex items-cenetr gap-4">

        {/* Profile Image */}
        <img
          src={ user?.profilePic || "https://i.pravatar.cc/150?img=12"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />

        {/* User Info */}
        <div>
            <h1 className="text-2xl font-bold text-blue-600"> Welcome, {user?.name} </h1>
            <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Add Task */}
        <div className="bg-white p-4 rounded shadow self-start">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus size={18} /> {editId ? "Edit Task" : "Add Task"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full px-3 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Task Description"
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow max-h-[70vh] overflow-y-auto">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Tasks</h2>
            <input
              type="text"
              placeholder="Search tasks..."
              className="border px-3 py-1 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks found</p>
            ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="border p-3 rounded flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editTask(task)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;