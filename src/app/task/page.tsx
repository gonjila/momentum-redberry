import React from "react";

import { DepartmentsBadge, PriorityBadge } from "@/components";

function TaskPage() {
  return (
    <main className="flex justify-between gap-[220px]">
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <PriorityBadge
                id={1}
                name="priority"
                icon="https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"
                size="large"
              />
              <DepartmentsBadge id={5} name="department" size="large" />
            </div>

            <h1 className="text-[36px] font-semibold">Redberry-ს საიტის ლენდინგის დიზაინი</h1>
          </div>

          <p className="">
            მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი, რომელიც უზრუნველყოფს მარტივ
            ნავიგაციას და მკაფიო ინფორმაციის გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive),
            გამორჩეული ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
          </p>
        </div>
      </div>

      <div className="flex-1"></div>
    </main>
  );
}

export default TaskPage;
