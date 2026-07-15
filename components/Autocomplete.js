"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeText } from "@/lib/calculate";

export default function Autocomplete({
  id,
  value,
  onChange,
  onSubmit,
  options,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  const query = normalizeText(value.trim());
  const startsWith = [];
  const contains = [];
  if (query) {
    for (const option of options) {
      const candidates = [option.label, ...option.keys].map(normalizeText);
      if (candidates.some((c) => c.startsWith(query))) startsWith.push(option.label);
      else if (candidates.some((c) => c.includes(query))) contains.push(option.label);
    }
  }
  const suggestions = [...startsWith, ...contains].slice(0, 8);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectOption(label) {
    onChange(label);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleChange(e) {
    onChange(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e) {
    const showingSuggestions = isOpen && suggestions.length > 0;

    if (e.key === "ArrowDown" && showingSuggestions) {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
      return;
    }
    if (e.key === "ArrowUp" && showingSuggestions) {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Escape" && showingSuggestions) {
      setIsOpen(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (showingSuggestions && highlightedIndex >= 0) {
        selectOption(suggestions[highlightedIndex]);
      } else {
        setIsOpen(false);
        onSubmit?.();
      }
    }
  }

  return (
    <div className="autocomplete" ref={containerRef}>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen && suggestions.length > 0}
        aria-autocomplete="list"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((label, i) => (
            <li
              key={label}
              className={"autocomplete-option" + (i === highlightedIndex ? " is-active" : "")}
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(label);
              }}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
