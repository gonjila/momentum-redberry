"use client";

import Image from "next/image";
import Select, {
  components,
  SingleValueProps,
  OptionProps,
  MenuListProps,
  MenuPlacement,
} from "react-select";
import { useController, Control } from "react-hook-form";
import { useRef } from "react";

import Icon from "./icons";

type OptionType = {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
  icon?: string;
};

interface IProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  options: OptionType[];
  isDisabled?: boolean;
  defaultValue?: OptionType;
  menuPlacement?: MenuPlacement;
  onMenuHeaderClick?: () => void;
}

const MainSelect = ({
  name,
  control,
  label,
  isRequired,
  placeholder,
  options,
  isDisabled = false,
  defaultValue,
  menuPlacement = "auto",
  onMenuHeaderClick,
}: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: defaultValue?.id });

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          onClick={() => selectRef.current?.focus()}
          className="font-medium text-gray-700"
        >
          {label} {isRequired && "*"}
        </label>
      )}

      <Select
        id={name}
        ref={selectRef}
        openMenuOnFocus
        isDisabled={isDisabled}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id.toString()}
        value={options.find(option => option.id === value) || null}
        onChange={newValue => onChange((newValue as OptionType)?.id)}
        isSearchable={false}
        menuPlacement={menuPlacement}
        components={{
          SingleValue: CustomSingleValue,
          Option: CustomOption,
          MenuList: props => CustomMenuList(props, onMenuHeaderClick),
        }}
        styles={{
          control: (styles, state) => ({
            ...styles,

            borderColor: error || value < 0 ? "red" : state.menuIsOpen ? "#cccfd3" : "#dee2e6",
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
  const name = data.surname ? `${data.name} ${data.surname}` : data.name;
  const image = data.avatar || data.icon;

  return (
    <div className="flex flex-1 items-center gap-2" style={{ padding: image ? "8px 12px" : "12px" }}>
      {image && (
        <Image src={image} alt={data.name} width={32} height={32} className="h-8 w-8 rounded-full" />
      )}
      <span>{name}</span>
    </div>
  );
};

// Custom dropdown option
const CustomOption = (props: OptionProps<OptionType>) => {
  const { data, innerRef, innerProps, isSelected } = props;
  const name = data.surname ? `${data.name} ${data.surname}` : data.name;
  const image = data.avatar || data.icon;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${isSelected ? "bg-gray-300 text-black" : "text-gray-600"}`}
    >
      {image && (
        <Image src={image} alt={data.name} width={26} height={26} className="h-6 w-6 rounded-full" />
      )}
      <span>{name}</span>
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
