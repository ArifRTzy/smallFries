import { useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Choose any theme

const CodeHighlighter = forwardRef(({ code, language = "javascript", className = "" }, ref) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <pre ref={ref} className={className}>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
});

CodeHighlighter.displayName = "CodeHighlighter";


// Define prop types for the component
CodeHighlighter.propTypes = {
  code: PropTypes.string.isRequired,     // `code` prop must be a string
  language: PropTypes.string,             // `language` prop can be a string (optional)
  className: PropTypes.string,            // `className` prop can be a string (optional)
};

export default CodeHighlighter;