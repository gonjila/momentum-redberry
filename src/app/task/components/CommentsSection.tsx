import { CommentType } from "@/types";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

type IProps = {
  data?: object;
};

// FIXME delete
const dummyData: CommentType[] = [
  {
    id: 1,
    text: "ეს დავალება საერთიდ არ არის რთული",
    task_id: 1,
    parent_id: null,
    author_avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
    author_nickname: "Gela",
    sub_comments: [
      {
        id: 2,
        text: "ვისთვის როგორ",
        task_id: 1,
        parent_id: 1,
        author_avatar:
          "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
        author_nickname: "Lela",
      },
    ],
  },
  {
    id: 3,
    text: "ეს დავალება საერთიდ არ არის რთული საერთიდ არ",
    task_id: 1,
    parent_id: null,
    author_avatar:
      "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
    author_nickname: "Gela",
    sub_comments: [
      {
        id: 4,
        text: "ვისთვის როგორ",
        task_id: 1,
        parent_id: 3,
        author_avatar:
          "https://momentum.redberryinternship.ge/storage/employee-avatars/iWqIr6QWRo6V1ofnenkctiyJRPKh4ar0LmxF8FYQ.png",
        author_nickname: "Lela",
      },
    ],
  },
];

function CommentsSection({}: IProps) {
  return (
    <section className="mt-10 flex flex-1 flex-col gap-16 rounded-[10px] bg-[#DDD2FF] px-11 py-10">
      <CommentForm parentId={null} taskId={1} />

      <div className="flex flex-col gap-10">
        <h2 className="flex items-center gap-2 text-[20px] font-medium">
          კომენტარები
          <span className="bg-main rounded-full px-3 py-1 text-sm text-white">{dummyData.length}</span>
        </h2>

        {dummyData?.map(comment => {
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
