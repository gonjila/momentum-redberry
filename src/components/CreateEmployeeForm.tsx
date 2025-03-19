"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { createEmployeeSchema, CreateEmployeeSchemaType, nameValidations } from "@/validations";
import { DepartmentType } from "@/types";
import { createNewEmpolyee, getAllDepartments } from "@/services";
import { useFiltersStore } from "@/stores";

import ImageUploader from "./ImageUploader";

import { MainInput, MainButton, MainSelect } from ".";

interface IProps {
  onCancel: () => void;
}

function CreateEmployeeForm({ onCancel }: IProps) {
  const pathname = usePathname();

  const { addNewEmployee } = useFiltersStore();

  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<CreateEmployeeSchemaType>({
    resolver: zodResolver(createEmployeeSchema),
    mode: "onChange",
  });

  useEffect(() => {
    (async () => {
      const res = await getAllDepartments();

      if (res) setDepartments(res);
    })();
  }, []);

  const onSubmit = async (data: CreateEmployeeSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("department_id", data.department_id.toString());
    formData.append("avatar", data.avatar);

    const newEmployee = await createNewEmpolyee(formData);

    if (newEmployee) {
      if (pathname === "/") addNewEmployee(newEmployee);

      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-11">
      <h2 className="text-center text-[32px] font-medium">თანამშრომლის დამატება</h2>

      <div className="grid grid-cols-2 gap-11">
        <MainInput
          name="name"
          control={control}
          label="სახელი"
          isRequired
          validations={nameValidations}
        />
        <MainInput
          name="surname"
          control={control}
          label="სახელი"
          isRequired
          validations={nameValidations}
        />

        <div className="col-span-2 h-[120px]">
          <ImageUploader name="avatar" control={control} />
        </div>

        <MainSelect
          name="department_id"
          control={control}
          label="სახელი"
          isRequired
          options={departments}
        />
      </div>

      <div className="flex justify-end gap-5">
        <MainButton variant="outlined" title="გაუქმება" onClick={onCancel} />
        <MainButton variant="filled" title="დაამატე თანამშრომელი" type="submit" disabled={isLoading} />
      </div>
    </form>
  );
}

export default CreateEmployeeForm;
