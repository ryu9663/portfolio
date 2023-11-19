import ReactMarkdown from 'react-markdown';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import 'github-markdown-css/github-markdown-light.css';
import remarkGfm from 'remark-gfm';

export const Markdown = ({ markdown }: { markdown: string }) => {
  console.log(markdown);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(`${markdown}`);
      const data = await response.text();
      setMarkdownContent(data);
    };

    fetchMarkdown();
  });
  return (
    <div className={`${styles.markdown} markdown-body oction`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <>
                <SyntaxHighlighter language={match[1]} style={github}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </>
            ) : (
              <code {...props}>{children}</code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};
