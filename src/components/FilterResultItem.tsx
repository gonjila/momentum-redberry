import Icon from "./icons";

type IProps = {
  title: string;
  onClear: () => void;
};

function FilterResultItem({ title, onClear }: IProps) {
  return (
    <button
      onClick={onClear}
      className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1.5"
    >
      <span>{title}</span>

      <Icon iconName="close" width={14} height={14} />
    </button>
  );
}

export default FilterResultItem;
