import type { PostType } from "./post.type";

export type UserInfoType = {
  blogName: string;
  fullName: string;
  id: number; 
  post: PostType[]; 
};


export type SaveUserInfoDtoType = {
  blogName: string;
  fullName: string;
};