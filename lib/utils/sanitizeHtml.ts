// features/privacy/utils/sanitizeHtml.ts

const ALLOWED_TAGS = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "blockquote",
  "span",
  "div",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
]);

const DANGEROUS_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
  "select",
  "option",
  "textarea",
  "svg",
  "math",
  "meta",
  "link",
  "base",
  "template",
  "noscript",
  "frame",
  "frameset",
  "applet",
  "audio",
  "video",
  "source",
  "track",
];

const GLOBAL_ATTRS = new Set(["class"]);

const TAG_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan"]),
};

const SAFE_URL = /^(?:https?:\/\/|mailto:|tel:|\/|#)/i;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sanitizeUrl = (url: string): string => {
  const cleaned = url.trim().replace(/[\u0000-\u001F\s]/g, "");
  return SAFE_URL.test(cleaned) ? cleaned : "#";
};

const sanitizeAttributes = (rawAttrs: string, tag: string): string => {
  if (!rawAttrs || !rawAttrs.trim()) return "";

  const allowed = new Set([
    ...GLOBAL_ATTRS,
    ...(TAG_ATTRS[tag] ?? []),
  ]);

  const attrRegex =
    /([a-zA-Z_:][-\w:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

  const results: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    const name = match[1].toLowerCase();

    if (name.startsWith("on") || !allowed.has(name)) continue;

    const rawValue = match[2] ?? match[3] ?? match[4] ?? "";

    if (name === "href" || name === "src") {
      results.push(`${name}="${escapeHtml(sanitizeUrl(rawValue))}"`);
    } else if (name === "target") {
      results.push('target="_blank"');
    } else {
      results.push(`${name}="${escapeHtml(rawValue)}"`);
    }
  }

  if (tag === "a" && !results.some((attr) => attr.startsWith("rel="))) {
    results.push('rel="noopener noreferrer"');
  }

  return results.length ? ` ${results.join(" ")}` : "";
};

export const sanitizeHtml = (html: string): string => {
  if (!html) return "";

  let output = String(html).replace(/<!--[\s\S]*?-->/g, "");

  DANGEROUS_TAGS.forEach((tag) => {
    output = output
      .replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}\\s*>`, "gi"), "")
      .replace(new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi"), "");
  });

  output = output.replace(
    /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/gi,
    (_match, closing: string, rawTag: string, rawAttrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (closing) return `</${tag}>`;
      return `<${tag}${sanitizeAttributes(rawAttrs, tag)}>`;
    },
  );

  const allowedTagNames = [
    ...ALLOWED_TAGS,
  ].join("|");
  output = output.replace(
    new RegExp(`<(?!/?(?:${allowedTagNames})(?:\\s[^>]*)?/?>)`, "gi"),
    "&lt;",
  );

  return output;
};
