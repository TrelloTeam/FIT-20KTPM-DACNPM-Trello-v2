export const lists = [
  {
    id: 'list1',
    name: 'todo',
    board_id: 1,
    order: 1,
    data: [
      { id: 'task1', list_id: 'list1', order: 1, name: 'Task 1', list_name: 'todo' },
      { id: 'task2', list_id: 'list1', order: 2, name: 'Task 2', list_name: 'todo' }
    ]
  },
  {
    id: 'list2',
    name: 'doing',
    board_id: 1,
    order: 2,
    data: [{ id: 'task3', list_id: 'list2', order: 1, name: 'Task 3', list_name: 'doing' }]
  },
  {
    id: 'list3',
    name: 'done',
    board_id: 1,
    order: 3,
    data: [{ id: 'task4', list_id: 'list3', order: 1, name: 'Task 4', list_name: 'done' }]
  }
]

export const cards = [
  { id: 'task1', list_id: 'list1', order: 1, name: 'Task 1', list_name: 'todo' },
  { id: 'task2', list_id: 'list1', order: 2, name: 'Task 2', list_name: 'todo' },
  { id: 'task3', list_id: 'list2', order: 1, name: 'Task 3', list_name: 'doing' },
  { id: 'task4', list_id: 'list3', order: 1, name: 'Task 4', list_name: 'done' }
]
