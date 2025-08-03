import { SaveCommentDtoType } from '../../src/types/comment.type';
import { PostType, SavePostDtoType } from '../../src/types/post.type'
import { SaveUserInfoDtoType } from '../../src/types/user-info.type'


export namespace TestData {
    const AddUserInfo: SaveUserInfoDtoType[] = [
        {
            "blogName": "Backend",
            "fullName": "Дмитрий Иванов"
        },
        {
            "blogName": "Frontend",
            "fullName": "Анна Смирнова"
        },
    ];

    const AddPost: SavePostDtoType[] = [
        {
            "title": "Composition API в деталях",
            "briefDescription": "Полное руководство по революционному API Vue 3",
            "fullDescription": "Composition API - это новый способ организации кода в Vue 3, который решает ключевые проблемы Options API:\n\n• Логическая организация кода\n• Переиспользование логики (composables)\n• Лучшая TypeScript поддержка\n• Гибкая структура компонентов\n\nКлючевые концепции:\n\n- ref() и reactive()\n- computed свойства\n- watch и watchEffect\n- Хуки жизненного цикла\n- Создание собственных composables\n\nПример:\n```ts\nconst count = ref(0);\nconst double = computed(() => count.value * 2);\n\nfunction increment() {\n  count.value++;\n}\n```\n\nComposition API особенно полезен для сложных компонентов и больших приложений."
        },
        {
            "title": "TypeScript для Vue",
            "briefDescription": "Полное руководство по интеграции TypeScript с Vue 3",
            "fullDescription": "В этой статье мы разберём как правильно настроить TypeScript в Vue 3 проекте. Вы узнаете: \n\n- Как типизировать компоненты с defineComponent\n- Работу с Composition API и TypeScript\n- Типизацию props, emits и ref\n- Использование generics в composables\n- Лучшие практики от команды Vue\n\nПример типизированного компонента:\n```ts\ninterface Props {\n  msg: string;\n  count?: number;\n}\n\nconst props = defineProps<Props>();\n```\n\nTypeScript значительно улучшает безопасность кода в больших проектах."
        }
    ]

    
    const AddComment: SaveCommentDtoType[] = [
        {
            "email": "random_fan@yandex.ru",
            "textComment": "Спасибо за статью! 🔥",
            "userInfo": "Лариса"
        },
        {
            "email": "learning_vue@outlook.com",
            "textComment": "Не интересно",
            "userInfo": "Гена"
        },
    ]


    
    const posts: PostType[] = [
        {
        id: 1,
        title: "Заголовок",
        briefDescription: "Краткое описание",
        fullDescription: "Полное описание",
        dateTime: '17 сентября 2024',
        comments: [{
            dateTime: "string",
            email: "string",
            id: 1,
            textComment: "string",
            userInfo: "string",
        }],
        },
        {
        id: 2,
        title: "Заголовок",
        briefDescription: "Краткое описание",
        fullDescription: "Полное описание",
        dateTime: '17 сентября 2024',
        comments: [{
            dateTime: "string",
            email: "string",
            id: 1,
            textComment: "string",
            userInfo: "string",
        }],
        },
        {
        id: 3,
        title: "Заголовок",
        briefDescription: "Краткое описание",
        fullDescription: "Полное описание",
        dateTime: '17 сентября 2024',
        comments: [{
            dateTime: "string",
            email: "string",
            id: 1,
            textComment: "string",
            userInfo: "string",
        }],
        },
        {
        id: 4,
        title: "Заголовок",
        briefDescription: "Краткое описание",
        fullDescription: "Полное описание",
        dateTime: '17 сентября 2024',
        comments: [{
            dateTime: "string",
            email: "string",
            id: 1,
            textComment: "string",
            userInfo: "string",
        }],
        },
     ];


}