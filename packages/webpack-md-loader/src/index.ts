import { marked } from 'marked';

module.exports = (source: string) => {
  const htmlContent = marked(source);

  return `module.exports = ${JSON.stringify(htmlContent)}`;
};
