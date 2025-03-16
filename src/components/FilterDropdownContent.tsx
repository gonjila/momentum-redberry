"use client";

import { DepartmentType, EmployeeType, PriorityType } from "@/types";
import { useFiltersStore } from "@/store";

import FilterContentItem from "./FilterContentItem";
import MainButton from "./MainButton";
import { type ChosenFilterType } from "./TasksFilter";

type IProps = {
  data: DepartmentType[] | PriorityType[] | EmployeeType[];
  chosenFilterType: ChosenFilterType;
  onClose: () => void;
};

function FilterContent({ data, chosenFilterType, onClose }: IProps) {
  const { chooseFilter } = useFiltersStore();

  return (
    <div
      className={`border-main absolute top-[120%] flex w-full flex-col gap-6 rounded-xl border bg-white px-8 pt-10 pb-5 ${chosenFilterType === 3 && "py-5!"}`}
    >
      {data.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {chosenFilterType !== 3 &&
              data?.map(department => (
                <FilterContentItem
                  key={department.id}
                  title={department.name}
                  isSelected={true}
                  onSelect={() => chooseFilter([])}
                />
              ))}

            {chosenFilterType === 3 &&
              (data as EmployeeType[])?.map(employee => (
                <FilterContentItem
                  key={employee.id}
                  title={`${employee.name} ${employee.surname}`}
                  imageSrc={employee.avatar}
                  isSelected={true}
                  onSelect={() => chooseFilter([])}
                />
              ))}
          </div>
          <div className="flex justify-end">
            <MainButton
              variant="rounded"
              title="არჩევა"
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </>
      ) : (
        <div className="text-center">მონაცემები არ არის</div>
      )}
    </div>
  );
}

export default FilterContent;
