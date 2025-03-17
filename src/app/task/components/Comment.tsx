"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { MainButton } from "@/components";
import { CommentType } from "@/types";

import CommentForm from "./CommentForm";

interface IProps extends CommentType {
  isSubcomment?: boolean;
}

function Comment({ id, author_nickname, author_avatar, text, task_id, isSubcomment = false }: IProps) {
  const [isTextareaOpened, setIsTextareaOpened] = useState(false);

  const closeTextarea = useCallback(() => setIsTextareaOpened(false), []);

  return (
    <div className={`flex items-start gap-3 ${isSubcomment && "ml-[50px]"}`}>
      <Image src={author_avatar} alt={author_nickname} width={38} height={38} />

      <div className="flex w-full flex-col gap-2">
        <h3 className="text-lg font-semibold">{author_nickname}</h3>
        <p className="font-light">{text}</p>

        {!isSubcomment &&
          (!isTextareaOpened ? (
            <div>
              <MainButton
                variant="text"
                title="უპასუხე"
                iconName="left-curved-arrow"
                iconSize={16}
                onClick={() => setIsTextareaOpened(true)}
              />
            </div>
          ) : (
            <CommentForm
              parentId={id}
              taskId={task_id}
              isColapsed
              onSubmit={closeTextarea}
              onClose={closeTextarea}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
