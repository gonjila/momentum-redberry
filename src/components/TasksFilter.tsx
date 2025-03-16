"use client";

import { useEffect, useRef, useState } from "react";

import { FilterDataKeysType, useFiltersStore } from "@/store";

import FilterTypeBtn from "./FilterTypeBtn";
import FilterResultItem from "./FilterResultItem";
import FilterDropdownContent from "./FilterDropdownContent";
import MainButton from "./MainButton";

function TasksFilter() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { fetchedFiltersData, selectedFilters, fetchFilterData, resetFilterData, deleteSelectedFilter } =
    useFiltersStore();

  const [chosenFilterType, setChosenFilterType] = useState<FilterDataKeysType | null>(null); // for opening different dropdown content

  useEffect(() => {
    fetchFilterData();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setChosenFilterType(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fetchFilterData]);

  const modifiedSelectedFilters = Object.values(selectedFilters).flat();

  return (
    <div ref={dropdownRef} className="mt-[52px] mb-6 flex flex-col gap-6">
      <div className="relative">
        <div className="flex max-w-max items-center gap-11 rounded-[10px] border border-gray-200">
          {[
            { id: "departments", title: "დეპარტამენტი" },
            { id: "priorities", title: "პრიორიტეტი" },
            { id: "employees", title: "თანამშრომელი" },
          ].map(({ id, title }) => (
            <FilterTypeBtn
              key={id}
              title={title}
              isActive={chosenFilterType === id}
              onClick={() =>
                setChosenFilterType(prev => (prev === id ? null : (id as FilterDataKeysType)))
              }
            />
          ))}
        </div>

        {chosenFilterType !== null && (
          <FilterDropdownContent
            data={
              chosenFilterType === "departments"
                ? fetchedFiltersData.departments
                : chosenFilterType === "priorities"
                  ? fetchedFiltersData.priorities
                  : fetchedFiltersData.employees
            }
            chosenFilterType={chosenFilterType}
            onClose={() => setChosenFilterType(null)}
          />
        )}
      </div>

      {modifiedSelectedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {modifiedSelectedFilters.map(item => (
            <FilterResultItem
              key={item.id + item.name}
              title={item.name}
              onClear={deleteSelectedFilter}
            />
          ))}

          <MainButton variant="text" title="გასუფთავება" onClick={resetFilterData} />
        </div>
      )}
    </div>
  );
}

export default TasksFilter;
