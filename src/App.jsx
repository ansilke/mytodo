
import { useState } from "react";
import {
  ShaderGradient,
  ShaderGradientCanvas,
} from "@shadergradient/react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [index, setindex] = useState(null);
  const [showmodal, setshowmodal] = useState(false);
  const [edit, setedit] = useState("");

  const handleClick = () => {
    if (!task.trim()) return;

    setTodo((prev) => [...prev, task.trim()]);
    setTask("");
  };

  const handleDelete = (index) => {
    setTodo((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setindex(index);
    setedit(todo[index]);
    setshowmodal(true);
  };

  const handleCancel = () => {
    setshowmodal(false);
    setedit("");
    setindex(null);
  };

  const save = () => {
    if (!edit.trim() || index === null) return;

    setTodo((prev) =>
      prev.map((item, i) => (i === index ? edit.trim() : item))
    );

    handleCancel();
  };

  return (
    <main className="app-page">
      {/* Black, white and grey animated background */}
      <div className="shader-background" aria-hidden="true">
        <ShaderGradientCanvas
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#000000"
            color2="#2a2a2a"
            color3="#898989"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="waterPlane"
            uAmplitude={1}
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.4}
            uStrength={4}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Main TODO Card */}
      <section className="container">
        <div className="app-label">
          <span className="status-dot" />
          PERSONAL ORGANIZER
        </div>

        <h1 className="heading">My TODO App</h1>

        <p className="subtitle">
          Plan your day. One task at a time.
        </p>

        <form
          className="input-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input"
            placeholder="Write your task here..."
            aria-label="Write your task"
          />

          <button type="submit" className="add-button">
            <span className="plus-icon">+</span>
            Add
          </button>
        </form>

        <div className="task-section">
          <div className="list-header">
            <h2 className="list-heading">Your Tasks</h2>

            <span className="task-count">
              {todo.length} {todo.length === 1 ? "TASK" : "TASKS"}
            </span>
          </div>

          {todo.length === 0 ? (
            <div className="empty-message">
              <div className="empty-icon">✓</div>
              <p>No tasks yet</p>
              <span>Your next accomplishment starts here.</span>
            </div>
          ) : (
            <div className="task-list">
              {todo.map((item, index) => (
                <div className="task-item" key={index}>
                  <span className="task-marker" />

                  <span className="task-text">{item}</span>

                  <div className="task-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(index)}
                      aria-label={`Edit task ${index + 1}`}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(index)}
                      aria-label={`Delete task ${index + 1}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="card-footer">
          <span>STAY FOCUSED.</span>
          <span>KEEP MOVING.</span>
        </footer>
      </section>

      {/* Edit Task Modal */}
      {showmodal && (
        <div className="modal" onClick={handleCancel}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-label">UPDATE YOUR PLAN</span>

            <h2 className="modal-heading">Edit Task</h2>

            <input
              value={edit}
              onChange={(e) => setedit(e.target.value)}
              className="input"
              placeholder="Edit your task..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }

                if (e.key === "Escape") handleCancel();
              }}
            />

            <div className="modal-buttons">
              <button onClick={save} className="save-button">
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
