import type { Card } from "./KanbanBoard"

export type ColumnType = "todo" | "inProgress" | "done"

export const initialCards: Card[] = [
  { id: "1", title: "Create initial project plan", columnId: "todo" },
  { id: "2", title: "Design landing page", columnId: "todo" },
  { id: "3", title: "Review codebase structure", columnId: "todo" },
  { id: "4", title: "Implement authentication", columnId: "inProgress" },
  { id: "5", title: "Set up database schema", columnId: "inProgress" },
  { id: "6", title: "Fix navbar bugs", columnId: "inProgress" },
  { id: "7", title: "Organize project repository", columnId: "done" },
  { id: "8", title: "Write API documentation", columnId: "done" },
]
