interface IProps {
  color: string;
  title: string;
}

function TasksListTitle({ color, title }: IProps) {
  return (
    <div
      className="rounded-xl py-4 text-center text-xl font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {title}
    </div>
  );
}

export default TasksListTitle;
