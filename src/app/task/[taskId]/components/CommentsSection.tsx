import { getTaskComments } from "@/services";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

type IProps = {
  taskId: number;
};

async function CommentsSection({ taskId }: IProps) {
  const commentsData = await getTaskComments(taskId);

  return (
    <section className="mt-10 flex flex-1 flex-col gap-16 rounded-[10px] bg-[#DDD2FF] px-11 py-10">
      <CommentForm parentId={null} taskId={1} />

      <div className="flex flex-col gap-10">
        <h2 className="flex items-center gap-2 text-[20px] font-medium">
          კომენტარები
          <span className="bg-main rounded-full px-3 py-1 text-sm text-white">
            {commentsData?.length || 0}
          </span>
        </h2>

        {commentsData?.map(comment => {
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
        })}
      </div>
    </section>
  );
}

export default CommentsSection;
