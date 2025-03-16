"use client";

import { useEffect, useRef, useState } from "react";

import { DepartmentType, EmployeeType, PriorityType } from "@/types";

import FilterTypeBtn from "./FilterTypeBtn";
import FilterResultItem from "./FilterResultItem";
import FilterDropdownContent from "./FilterDropdownContent";

interface IProps {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
}

export type ChosenFilterType = 1 | 2 | 3 | null;

function TasksFilter({ departments, priorities, employees }: IProps) {
  const [chosenFilterType, setChosenFiltertype] = useState<ChosenFilterType>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setChosenFiltertype(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="mt-[52px] mb-6 flex max-w-max flex-col gap-6">
      <div className="relative">
        <div className="flex items-center gap-11 rounded-[10px] border border-gray-200">
          <FilterTypeBtn
            title="დეპარტამენტი"
            isActive={chosenFilterType === 1}
            onClick={() => setChosenFiltertype(prev => (prev === 1 ? null : 1))}
          />
          <FilterTypeBtn
            title="პრიორიტეტი"
            isActive={chosenFilterType === 2}
            onClick={() => setChosenFiltertype(prev => (prev === 2 ? null : 2))}
          />
          <FilterTypeBtn
            title="თანამშრომელი"
            isActive={chosenFilterType === 3}
            onClick={() => setChosenFiltertype(prev => (prev === 3 ? null : 3))}
          />
        </div>
        {chosenFilterType === 1 && (
          <FilterDropdownContent
            data={departments}
            chosenFilterType={chosenFilterType}
            onClose={() => setChosenFiltertype(null)}
          />
        )}
        {chosenFilterType === 2 && (
          <FilterDropdownContent
            data={priorities}
            chosenFilterType={chosenFilterType}
            onClose={() => setChosenFiltertype(null)}
          />
        )}

        {chosenFilterType === 3 && (
          <FilterDropdownContent
            data={employees}
            chosenFilterType={chosenFilterType}
            onClose={() => setChosenFiltertype(null)}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <FilterResultItem title="მაღალი" onClear={() => {}} />
        <FilterResultItem title="დიზაინი" onClear={() => {}} />
        <FilterResultItem title="ემილია მორგანი" onClear={() => {}} />

        <button>გასუფთავება</button>
      </div>
    </div>
  );
}

export default TasksFilter;
