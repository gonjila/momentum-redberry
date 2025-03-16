import Image from "next/image";

import { Icon } from "@/components";

type IProps = { data?: object };

function Details({}: IProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">დავალების დეტალები</h2>

      <div className="flex flex-col">
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
              src={
                "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png"
              }
              alt={"name"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />

            <div className="flex flex-col">
              <p className="text-xs text-gray-600">დიზაინის დეპარტამენტი</p>
              <p className="text-sm">ელაია ბაგრატიონი</p>
            </div>
          </div>
        </div>

        <div className="flex items-center py-3">
          <div className="flex w-[235px] items-center gap-1.5">
            <Icon iconName="calendar" />
            <span>დავალების ვადა</span>
          </div>
          <div className="">ორშ - 02/2/2025</div>
        </div>
      </div>
    </div>
  );
}

export default Details;
