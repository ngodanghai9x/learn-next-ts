export default function formatQueryValue(query: string | string[] | undefined): string {
  return (Array.isArray(query) ? query[0] : query) ?? '';
}
