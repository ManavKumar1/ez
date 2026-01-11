"use client"

import { useState } from "react"
import TreeView from "./components/TreeView/TreeView"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"
import "./App.scss"

type ViewMode = "tree" | "kanban"

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban")

  return (
    <div className="app">
      <header className="app-header">
        <h1>Project Management Tools</h1>
        <nav className="view-switcher">
          <button className={`switch-btn ${viewMode === "tree" ? "active" : ""}`} onClick={() => setViewMode("tree")}>
            Tree View
          </button>
          <button
            className={`switch-btn ${viewMode === "kanban" ? "active" : ""}`}
            onClick={() => setViewMode("kanban")}
          >
            Kanban Board
          </button>
        </nav>
      </header>

      <main className="app-content">
        {viewMode === "tree" && <TreeView />}
        {viewMode === "kanban" && <KanbanBoard />}
      </main>
    </div>
  )
}
