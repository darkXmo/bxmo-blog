import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const preCode = hljs.highlight(lang, str, true).value;
        // 以换行进行分割
        const lines = preCode.split(/\n/).slice(0, -1);
        // 添加自定义行号
        let html = lines
          .map((item: string, index: number) => {
            return (
              '<li><span class="line-num" data-line="' +
              (index + 1) +
              '"></span>' +
              item +
              "</li>"
            );
          })
          .join("");
        html = "<ol>" + html + "</ol>";
        if (lines.length) {
          html += '<b class="name">' + lang + "</b>";
        }
        return '<pre class="hljs"><code>' + html + "</code></pre>";
      } catch (__) {
        console.log(__);
      }
    }
    const preCode = md.utils.escapeHtml(str);
    const lines = preCode.split(/\n/).slice(0, -1);
    let html = lines
      .map((item: string, index: number) => {
        return (
          '<li><span class="line-num" data-line="' +
          (index + 1) +
          '"></span>' +
          item +
          "</li>"
        );
      })
      .join("");
    html = "<ol>" + html + "</ol>";
    return '<pre class="hljs"><code>' + html + "</code></pre>";
  },
});

export default (rawStr: string) => {
  return md.render(rawStr);
};
