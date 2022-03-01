import { marked } from 'marked';

module.exports = (source: string) => {
  const htmlContent = marked.parse(source);

  return `module.exports = ${JSON.stringify(htmlContent)}`;
};
