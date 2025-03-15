"use client";

import { useEffect, useRef, useState } from "react";

import FilterTypeBtn from "./FilterTypeBtn";
import MainButton from "./MainButton";
import FilterContentItem from "./FilterContentItem";
import FilterResultItem from "./FilterResultItem";

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
    <div ref={dropdownRef} className="relative mt-[52px] mb-6 flex max-w-max flex-col gap-6">
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

      {/* dropdown */}
      <div
        onBlur={() => setChosenFilter(null)}
        className={`border-main absolute top-[120%] flex w-full flex-col gap-6 overflow-hidden rounded-xl bg-white transition-all ${chosenFilter ? "border px-8 pt-10 pb-5 opacity-100" : "h-0 p-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-5">
          <FilterContentItem
            title="ელაია ბაგრატიონი"
            isSelected={true}
            onSelect={() => console.log("first")}
          />
          <FilterContentItem
            title="გიორგი კეკელიძე"
            isSelected={false}
            onSelect={() => console.log("second")}
          />
          <FilterContentItem
            title="მარიამ მაჭავარიანი"
            isSelected={true}
            onSelect={() => console.log("third")}
          />
        </div>

        <div className="flex justify-end">
          <MainButton variant="rounded" title="არჩევა" onClick={() => {}} />
        </div>
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
