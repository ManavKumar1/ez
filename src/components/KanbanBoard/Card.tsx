"use client"

import type { Card as CardType } from "./KanbanBoard"
import "./Card.scss"

interface CardProps {
  card: CardType
  onDelete: () => void
  onEdit: () => void
  onDragStart: () => void
  onDragEnd: () => void
  isDragging: boolean
  borderColor: string
}

export default function Card({ card, onDelete, onEdit, onDragStart, onDragEnd, isDragging, borderColor }: CardProps) {
  return (
    <div
      className={`card ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{ borderLeftColor: borderColor }}
    >
      <div className="card-header">
        <p className="card-title">{card.title}</p>
        <div className="card-actions">
          <button className="card-action-btn edit-btn" onClick={onEdit} title="Edit card">
            ✎
          </button>
          <button className="card-action-btn delete-btn" onClick={onDelete} title="Delete card">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
