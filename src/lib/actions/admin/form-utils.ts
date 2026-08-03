export function formToObject(formData: FormData, booleanFields: string[] = []): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  for (const field of booleanFields) {
    obj[field] = formData.get(field) === "on";
  }
  return obj;
}

export type ActionResult = { success: true } | { success: false; error: string };

/** Parses "Title | Description | Icon" lines (one per line) into objects. */
export function parsePipeList(raw: string, fields: string[]) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      const obj: Record<string, string> = {};
      fields.forEach((field, i) => {
        if (parts[i]) obj[field] = parts[i];
      });
      return obj;
    });
}

export function parseLines(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseTags(raw: string) {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
