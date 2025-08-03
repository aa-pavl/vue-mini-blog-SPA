import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AuthService } from './services/auth.servive'
import { UserInfoService } from './services/user-info.service'
import { PostService } from './services/post.servive'
import { CommentService } from './services/comment.servive'


const app = createApp(App)

// Глобальное предоставление сервисов
app.provide('AuthService', new AuthService()); 
app.provide('UserInfoService', new UserInfoService()); 
app.provide('PostService', new PostService());
app.provide('CommentService', new CommentService());

app.use(router)

app.mount('#app')
