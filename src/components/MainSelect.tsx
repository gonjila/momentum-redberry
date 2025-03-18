"use client";

import Image from "next/image";
import Select, { components, SingleValueProps, OptionProps, MenuListProps } from "react-select";
import { useController, Control } from "react-hook-form";

import Icon from "./icons";

type OptionType = {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
};

interface IProps {
  name: string;
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  options: OptionType[];
  defaultValue?: OptionType;
  onMenuHeaderClick?: () => void;
}

const MainSelect = ({
  name,
  control,
  label,
  isRequired,
  placeholder,
  options,
  defaultValue,
  onMenuHeaderClick,
}: IProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: defaultValue?.id });

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label} {isRequired && "*"}
        </label>
      )}

      <Select
        id={name}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id.toString()}
        value={options.find(option => option.id === value)}
        onChange={newValue => onChange((newValue as OptionType)?.id)}
        isSearchable={false}
        components={{
          SingleValue: CustomSingleValue,
          Option: CustomOption,
          MenuList: props => CustomMenuList(props, onMenuHeaderClick),
        }}
        styles={{
          control: (styles, state) => ({
            ...styles,

            borderColor: error ? "red" : state.menuIsOpen ? "#cccfd3" : "#dee2e6",
            boxShadow: "none",
            "&:hover": {},
          }),
          valueContainer: styles => ({ ...styles, padding: 0, display: "flex" }),
          placeholder: styles => ({ ...styles, padding: "12px" }),
          indicatorSeparator: () => ({ display: "none" }),
        }}
      />
    </div>
  );
};

export default MainSelect;

// Custom selected item (Single Value)
const CustomSingleValue = ({ data }: SingleValueProps<OptionType>) => {
  return (
    <div
      className="flex flex-1 items-center gap-2"
      style={{ padding: data.avatar ? "8px 12px" : "12px" }}
    >
      {data.avatar && (
        <Image
          src={data.avatar}
          alt={data.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
      )}
      <span>{data.name}</span>
    </div>
  );
};

// Custom dropdown option
const CustomOption = (props: OptionProps<OptionType>) => {
  const { data, innerRef, innerProps, isSelected } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${isSelected ? "bg-gray-300 text-black" : "text-gray-600"}`}
    >
      {data.avatar && (
        <Image
          src={data.avatar}
          alt={data.name}
          width={26}
          height={26}
          className="h-6 w-6 rounded-full"
        />
      )}
      <span>{data.name}</span>
    </div>
  );
};

// Custom dropdown menu with "Add Employee" button
const CustomMenuList = (props: MenuListProps<OptionType>, onClick?: () => void) => {
  return (
    <div>
      {onClick && (
        <div
          className="text-main hover:bg-main-100 flex cursor-pointer items-center gap-2 border-b p-4 font-medium transition-all duration-500 hover:text-white"
          onClick={onClick}
        >
          <Icon iconName="add" />
          <span>დაამატე თანამშრომელი</span>
        </div>
      )}
      <components.MenuList {...props} />
    </div>
  );
};
