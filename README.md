# Bxmo-blog

#### 介绍
用 Vue3+Typescript 写一个博客

#### 软件架构
软件架构说明

1. 使用 UI： Ant-Design-Vue - 按需引入
2. Vue-Router
3. Vuex
4. Typescript
5. babel
6. eslint


#### 安装教程

1.  cd frontend
2.  npm install

#### 使用说明

1.  热启动 - npm run serve

#### 部署说明

部署项目，你首先需要在机器上安装 `docker` 和 `docker-compose `。

对于前端，你需要先进行构建发布

```bash
cd frontend
npm run build
cd ..
```

本前端项目采用 Docker + Nginx 方式部署

```bash
cd deploy
```

请检查 `docker-compose.yml` 文件，请将 volumes 设置成你的目录

```conf
version: '3'

services:  
  nginx: #服务名称
    image: nginx:latest
    ports:
    - 80:80
    volumes: # :Todo 将 : 左边的部分设置成你的本地文件夹
    - /home/xmo/Documents/Code/Project/bxmo-blog/frontend/dist:/usr/share/nginx/html
    - /home/xmo/Documents/Code/Project/bxmo-blog/default.conf:/etc/nginx/conf.d/default.conf
    privileged: true
```

然后，确保你在 `bxmo-blog` 目录。

```bash
docker-compose up -d
```

项目将在 `localhost` 或 `localhost:80` 地址上部署。

