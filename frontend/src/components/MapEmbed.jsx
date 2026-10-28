export default function MapEmbed({ title, query, testid }) {
  return (
    <div data-testid={testid} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <iframe
        title={`${title} – Win Process Control Engineering location map`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="h-64 w-full border-0 md:h-72"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="font-semibold text-foreground">{title}</span>
        <a
          data-testid={`${testid}-directions`}
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          Get directions →
        </a>
      </div>
    </div>
  );
}
