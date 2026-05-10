import TaskItem from './TaskItem'

export default function TaskList({ tasks, emptyText = 'No tasks yet' }) {
  if (!tasks?.length) {
    return (
      <div className="flex flex-col items-center py-16 text-gray-400">
        <span className="text-5xl mb-3">📭</span>
        <p className="font-semibold">{emptyText}</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2.5">
      {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}
