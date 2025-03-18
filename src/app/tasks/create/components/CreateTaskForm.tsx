"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MainButton, MainInput, MainSelect } from "@/components";
import {
  createTaskSchema,
  CreateTaskSchemaType,
  descriptionValidations,
  titleValidations,
} from "@/validations";

// TODO delete
const selectOptions = [
  {
    id: 1,
    value: "user1",
    name: "თამარ კაკაბაძე 1",
    avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    id: 2,
    value: "user2",
    name: "თამარ კაკაბაძე 2",
    // avatar:
    //   "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    id: 3,
    value: "user3",
    name: "თამარ კაკაბაძე 3",
    // avatar:
    //   "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
  {
    id: 4,
    value: "user4",
    name: "თამარ კაკაბაძე 4",
    avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
  },
];

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

        {/* <MainSelect
          name="department"
          label="დეპარტამენტი"
          isRequired
          options={selectOptions}
          defaultValue={selectOptions[0]}
        /> */}

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
          options={selectOptions}
          defaultValue={selectOptions[0]}
          onMenuHeaderClick={() => {}}
        />

        <div className="flex gap-8">
          <MainSelect
            name="priority_id"
            control={control}
            label="პრიორიტეტი"
            isRequired
            options={selectOptions}
            defaultValue={selectOptions[1]}
          />
          <MainSelect
            name="status_id"
            control={control}
            label="სტატუსი"
            isRequired
            options={selectOptions}
            defaultValue={selectOptions[2]}
          />
        </div>

        <MainInput name="due_date" control={control} isRequired label="დედლაინი" />
      </div>

      <div className="flex justify-end">
        <MainButton variant="filled" type="submit" title="დავალების შექმნა" />
      </div>
    </form>
  );
}

export default CreateTaskForm;
