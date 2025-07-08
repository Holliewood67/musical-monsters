import sanitize from "sanitize-html";

export function sanitizeDescription(html: string): string {
  return sanitize(html, {
    allowedTags: ["a", "br", "strong", "em", "b", "i", "u"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    transformTags: {
      a: sanitize.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  });
}

export function sanitizeOGDescription(html: string): string {
  const noTags = sanitize(html, { allowedTags: [], allowedAttributes: {} });
  return noTags.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}