"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
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

import CustomDataPicker from "./CustomDataPicker";

interface IProps {
  employees: EmployeeType[];
  priorities: PriorityType[];
  statuses: StatusType[];
  departments: DepartmentType[];
}

function CreateTaskForm({ employees, priorities, statuses, departments }: IProps) {
  const { control, handleSubmit, watch } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
  });

  const selectedDepartment = watch("department_id");

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.department.id === selectedDepartment);
  }, [selectedDepartment, employees]);

  const onSubmit = async (data: CreateTaskSchemaType) => {
    const preparedData = { ...data, due_date: formatDateForTaskApi(data.due_date.toISOString()) };

    const res = await createNewTask(preparedData);

    if (res) redirect("/");
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
          onMenuHeaderClick={() => {}} //TODO open modal for create employee
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
