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