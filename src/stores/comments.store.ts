import { create } from "zustand";

import { CommentType } from "@/types";
import { getTaskComments } from "@/services";

interface ICommentsStore {
  comments: CommentType[];
  fetchComments: (taskId: number) => void;
  addComment: (newComment: CommentType) => void;
  clearComments: () => void;
}

const useCommentsStore = create<ICommentsStore>(set => ({
  comments: [],

  fetchComments: async taskId => {
    const commentsData = await getTaskComments(taskId);

    set({ comments: commentsData });
  },

  addComment: newComment => {
    set(state => {
      if (!newComment.parent_id) {
        return { comments: [...state.comments, newComment] };
      }

      return {
        comments: state.comments.map(comment => {
          if (comment.id === newComment.parent_id) {
            return {
              ...comment,
              sub_comments: [...(comment.sub_comments || []), newComment],
            };
          }
          return comment;
        }),
      };
    });
  },

  clearComments: () => set({ comments: [] }),
}));

export default useCommentsStore;
