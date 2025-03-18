"use client";

import { useEffect } from "react";

import { useCommentsStore } from "@/stores";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

type IProps = {
  taskId: number;
};

function CommentsSection({ taskId }: IProps) {
  const { comments, fetchComments, clearComments } = useCommentsStore();

  useEffect(() => {
    fetchComments(taskId);

    return () => clearComments();
  }, [clearComments, fetchComments, taskId]);

  return (
    <section className="bg-pink mt-10 flex flex-1 flex-col gap-16 rounded-[10px] px-11 py-10">
      <CommentForm parentId={null} taskId={taskId} />

      <div className="flex flex-col gap-10">
        <h2 className="flex items-center gap-2 text-[20px] font-medium">
          კომენტარები
          <span className="bg-main rounded-full px-3 py-1 text-sm text-white">
            {comments?.length || 0}
          </span>
        </h2>

        {comments.length > 0 ? (
          comments?.map(comment => {
            const { sub_comments, ...rest } = comment;
            return (
              <div key={comment.id} className="flex flex-col gap-5">
                <Comment {...rest} />

                {sub_comments &&
                  sub_comments.map(subComment => (
                    <Comment key={subComment.id} {...subComment} isSubcomment />
                  ))}
              </div>
            );
          })
        ) : (
          <p>კომენტარი არ არის</p>
        )}
      </div>
    </section>
  );
}

export default CommentsSection;
