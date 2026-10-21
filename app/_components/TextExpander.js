"use client";

import { useState } from "react";

function TextExpander({ children, collapsedNumWords = 40 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (typeof children !== "string") {
    return children;
  }

  const words = children.split(" ");

  if (words.length <= collapsedNumWords) return children;

  const displayText = isExpanded
    ? children
    : words.slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;