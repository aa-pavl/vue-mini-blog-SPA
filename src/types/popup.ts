import type { SavePostDtoType } from './post.type'

export type PopupInputType = {
  name: keyof SavePostDtoType
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
