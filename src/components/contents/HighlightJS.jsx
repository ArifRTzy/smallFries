import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Choose any theme

const CodeHighlighter = ({ code, language = "javascript", className = "" }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <pre className={className}>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
};

// Define prop types for the component
CodeHighlighter.propTypes = {
  code: PropTypes.string.isRequired,     // `code` prop must be a string
  language: PropTypes.string,             // `language` prop can be a string (optional)
  className: PropTypes.string,            // `className` prop can be a string (optional)
};

export default CodeHighlighter;