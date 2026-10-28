import { Helmet } from "react-helmet-async";
import { COMPANY, SITE_URL } from "@/data/site";

export default function Seo({ title, description, path = "/", image = "/og-image.jpg", type = "website", jsonLd }) {
  const fullTitle = title ? `${title} | ${COMPANY.name}` : `${COMPANY.name} – Instrumentation Valves & Fittings Manufacturer, Chennai`;
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
