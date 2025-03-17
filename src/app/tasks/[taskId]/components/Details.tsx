import Image from "next/image";
import { useMemo } from "react";

import { Icon } from "@/components";
import { EmployeeType, StatusType } from "@/types";
import { formatDateWithDay } from "@/helpers";

type IProps = {
  id: number;
  due_date: string;
  employee: EmployeeType;
  status: StatusType;
};

function Details({ status, employee, due_date }: IProps) {
  const formatedDate = useMemo(() => formatDateWithDay(due_date), [due_date]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">დავალების დეტალები</h2>

      <div className="flex flex-col">
        {/* TODO status select */}
        <div className="flex items-center py-3">
          <div className="flex w-[235px] items-center gap-1.5">
            <Icon iconName="pie-chart" />
            <span>სტატუსი</span>
          </div>
          <div className="">Lorem ipsum dolor sit amet consectetur.</div>
        </div>

        <div className="flex items-center py-3">
          <div className="flex w-[235px] items-center gap-1.5">
            <Icon iconName="person" />
            <span>თანამშრომელი</span>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={employee.avatar}
              alt={employee.name}
              width={32}
              height={32}
              className="h-8 w-8 overflow-hidden rounded-full"
            />

            <div className="flex flex-col">
              <p className="text-xs text-gray-600">{employee.department.name}</p>
              <p className="text-sm">{`${employee.name} ${employee.surname}`}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="flex w-[235px] items-center gap-1.5">
            <Icon iconName="calendar" />
            <span>დავალების ვადა</span>
          </div>
          <div className="text-sm">{formatedDate}</div>
        </div>
      </div>
    </div>
  );
}

export default Details;
