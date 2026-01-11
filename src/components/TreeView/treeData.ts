export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
}

export const mockTreeData: TreeItem[] = [
  {
    id: "1",
    name: "Project A",
    children: [
      {
        id: "1-1",
        name: "Frontend",
        children: [
          { id: "1-1-1", name: "Components", children: [] },
          { id: "1-1-2", name: "Pages", children: [] },
          { id: "1-1-3", name: "Styles", children: [] },
        ],
      },
      {
        id: "1-2",
        name: "Backend",
        children: [
          { id: "1-2-1", name: "API", children: [] },
          { id: "1-2-2", name: "Database", children: [] },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Project B",
    children: [
      { id: "2-1", name: "Documentation", children: [] },
      { id: "2-2", name: "Tests", children: [] },
    ],
  },
  {
    id: "3",
    name: "Project C",
    children: [],
  },
]
