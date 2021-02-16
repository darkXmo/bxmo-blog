本文件用于作者本人使用 Jenkins 时用，不做额外注释，所以一般用户将无法看懂，也不用看本文件。

```bash
# 导出docker镜像
docker export <CONTAINER ID> > node_deploy_v1.tar
# 引入构建用docker镜像
cat node_deploy_v1.tar | docker import - vue/ubuntu:0.1
# 运行
docker run -d -p 8080:8080 -p 80:80 -it vue/ubuntu:0.1 /bin/bash
```
