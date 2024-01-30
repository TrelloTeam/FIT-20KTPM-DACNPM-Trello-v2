export const lists = [
  {
    id: 1,
    name: 'todo',
    board_id: 1,
    order: 1,
    data: [
      { id: 1, list_id: 1, order: 1, name: 'Task 1', list_name: 'todo' },
      { id: 2, list_id: 1, order: 2, name: 'Task 2', list_name: 'todo' }
    ]
  },
  {
    id: 2,
    name: 'doing',
    board_id: 1,
    order: 2,
    data: [{ id: 3, list_id: 2, order: 1, name: 'Task 3', list_name: 'doing' }]
  },
  {
    id: 3,
    name: 'done',
    board_id: 1,
    order: 3,
    data: [{ id: 4, list_id: 3, order: 1, name: 'Task 4', list_name: 'done' }]
  }
]
export const cards = [
  { id: 1, list_id: 1, order: 1, name: 'Task 1', list_name: 'todo' },
  { id: 2, list_id: 1, order: 2, name: 'Task 2', list_name: 'todo' },
  { id: 3, list_id: 2, order: 1, name: 'Task 3', list_name: 'doing' },
  { id: 4, list_id: 3, order: 1, name: 'Task 4', list_name: 'done' }
]
