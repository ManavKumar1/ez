"use client"

import type React from "react"

import Card from "./Card"
import type { ColumnType } from "./kanbanData"
import type { Card as CardType } from "./KanbanBoard"
import "./Column.scss"

interface ColumnProps {
  columnId: ColumnType
  title: string
  color: string
  cards: CardType[]
  onAddCard: () => void
  onDeleteCard: (cardId: string) => void
  onEditCard: (cardId: string, currentTitle: string) => void
  onMoveCard: (cardId: string, newColumnId: ColumnType) => void
  draggedCard: CardType | null
  onDragStart: (card: CardType) => void
  onDragEnd: () => void
}

export default function Column({
  columnId,
  title,
  color,
  cards,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onMoveCard,
  draggedCard,
  onDragStart,
  onDragEnd,
}: ColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("drag-over")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("drag-over")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("drag-over")
    if (draggedCard) {
      onMoveCard(draggedCard.id, columnId)
      onDragEnd()
    }
  }

  const editCard = (cardId: string, currentTitle: string) => {
    onEditCard(cardId, currentTitle)
  }

  return (
    <div className="column" style={{ borderTopColor: color }}>
      <div className="column-header" style={{ backgroundColor: color }}>
        <h3>{title}</h3>
        <div className="header-actions">
          <span className="card-count">{cards.length}</span>
          <button className="add-column-btn" onClick={onAddCard} title="Add card">
            +
          </button>
        </div>
      </div>

      <div
        className={`cards-container ${draggedCard ? "drop-active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {cards.length === 0 && <div className="empty-state">Drop cards here</div>}

        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => onDeleteCard(card.id)}
            onEdit={() => editCard(card.id, card.title)}
            onDragStart={() => onDragStart(card)}
            onDragEnd={onDragEnd}
            isDragging={draggedCard?.id === card.id}
            borderColor={color}
          />
        ))}
      </div>
    </div>
  )
}
