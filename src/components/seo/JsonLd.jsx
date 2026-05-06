// Schema spec version: 2026-05-06

export default function JsonLd({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);
  if (!items.length) return null;
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // XSS hardening: prevent `</script>` breakouts inside string values.
        __html: JSON.stringify(item).replace(/<\//g, '<\\/'),
      }}
    />
  ));
}
