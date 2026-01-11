"use client"

import { useState } from "react"
import TreeNode from "./TreeNode"
import { type TreeItem, mockTreeData } from "./treeData"
import "./TreeView.scss"

export default function TreeView() {
  const [treeData, setTreeData] = useState<TreeItem[]>(mockTreeData)
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(
    new Set(["1", "2"])
  )
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null)

  const isNodeExpanded = (id: string) => expandedNodeIds.has(id)

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodeIds)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodeIds(newExpanded)
  }

  // ✅ Add ROOT node
  const addRootNode = () => {
    const nodeName = prompt("Enter root node name:")
    if (!nodeName) return

    const newNode: TreeItem = {
      id: Date.now().toString(),
      name: nodeName,
      children: [],
    }

    setTreeData([...treeData, newNode])
  }

  const addNode = (parentId: string) => {
    const nodeName = prompt("Enter node name:")
    if (!nodeName) return

    const addNodeRecursive = (nodes: TreeItem[]): TreeItem[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now().toString(),
                name: nodeName,
                children: [],
              },
            ],
          }
        }
        if (node.children) {
          return { ...node, children: addNodeRecursive(node.children) }
        }
        return node
      })
    }

    setTreeData(addNodeRecursive(treeData))
    setExpandedNodeIds((prev) => new Set([...prev, parentId]))
  }

  const deleteNode = (nodeId: string) => {
    if (!confirm("Delete this node and all its children?")) return

    const deleteNodeRecursive = (nodes: TreeItem[]): TreeItem[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteNodeRecursive(node.children) : [],
        }))
    }

    setTreeData(deleteNodeRecursive(treeData))
  }

  const editNodeName = (nodeId: string, currentName: string) => {
    const newName = prompt("Edit node name:", currentName)
    if (!newName || newName === currentName) return

    const editNodeRecursive = (nodes: TreeItem[]): TreeItem[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, name: newName }
        }
        if (node.children) {
          return { ...node, children: editNodeRecursive(node.children) }
        }
        return node
      })
    }

    setTreeData(editNodeRecursive(treeData))
  }

  const moveNode = (nodeId: string, targetParentId: string) => {
    let movedNode: TreeItem | null = null

    const extractNode = (nodes: TreeItem[]): TreeItem[] => {
      return nodes
        .filter((node) => {
          if (node.id === nodeId) {
            movedNode = node
            return false
          }
          return true
        })
        .map((node) => ({
          ...node,
          children: node.children ? extractNode(node.children) : [],
        }))
    }

    let updatedData = extractNode(treeData)

    if (movedNode) {
      const insertNode = (nodes: TreeItem[]): TreeItem[] => {
        return nodes.map((node) => {
          if (node.id === targetParentId) {
            return {
              ...node,
              children: [...(node.children || []), movedNode!],
            }
          }
          if (node.children) {
            return { ...node, children: insertNode(node.children) }
          }
          return node
        })
      }

      updatedData = insertNode(updatedData)
      setTreeData(updatedData)

      // ✅ Auto-expand drop target
      setExpandedNodeIds((prev) => new Set([...prev, targetParentId]))
    }
  }

  return (
    <div className="tree-view">
      <h2>Project Structure</h2>

      {/* ✅ Add Root Button */}
      <button className="add-root-btn" onClick={addRootNode}>
        + Add Project
      </button>

      <div className="tree-container">
        {treeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            isExpanded={isNodeExpanded(node.id)}
            isNodeExpanded={isNodeExpanded}
            onToggle={toggleNode}
            onAdd={addNode}
            onDelete={deleteNode}
            onEdit={editNodeName}
            onDragStart={(id) => setDraggedNodeId(id)}
            onDragEnd={() => setDraggedNodeId(null)}
            onDrop={(targetId) =>
              draggedNodeId && moveNode(draggedNodeId, targetId)
            }
            draggedNodeId={draggedNodeId}
            level={0}
          />
        ))}
      </div>
    </div>
  )
}
