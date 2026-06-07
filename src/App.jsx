
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) {
      alert("Please fill all fields");
      return;
    }

    const copyTask = [...task];

    copyTask.push({
      id: Date.now(),
      title,
      details,
      createdAt: new Date().toLocaleString(),
    });

    setTask(copyTask);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (id) => {
    setTask(task.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen lg:flex bg-black text-white">
      {/* Left Side Form */}
      <form
        onSubmit={submitHandler}
        className="flex gap-4 lg:w-1/2 p-8 flex-col items-start"
      >
        <h1 className="text-4xl font-bold mb-4">
          ✨ Add Notes
        </h1>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter Note Title..."
          className="
          w-full
          px-4
          py-3
          rounded-lg
          border
          border-gray-600
          bg-zinc-900
          outline-none
          focus:border-yellow-400
          focus:ring-2
          focus:ring-yellow-400
          transition
        "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Details Input */}
        <textarea
          placeholder="Write Details Here..."
          className="
          w-full
          h-40
          px-4
          py-3
          rounded-lg
          border
          border-gray-600
          bg-zinc-900
          resize-none
          outline-none
          focus:border-yellow-400
          focus:ring-2
          focus:ring-yellow-400
          transition
        "
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* Character Counter */}
        <p className="text-sm text-gray-400">
          Characters: {details.length}
        </p>

        {/* Button */}
        <button
          className="
          w-full
          bg-yellow-400
          text-black
          font-semibold
          py-3
          rounded-lg
          hover:bg-yellow-300
          transition
          active:scale-95
        "
        >
          Add Note
        </button>
      </form>

      {/* Right Side Notes */}
      <div className="lg:w-1/2 lg:border-l border-gray-700 p-8">
        <h1 className="text-4xl font-bold mb-6">
          📝 Recent Notes
        </h1>

        {task.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
            <h2 className="text-2xl font-bold">
              No Notes Yet
            </h2>
            <p>Create your first note.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[80vh] overflow-auto pr-2">
            {task.map((elem) => {
              return (
                <div
                  key={elem.id}
                  className="
                  relative
                  h-60
                  w-44
                  mx-auto
                  rounded-xl
                  p-4
                  shadow-lg
                  hover:scale-105
                  hover:rotate-1
                  transition-all
                  duration-300
                  bg-cover
                  bg-center
                  text-black
                "
                  style={{
                    backgroundImage:
                      "url('https://tse1.mm.bing.net/th/id/OIP.vsk0MOzvsiO2RTigromNUgHaHH?rs=1&pid=ImgDetMain&o=7&rm=3')",
                  }}
                >
                  {/* Note Content */}
                  <div>
                    <h3 className="font-bold text-lg break-words">
                      {elem.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-700 break-words overflow-hidden">
                      {elem.details}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[10px] text-gray-600 mb-2">
                      {elem.createdAt}
                    </p>

                    <button
                      onClick={() => deleteNote(elem.id)}
                      className="
                      w-full
                      bg-red-500
                      text-white
                      text-xs
                      py-1
                      rounded
                      hover:bg-red-600
                      transition
                    "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
          <h2 className="font-bold text-lg mb-2">
            📊 Statistics
          </h2>

          <p>Total Notes: {task.length}</p>

          <p>
            Total Characters:{" "}
            {task.reduce(
              (acc, note) => acc + note.details.length,
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;