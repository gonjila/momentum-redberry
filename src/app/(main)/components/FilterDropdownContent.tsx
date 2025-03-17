"use client";

import { useEffect, useState } from "react";

import { DepartmentType, EmployeeType, PriorityType } from "@/types";
import { FilterDataKeysType, PosiblyActivatedFilterItem, useFiltersStore } from "@/stores";
import { MainButton } from "@/components";

import FilterContentItem from "./FilterContentItem";

interface IProps {
  data: PosiblyActivatedFilterItem[];
  chosenFilterType: FilterDataKeysType;
  onClose: () => void;
}

function FilterContent({ data, chosenFilterType, onClose }: IProps) {
  const { changeData } = useFiltersStore();

  const [chosenFilterData, setChosenFilterData] = useState<PosiblyActivatedFilterItem[]>([]);

  useEffect(() => {
    setChosenFilterData(data);
  }, [data]);

  const updateChosenFilterData = (item: DepartmentType | PriorityType | EmployeeType) => {
    setChosenFilterData(prev =>
      prev.map(stateItem =>
        stateItem.id === item.id ? { ...stateItem, active: !stateItem.active } : stateItem,
      ),
    );
  };

  const saveChanges = () => {
    const filteredChosendFilters = chosenFilterData
      .filter(chosenFil => chosenFil.active)
      .map(chosenFil => ({ ...chosenFil, chosenFilterType }));

    changeData(chosenFilterData, chosenFilterType, filteredChosendFilters);
  };

  return (
    <div className="border-main absolute top-[120%] flex w-full flex-col gap-6 rounded-xl border bg-white px-8 pt-10 pb-5">
      {data.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {chosenFilterData.map(item => (
              <FilterContentItem
                key={item.id}
                title={
                  chosenFilterType === "employees"
                    ? `${item.name} ${(item as EmployeeType).surname}`
                    : item.name
                }
                imageSrc={chosenFilterType === "employees" ? (item as EmployeeType).avatar : undefined}
                isSelected={item?.active || false}
                onSelect={() => updateChosenFilterData(item)}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <MainButton
              variant="rounded"
              title="არჩევა"
              onClick={() => {
                saveChanges();
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
