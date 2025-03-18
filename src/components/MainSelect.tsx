"use client";

import Image from "next/image";
import Select, { components, SingleValueProps, OptionProps, MenuListProps } from "react-select";
import { Placeholder } from "react-select/animated";

interface OptionType {
  value: string;
  label: string;
  avatar?: string;
}

interface MainSelectProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
}

const options: OptionType[] = [
  {
    value: "user1",
    label: "თამარ კაკაბაძე",
    avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    value: "user2",
    label: "თამარ კაკაბაძე",
    // avatar:
    //   "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    value: "user3",
    label: "თამარ კაკაბაძე",
    // avatar:
    //   "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    value: "user4",
    label: "თამარ კაკაბაძე",
    avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
];

const MainSelect = ({ name, label, isRequired, placeholder }: MainSelectProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label} {isRequired && "*"}
        </label>
      )}

      <Select
        id={name}
        options={options}
        placeholder={placeholder}
        isSearchable={false}
        components={{
          SingleValue: CustomSingleValue,
          Option: CustomOption,
          MenuList: CustomMenuList,
        }}
        styles={{
          indicatorSeparator: () => ({ displey: "none" }),
          control: styles => ({ ...styles, padding: "12px" }),
          input: styles => ({ ...styles, backgroundColor: "red" }),
          singleValue: (styles, { data }) => ({ ...styles, backgroundColor: "red" }),
          placeholder: styles => ({ ...styles }),
        }}
      />
    </div>
  );
};

export default MainSelect;

// Custom selected item (Single Value)
const CustomSingleValue = ({ data }: SingleValueProps<OptionType>) => (
  <div className="flex items-center gap-2">
    {data.avatar && (
      <Image
        src={data.avatar}
        alt={data.label}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
    )}
    <span>{data.label}</span>
  </div>
);

// Custom dropdown option
const CustomOption = (props: OptionProps<OptionType>) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
    >
      {data.avatar && (
        <Image
          src={data.avatar}
          alt={data.label}
          width={26}
          height={26}
          className="h-6 w-6 rounded-full"
        />
      )}
      <span>{data.label}</span>
    </div>
  );
};

// Custom dropdown menu with "Add Employee" button
const CustomMenuList = (props: MenuListProps<OptionType>) => {
  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-2 border-b bg-gray-100 px-4 py-2 font-medium text-purple-600"
        onClick={() => alert("Adding Employee")}
      >
        ➕ <span>დაამატე თანამშრომელი</span>
      </div>
      <components.MenuList {...props} />
    </div>
  );
};
