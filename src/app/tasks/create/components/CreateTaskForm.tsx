"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MainButton, MainInput } from "@/components";
import {
  createTaskSchema,
  CreateTaskSchemaType,
  descriptionValidations,
  titleValidations,
} from "@/validations";

function CreateTaskForm() {
  const { control, handleSubmit } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CreateTaskSchemaType) => {
    // eslint-disable-next-line no-console
    console.log("Form submitted", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-pink flex flex-col gap-28 rounded-md px-14 py-16"
    >
      <div className="grid grid-cols-2 gap-x-40 gap-y-14">
        <MainInput
          name="title"
          control={control}
          label="სათაური"
          isRequired
          validations={titleValidations}
        />

        <MainInput
          name="description"
          control={control}
          label="აღწერა"
          validations={descriptionValidations}
        />
      </div>

      <div className="flex justify-end">
        <MainButton variant="filled" type="submit" title="დავალების შექმნა" />
      </div>
    </form>
  );
}

export default CreateTaskForm;
