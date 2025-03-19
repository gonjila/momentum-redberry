"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { MainSelect } from "@/components";
import { StatusType } from "@/types";
import { changeStatusSchema, ChangeStatusSchemaType } from "@/validations";
import { changeStatusForTask } from "@/services";

type IProps = {
  taskId: number;
  defaultValue: StatusType;
  options: StatusType[];
};

const StatusForm = ({ taskId, defaultValue, options }: IProps) => {
  const { control, handleSubmit, watch } = useForm<ChangeStatusSchemaType>({
    resolver: zodResolver(changeStatusSchema),
    mode: "onChange",
  });

  const selectedStatus = watch("status_id");

  useEffect(() => {
    if (selectedStatus) {
      const proceed = window.confirm("დარწმუნებული ხარ რომ სტატუსის შეცვლა გინდა?");
      if (proceed) {
        handleSubmit(async data => {
          await changeStatusForTask(taskId, data.status_id);

          alert("წარმატებით შეიცვალა დავალების სტატუსი");
        })();
      }
    }
  }, [selectedStatus, handleSubmit, taskId]);

  return (
    <form className="min-w-[250px]">
      <MainSelect name="status_id" control={control} defaultValue={defaultValue} options={options} />
    </form>
  );
};

export default StatusForm;
