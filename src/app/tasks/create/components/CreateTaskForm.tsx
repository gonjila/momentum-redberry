"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { addDays } from "date-fns";
import { redirect } from "next/navigation";

import { MainButton, MainInput, MainSelect } from "@/components";
import {
  createTaskSchema,
  CreateTaskSchemaType,
  descriptionValidations,
  titleValidations,
} from "@/validations";
import { formatDateForTaskApi } from "@/helpers";
import { DepartmentType, EmployeeType, PriorityType, StatusType } from "@/types";
import { createNewTask } from "@/services";
import { useModalStore } from "@/stores";

import CustomDataPicker from "./CustomDataPicker";

interface IProps {
  employees: EmployeeType[];
  priorities: PriorityType[];
  statuses: StatusType[];
  departments: DepartmentType[];
}

const STORAGE_KEY = "create_task_form";

function CreateTaskForm({ employees, priorities, statuses, departments }: IProps) {
  const { openModal } = useModalStore();

  const storedData = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

  const { control, handleSubmit, watch, setValue } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
    defaultValues: storedData ? JSON.parse(storedData) : {},
  });

  const selectedDepartment = watch("department_id");

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.department.id === selectedDepartment);
  }, [selectedDepartment, employees]);

  // department_id-ის შეცვლის შემდეგ რომ გასუფთავდეს employee_id
  useEffect(() => {
    if (selectedDepartment && !storedData) {
      setValue("employee_id", 0);
    }
  }, [selectedDepartment, setValue, storedData]);

  // მონაცემების ცვლილების შემდეგ რომ შეინახოს ინფორმაცია localstorageში
  useEffect(() => {
    const subscription = watch(formData => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  // გვერდის შეცვლისას რომ გასუფთავდეს შენახული ველიუები
  useEffect(() => {
    return () => {
      localStorage.removeItem(STORAGE_KEY);
    };
  }, []);

  const onSubmit = async (data: CreateTaskSchemaType) => {
    const preparedData = { ...data, due_date: formatDateForTaskApi(data.due_date.toISOString()) };

    const res = await createNewTask(preparedData);

    if (res) {
      localStorage.removeItem(STORAGE_KEY);
      redirect(`/tasks/${res.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-pink flex flex-col gap-28 rounded-md px-14 py-16"
    >
      <div className="grid grid-cols-2 gap-x-40 gap-y-14">
        <MainInput
          name="name"
          control={control}
          label="სათაური"
          isRequired
          validations={titleValidations}
        />

        <MainSelect
          name="department_id"
          control={control}
          label="დეპარტამენტი"
          isRequired
          placeholder="აირჩიე..."
          options={departments}
        />

        <MainInput
          name="description"
          control={control}
          label="აღწერა"
          type="textarea"
          rows={2}
          validations={descriptionValidations}
        />

        <MainSelect
          name="employee_id"
          control={control}
          label="პასუხისმგებელი თანამშრომელი"
          isRequired
          isDisabled={!selectedDepartment}
          placeholder="აირჩიე..."
          options={filteredEmployees}
          defaultValue={filteredEmployees[0]}
          onMenuHeaderClick={openModal}
        />

        <div className="flex gap-8">
          <MainSelect
            name="priority_id"
            control={control}
            label="პრიორიტეტი"
            isRequired
            options={priorities}
            defaultValue={priorities[1]}
          />
          <MainSelect
            name="status_id"
            control={control}
            label="სტატუსი"
            isRequired
            options={statuses}
            defaultValue={statuses[0]}
          />
        </div>

        <CustomDataPicker
          name="due_date"
          control={control}
          isRequired
          label="დედლაინი"
          defaultValue={addDays(new Date(), 1)}
          disabled={{ before: new Date() }}
        />
      </div>

      <div className="flex justify-end">
        <MainButton variant="filled" type="submit" title="დავალების შექმნა" />
      </div>
    </form>
  );
}

export default CreateTaskForm;
