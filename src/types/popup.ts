import type { SaveCommentDtoType } from './comment.type'
import type { SavePostDtoType } from './post.type'
import type { SaveUserInfoDtoType } from './user-info.type'

export type PopupInputType = {
  name: keyof SavePostDtoType | keyof SaveCommentDtoType | keyof SaveUserInfoDtoType
  label: string
  maxLength: number
}

export type PopupUpdateType = {
  fieldName: string
  value: string
}

export enum PopupEnum {
  AvtorAdd = 'Добавить автора',
  AvtorDelete = 'Удалить автора',

  PostAdd = 'Добавить пост',
  PostDelete = 'Удалить пост',
  PostUpdate = 'Обновить пост',

  CommentAdd = 'Добавить комментарий',
  CommentDelete = 'Удалить комментарий',
}
