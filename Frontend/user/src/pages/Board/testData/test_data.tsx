export const lists = [
  {
    id: 'list1',
    name: 'To do',
    board_id: 1,
    order: 1,
    data: [
      {
        id: 'task1',
        list_id: 'list1',
        order: 1,
        name: 'Task 1',
        list_name: 'To do',
        watcher_email: ['email1', 'email21231231232132']
      },
      { id: 'task2', list_id: 'list1', order: 2, name: 'Task 2', list_name: 'todo', watcher_email: [] },
      { id: 'task5', list_id: 'list1', order: 2, name: 'Task 5', list_name: 'todo', watcher_email: [] },
      { id: 'task6', list_id: 'list1', order: 2, name: 'Task 6', list_name: 'todo', watcher_email: [] },
      { id: 'task7', list_id: 'list1', order: 2, name: 'Task 7', list_name: 'todo', watcher_email: [] },
      { id: 'task8', list_id: 'list1', order: 2, name: 'Task 8', list_name: 'todo', watcher_email: [] }
    ]
  },
  {
    id: 'list2',
    name: 'Doing',
    board_id: 1,
    order: 2,
    data: [{ id: 'task3', list_id: 'list2', order: 1, name: 'Task 3', list_name: 'Doing', watcher_email: [] }]
  },
  {
    id: 'list3',
    name: 'Done',
    board_id: 1,
    order: 3,
    data: []
  }
]

export const cards = [
  { id: 'task1', list_id: 'list1', order: 1, name: 'Task 1', list_name: 'todo' },
  { id: 'task2', list_id: 'list1', order: 2, name: 'Task 2', list_name: 'todo' },
  { id: 'task3', list_id: 'list2', order: 1, name: 'Task 3', list_name: 'doing' },
  { id: 'task4', list_id: 'list3', order: 1, name: 'Task 4', list_name: 'done' }
]
