"use client";

import { useEffect, useRef, useState } from "react";

import FilterTypeBtn from "./FilterTypeBtn";
import MainButton from "./MainButton";

function TasksFilter() {
  const [chosenFilter, setChosenFilter] = useState<1 | 2 | 3 | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setChosenFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative max-w-max">
      <div className="flex items-center gap-11 rounded-[10px] border border-gray-200">
        <FilterTypeBtn
          title="დეპარტამენტი"
          isActive={chosenFilter === 1}
          onClick={() => setChosenFilter(prev => (prev === 1 ? null : 1))}
        />
        <FilterTypeBtn
          title="პრიორიტეტი"
          isActive={chosenFilter === 2}
          onClick={() => setChosenFilter(prev => (prev === 2 ? null : 2))}
        />
        <FilterTypeBtn
          title="თანამშრომელი"
          isActive={chosenFilter === 3}
          onClick={() => setChosenFilter(prev => (prev === 3 ? null : 3))}
        />
      </div>

      {chosenFilter && (
        <div
          onBlur={() => setChosenFilter(null)}
          className="border-main absolute top-[120%] flex w-full flex-col gap-6 rounded-xl border bg-white px-8 pt-10 pb-5"
        >
          {chosenFilter}

          <div className="flex justify-end">
            <MainButton variant="rounded" title="არჩევა" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksFilter;
