import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = React.useState(false);

  return (
    <CodeBlockContainer suppressHydrationWarning={true}>
      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <CopyButton>{copied ? "Copied!" : "Copy"}</CopyButton>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={dark}>
        {value}
      </SyntaxHighlighter>
    </CodeBlockContainer>
  );
};

const CustomMarkdown = ({ children }) => (
  <ReactMarkdown
    suppressHydrationWarning={true}
    children={children}
    components={{
      code({ node, inline, className, children, ...props }) {
        const language = className?.replace("language-", "") || "";
        return !inline ? (
          <CodeBlock
            language={language}
            value={String(children).replace(/\n$/, "")}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  />
);

// Styled components
const CodeBlockContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  border-radius: 4px;
  background: #f5f5f5;
  overflow-x: auto;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default CustomMarkdown;
