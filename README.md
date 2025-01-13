# AiDduo ChatGPT

## 项目简介

AiDduo ChatGPT 是一个基于 Vue 3 和 Spring Boot 的智能聊天机器人应用。该项目采用现代化的技术栈，提供流畅的用户体验和强大的AI对话能力。通过集成阿里云模型和 Claude AI，实现了智能、自然的人机交互。

## 截图 ![image](https://github.com/user-attachments/assets/2b541647-052f-4db6-87f2-7e25fed0215a)

## 目录

- [功能特点](#功能特点)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [部署说明](#部署说明)
- [API文档](#api文档)
- [性能优化](#性能优化)
- [贡献指南](#贡献指南)
- [常见问题](#常见问题)
- [更新日志](#更新日志)
- [许可证](#许可证)

## 功能特点

### 核心功能
- 智能对话：支持自然语言交互，理解上下文
- 多模型支持：集成阿里云模型和 Claude AI
- 实时响应：快速的消息处理和响应机制
- 会话管理：支持多会话并发和历史记录
- 用户个性化：支持自定义设置和偏好

### 界面特性
- 响应式设计：适配各种设备尺寸
- 深色模式：支持明暗主题切换
- 实时反馈：输入状态和发送状态提示
- 消息类型：支持文本、代码块、图片等多种格式

### 系统特性
- 高并发支持：优化的服务端架构
- 安全性：完善的认证和授权机制
- 可扩展：模块化设计，便于扩展
- 监控：系统状态和性能监控

## 技术栈

### 前端技术
- **Vue 3**
  - Composition API
  - Script Setup
  - TypeScript 支持
- **构建工具**
  - Vite 4.x
  - Node.js 16+
- **状态管理**
  - Pinia
  - Vue Router 4
- **UI 框架**
  - Element Plus
  - Tailwind CSS
- **开发工具**
  - Volar
  - ESLint
  - Prettier
- **测试框架**
  - Vitest
  - Vue Test Utils

### 后端技术
- **核心框架**
  - Java 17
  - Spring Boot 3.5
  - Spring Security
- **数据库**
  - MySQL 8.0
  - Redis 6.x
- **中间件**
  - RabbitMQ
  - Elasticsearch
- **AI 集成**
  - 阿里云模型 SDK
  - Claude AI API
- **监控和日志**
  - Spring Actuator
  - ELK Stack
- **测试**
  - JUnit 5
  - Mockito

## 项目结构

### 前端结构
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── router/
│   ├── stores/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   └── main.ts
├── tests/
├── .env
├── package.json
└── vite.config.ts
```

### 后端结构
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/aidduo/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── util/
│   │   └── resources/
│   └── test/
├── pom.xml
└── README.md
```

## 快速开始

### 环境要求
- Node.js 16+
- Java 17
- MySQL 8.0
- Redis 6.x
- Maven 3.8+

### 安装步骤

1. 克隆项目
```bash
# 克隆前端仓库
git clone https://github.com/Dddddduo/AiDduo-chatgpt-frontend.git

# 克隆后端仓库
git clone https://github.com/Dddddduo/AiDduo-chatgpt-backend.git
```

2. 前端设置
```bash
# 进入前端项目目录
cd AiDduo-chatgpt-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

3. 后端设置
```bash
# 进入后端项目目录
cd AiDduo-chatgpt-backend

# 使用 Maven 构建项目
mvn clean install

# 启动应用
mvn spring-boot:run
```

4. 配置数据库
```sql
-- 创建数据库
CREATE DATABASE aidduo_chatgpt;

-- 创建用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 其他必要的表结构...
```

### 环境变量配置

#### 前端环境变量 (.env)
```
VITE_API_BASE_URL=http://localhost:8080
VITE_WEBSOCKET_URL=ws://localhost:8080/ws
VITE_API_TIMEOUT=30000
```

#### 后端环境变量 (application.properties)
```properties
# 服务器配置
server.port=8080

# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/aidduo_chatgpt
spring.datasource.username=root
spring.datasource.password=your_password

# Redis配置
spring.redis.host=localhost
spring.redis.port=6379

# AI模型配置
alibaba.ai.access-key=your_access_key
alibaba.ai.secret-key=your_secret_key
claude.ai.api-key=your_api_key
```

## 开发指南

### 代码规范
1. **前端代码规范**
```javascript
// 组件命名
export default defineComponent({
  name: 'ChatWindow',
  props: {
    messages: {
      type: Array as PropType<Message[]>,
      required: true
    }
  },
  setup(props) {
    // 组件逻辑
  }
});
```

2. **后端代码规范**
```java
@Service
public class ChatService {
    private final MessageRepository messageRepository;
    private final AiModelService aiModelService;

    @Autowired
    public ChatService(
        MessageRepository messageRepository,
        AiModelService aiModelService
    ) {
        this.messageRepository = messageRepository;
        this.aiModelService = aiModelService;
    }

    public ChatResponse processMessage(ChatRequest request) {
        // 服务逻辑
    }
}
```

### API开发规范

1. **RESTful API设计**
```java
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {
    @PostMapping("/send")
    public ResponseEntity<ChatResponse> sendMessage(
        @RequestBody ChatRequest request
    ) {
        // 控制器逻辑
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatMessage>> getHistory(
        @PathVariable Long userId
    ) {
        // 获取历史记录
    }
}
```

2. **错误处理**
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(
        ApiException ex
    ) {
        // 异常处理逻辑
    }
}
```

## 部署说明

### Docker部署

1. **前端 Dockerfile**
```dockerfile
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **后端 Dockerfile**
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

3. **Docker Compose 配置**
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: aidduo_chatgpt

  redis:
    image: redis:6-alpine
```

### 生产环境配置

1. **Nginx配置**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 性能优化

### 前端优化
1. 路由懒加载
```javascript
const routes = [
  {
    path: '/chat',
    component: () => import('@/views/ChatView.vue')
  }
];
```

2. 组件按需导入
```javascript
import { defineAsyncComponent } from 'vue';

const AsyncChat = defineAsyncComponent(() =>
  import('@/components/Chat.vue')
);
```

### 后端优化
1. 缓存配置
```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager rcm = RedisCacheManager
            .builder(redisConnectionFactory)
            .cacheDefaults(config)
            .build();
        return rcm;
    }
}
```

2. 连接池配置
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      idle-timeout: 300000
```

## API文档

### 用户相关接口
```java
/**
 * 用户注册
 * POST /api/v1/users/register
 */
Request:
{
    "username": "string",
    "password": "string",
    "email": "string"
}

Response:
{
    "code": 200,
    "message": "success",
    "data": {
        "userId": "string",
        "token": "string"
    }
}
```

### 聊天相关接口
```java
/**
 * 发送消息
 * POST /api/v1/chat/send
 */
Request:
{
    "userId": "string",
    "message": "string",
    "modelType": "string"
}

Response:
{
    "code": 200,
    "message": "success",
    "data": {
        "messageId": "string",
        "response": "string",
        "timestamp": "string"
    }
}
```

## 更新日志

### v1.0.0 (2024-01-13)
- 初始版本发布
- 基础聊天功能实现
- 用户认证系统
- 多模型支持

### v1.1.0 (计划中)
- 添加语音输入支持
- 优化响应速度
- 增加更多AI模型选项
- 改进用户界面

## 贡献指南

### 提交规范
- feat: 新功能
- fix: 修复问题
- docs: 文档修改
- style: 代码格式修改
- refactor: 代码重构
- test: 测试用例修改
- chore: 其他修改

### 分支管理
- main: 主分支，用于生产环境
- develop: 开发分支
- feature/*: 功能分支
- hotfix/*: 紧急修复分支

## 常见问题

### 1. 安装问题
Q: 前端依赖安装失败怎么办？
A: 尝试清除npm缓存后重新安装：
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### 2. 运行问题
Q: 后端启动报数据库连接错误？
A: 检查数据库配置是否正确，确保MySQL服务正在运行：
```bash
sudo service mysql status
sudo service mysql start
```

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

```
MIT License

Copyright (c) 2024 AiDduo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...
```
