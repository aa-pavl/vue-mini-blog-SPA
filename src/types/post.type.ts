import type { CommentType } from "./comment.type";

export type PostType = {
  briefDescription: string;
  comments: CommentType[];
  dateTime: string; 
  fullDescription: string;
  id: number; 
  title: string;
};

export type PostWithAvtorType = PostType & {
  avtor: {
    fullName: string;
    id: number; 
  };
};

export type GetPostDtoType = {
  briefDescription: string;
  comments: CommentType[];
  dateTime: string; 
  fullDescription: string;
  id: number; 
  title: string;
  userInfoId: number;
};

export type SavePostDtoType = {
  briefDescription: string;
  fullDescription: string;
  title: string;
};

export type UpdatePostDtoType = {
  briefDescription: string;
  fullDescription: string;
  id: number; 
  title: string;
};