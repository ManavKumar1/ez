"use client"

import { useState } from "react"
import Column from "./Column"
import { initialCards, type ColumnType } from "./kanbanData"
import "./KanbanBoard.scss"

export interface Card {
  id: string
  title: string
  columnId: ColumnType
}

export default function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [draggedCard, setDraggedCard] = useState<Card | null>(null)

  const columns: ColumnType[] = ["todo", "inProgress", "done"]
  const columnTitles = {
    todo: "Todo",
    inProgress: "In Progress",
    done: "Done",
  }
  const columnColors = {
    todo: "#0066ff",
    inProgress: "#ff9500",
    done: "#1ec864",
  }

  const getColumnCards = (columnId: ColumnType) => cards.filter((card) => card.columnId === columnId)

  const addCard = (columnId: ColumnType) => {
    const title = prompt("Enter card title:")
    if (!title) return

    const newCard: Card = {
      id: Date.now().toString(),
      title,
      columnId,
    }

    setCards([...cards, newCard])
  }

  const deleteCard = (cardId: string) => {
    if (!confirm("Delete this card?")) return
    setCards(cards.filter((card) => card.id !== cardId))
  }

  const editCard = (cardId: string, currentTitle: string) => {
    const newTitle = prompt("Edit card title:", currentTitle)
    if (!newTitle || newTitle === currentTitle) return

    setCards(cards.map((card) => (card.id === cardId ? { ...card, title: newTitle } : card)))
  }

  const moveCard = (cardId: string, newColumnId: ColumnType) => {
    setCards(cards.map((card) => (card.id === cardId ? { ...card, columnId: newColumnId } : card)))
  }

  return (
    <div className="kanban-board">
      <h2>Project Kanban Board</h2>
      <div className="columns-container">
        {columns.map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={columnTitles[columnId]}
            color={columnColors[columnId]}
            cards={getColumnCards(columnId)}
            onAddCard={() => addCard(columnId)}
            onDeleteCard={deleteCard}
            onEditCard={editCard}
            onMoveCard={moveCard}
            draggedCard={draggedCard}
            onDragStart={setDraggedCard}
            onDragEnd={() => setDraggedCard(null)}
          />
        ))}
      </div>
    </div>
  )
}
