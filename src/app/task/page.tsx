import React from "react";

import { DepartmentsBadge, PriorityBadge } from "@/components";

import { CommentsSection, Details } from "./components";

function TaskPage() {
  return (
    <main className="flex justify-between gap-[220px]">
      <section className="flex flex-1 flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <PriorityBadge
                id={1}
                name="priority"
                icon="https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg"
                size="large"
              />
              <DepartmentsBadge id={3} name="department" size="large" />
            </div>

            <h1 className="text-[34px] font-semibold">Redberry-ს საიტის ლენდინგის დიზაინი</h1>
          </div>

          <p className="text-lg">
            მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი, რომელიც უზრუნველყოფს მარტივ
            ნავიგაციას და მკაფიო ინფორმაციის გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive),
            გამორჩეული ვიზუალით, მინიმალისტური სტილით და ნათელი ტიპოგრაფიით.
          </p>
        </div>

        <Details />
      </section>

      <CommentsSection />
    </main>
  );
}

export default TaskPage;
