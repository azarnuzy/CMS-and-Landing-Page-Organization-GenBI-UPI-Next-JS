import { atom, selector } from 'recoil';

import { TCommentData } from '@/types/posts';

export const commentsDataState = atom<TCommentData[]>({
  key: 'commentsDataState',
  default: [
    {
      id: 0,
      post_id: 0,
      _links: {
        reply: {
          href: '',
        },
      },
      comment_id: 0,
      content: '',
      created_at: '',
      level: 0,
      replies: [
        {
          comment_id: 0,
          content: '',
          created_at: '',
          id: 0,
          level: 0,
          post_id: 0,
          updated_at: '',
          commenter: '',
        },
      ],
      updated_at: '',
      commenter: '',
    },
  ],
});

export const totalCommentsSelector = selector<number>({
  key: 'totalCommentsSelector',
  get: ({ get }) => {
    const commentsData = get(commentsDataState);
    let totalComments = commentsData.length;

    // Iterate over comments and add the number of replies for each comment
    commentsData.forEach((comment) => {
      totalComments += comment.replies.length;
    });

    return totalComments;
  },
});
