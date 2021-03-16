import { Random } from "mockjs";

export default (): string => {
  return `
## ${Random.ctitle()}

${Random.csentence()}

#### ${Random.ctitle()}

${Random.csentence()}

##### ${Random.ctitle()}

> 1. ${Random.csentence()}
> 2. ${Random.csentence()}
> 3. ${Random.csentence()}
> 4. ${Random.csentence()}
> 5. ${Random.csentence()}
> 6. ${Random.csentence()}

##### ${Random.ctitle()}

依照[文章](https://juejin.cn/post/6845166890373873677)

> 1. [husky](https://github.com/typicode/husky)
> 2. [lint-staged](https://github.com/okonet/lint-staged)
> 3. [commitlint](https://github.com/conventional-changelog/commitlint)
> 4. [commitizen](https://github.com/commitizen/cz-cli)
> 5. [conventional-changelog](https://github.com/ajoslin/conventional-changelog)

#### ${Random.ctitle()}

1. \`\`\`bash
   cd ${Random.word()}
   \`\`\`

2. \`\`\`bash
   npm ${Random.word()}
   \`\`\`

#### ${Random.ctitle()}

1. 热启动

   \`\`\`bash
   npm run ${Random.word()}
   \`\`\`

#### ${Random.ctitle()}

部署项目，你首先需要在机器上安装 \`${Random.word()}\` 和 \`${Random.word()}-compose \`。

${Random.cparagraph()}

\`\`\`bash
cd frontend
npm ${Random.word()} ${Random.word()}
cd ..
\`\`\`

${Random.cparagraph()}

\`\`\`bash
cd deploy
\`\`\`

请检查 \`docker-${Random.word()}.yml\` 文件，请将 volumes 设置成你的目录，以 \`bxmo-blog\` 为基准

\`\`\`yml
${Random.word()}n: "3"

${Random.word()}s:
  nginx: #服务名称
  ${Random.word()}: nginx:latest
    ${Random.word()}_${Random.word()}: bxmo-blog-${Random.word()}
    ${Random.word()}:
      - 80:80
      ${Random.word()}: # 相对路径
      - ../frontend/dist:/usr/share/nginx/html
      - ./default.conf:/etc/nginx/conf.d/default.conf
      ${Random.word()}: true
\`\`\`

然后，确保你在 \`bxmo-blog\` 目录。${Random.cparagraph()}

## ${Random.ctitle()}

\`\`\`bash
docker-${Random.word()} ${Random.word()} -d
\`\`\`

项目将在 \`${Random.word()}\` 或 \`${Random.word()}:${Random.integer()}\` 地址上部署。${Random.cparagraph()}

> ${Random.cparagraph()}
>
> \`\`\`bash
> docker-compose ${Random.word()} -d --${Random.word()}-${Random.word()}
> \`\`\`
>
> 来进行构建

${Random.cparagraph()}执行 \`npm run ${Random.word()}\` + \`${Random.word()}-${Random.word()} up -d\`。

\`\`\`bash
# /bxmo-${Random.word()}
cd ./deploy
bash ${Random.word()}.sh
\`\`\`

##### ${Random.ctitle()}

\`\`\`bash
${Random.word()} ${Random.word()} stop bxmo-blog-frontend
\`\`\`

##### ${Random.ctitle()}

\`\`\`bash
docker ${Random.word()} ${Random.word()} # 这个命令实际上会删除所有终止的容器
\`\`\`

##### ${Random.ctitle()}

\`\`\`bash
docker exec -it ${Random.word()} bash
\`\`\`

### ${Random.ctitle()}

${Random.cparagraph()} - \`${Random.word()}:${Random.word()}:0.1\` ，

${Random.cparagraph()} \`${Random.word()}\` 。

## ${Random.ctitle()}

\`\`\`sh
cd frontend
npm ${Random.word()} --production
sudo npm run ${Random.word()}
sudo cp -af dist/. /${Random.word()}/${Random.word()}/${Random.word()}
\`\`\`

### ${Random.ctitle()}

${Random.cparagraph()} ${Random.word()} 的 Commit ${Random.word()} 格式。

用 \`npm run ${Random.word()}\` 代替 \`${Random.word()} commit\` ，${Random.cword()}的 \`commit\` 内容。

\`\`\`bash
git ${Random.word()} .
npm run commit
\`\`\`

#### ${Random.ctitle()}

\`\`\`bash
npm run ${Random.word()}
\`\`\``;
};
