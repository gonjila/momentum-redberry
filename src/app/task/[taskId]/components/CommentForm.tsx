"use client";

import { useActionState } from "react";

import { MainButton } from "@/components";

interface IProps {
  parentId: number | null;
  taskId: number;
  isColapsed?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

type CommentFormState = {
  commentText: string;
};

function CommentForm({ parentId, taskId, isColapsed = false, onSubmit, onClose }: IProps) {
  const [, submitAction, isPending] = useActionState<CommentFormState, FormData>(
    (prevState: CommentFormState, formData: FormData) => {
      const commentText = formData.get("comment") as string;

      if (onSubmit) {
        onSubmit();
      }

      return { commentText };
    },
    { commentText: "" },
  );

  return (
    <form className="relative" action={submitAction}>
      <textarea
        name="comment"
        rows={isColapsed ? 2 : 4}
        placeholder="დაწერე კომენტარი"
        className="w-full resize-none rounded-[10px] bg-white px-5 py-4"
      />

      <div
        className={`absolute flex items-center gap-2 ${isColapsed ? "right-2 bottom-2 px-3! py-1! text-sm" : "right-5 bottom-4"}`}
      >
        <MainButton
          variant="rounded"
          title={isPending ? "იგზავნება..." : "დააკომენტარე"}
          disabled={isPending}
          className={isColapsed ? "px-3! py-1! text-sm" : ""}
        />
        {onClose && (
          <MainButton
            variant="rounded"
            title={"დახურვა"}
            disabled={isPending}
            className={`bg-gray-300! text-black! ${isColapsed ? "px-3! py-1! text-sm" : ""}`}
          />
        )}
      </div>
    </form>
  );
}

export default CommentForm;
