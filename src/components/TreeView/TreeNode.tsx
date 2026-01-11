"use client"

import type React from "react"
import type { TreeItem } from "./treeData"
import "./TreeNode.scss"

interface TreeNodeProps {
  node: TreeItem
  isExpanded: boolean
  isNodeExpanded: (id: string) => boolean
  onToggle: (id: string) => void
  onAdd: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, name: string) => void
  onDragStart: (id: string) => void
  onDragEnd: () => void
  onDrop: (targetId: string) => void
  draggedNodeId: string | null
  level: number
}

export default function TreeNode({
  node,
  isExpanded,
  isNodeExpanded,
  onToggle,
  onAdd,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnd,
  onDrop,
  draggedNodeId,
  level,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0

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
    if (draggedNodeId && draggedNodeId !== node.id) {
      onDrop(node.id)
    }
  }

  return (
    <div
      className={`tree-node ${draggedNodeId === node.id ? "dragging" : ""}`}
      style={{ paddingLeft: `${level * 20}px` }}
      draggable
      onDragStart={() => onDragStart(node.id)}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="node-content">
        {hasChildren && (
          <button
            className={`expand-btn ${isExpanded ? "expanded" : ""}`}
            onClick={() => onToggle(node.id)}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            ▶
          </button>
        )}
        {!hasChildren && <div className="expand-placeholder" />}

        <div className="node-label">
          <span className="node-circle" />
          <span className="node-name">{node.name}</span>
        </div>

        <div className="node-actions">
          <button
            className="action-btn add-btn"
            onClick={() => onAdd(node.id)}
            title="Add child node"
          >
            +
          </button>
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(node.id, node.name)}
            title="Edit node name"
          >
            ✎
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(node.id)}
            title="Delete node"
          >
            🗑
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="children-container">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              isExpanded={isNodeExpanded(child.id)}
              isNodeExpanded={isNodeExpanded}
              onToggle={onToggle}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDrop={onDrop}
              draggedNodeId={draggedNodeId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
