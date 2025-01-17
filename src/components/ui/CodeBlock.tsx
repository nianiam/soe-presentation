"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({
  children,
  customStyle,
  language = "tsx",
  codeTagProps,
  ...props
}: React.ComponentProps<typeof SyntaxHighlighter>) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        width: "100%",
        fontSize: "1.75rem",
        height: "100%",
        ...customStyle,
      }}
      codeTagProps={{ className: "max-h-full", ...codeTagProps }}
      language={language}
      style={oneDark}
      showLineNumbers
      wrapLines
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  );
};
