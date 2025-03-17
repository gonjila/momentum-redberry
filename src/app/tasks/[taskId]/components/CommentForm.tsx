"use client";

import { useActionState } from "react";
import { ZodError } from "zod";

import { MainButton } from "@/components";
import { commentOnTaskSchema } from "@/validations";
import { createNewComment } from "@/services";
import { useCommentsStore } from "@/stores";

interface IProps {
  parentId: number | null;
  taskId: number;
  isColapsed?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

type CommentFormState = {
  commentText: string;
  error: string | null;
};

function CommentForm({ parentId, taskId, isColapsed = false, onSubmit, onClose }: IProps) {
  const { addComment } = useCommentsStore();

  const [, submitAction, isPending] = useActionState<CommentFormState, FormData>(
    async (prevState: CommentFormState, formData: FormData) => {
      const commentText = formData.get("comment") as string;

      try {
        const validatedCommentText = await commentOnTaskSchema.parseAsync(commentText);

        const newComment = await createNewComment(taskId, {
          parent_id: parentId,
          text: validatedCommentText,
        });

        if (newComment) addComment(newComment);

        if (onSubmit) {
          onSubmit();
        }

        return { commentText, error: null };
      } catch (err) {
        const errorMessage =
          err instanceof ZodError && Array.isArray(err.errors) && err.errors[0]?.message
            ? err.errors[0].message
            : "An unknown error occurred while commenting on task";

        return { commentText: "", error: errorMessage };
      }
    },
    { commentText: "", error: null },
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
          type="submit"
          variant="rounded"
          title={isPending ? "იგზავნება..." : "დააკომენტარე"}
          disabled={isPending}
          className={isColapsed ? "px-3! py-1! text-sm" : ""}
        />
        {onClose && (
          <MainButton
            variant="rounded"
            title={"დახურვა"}
            onClick={onClose}
            className={`bg-gray-300! text-black! ${isColapsed ? "px-3! py-1! text-sm" : ""}`}
          />
        )}
      </div>
    </form>
  );
}

export default CommentForm;
