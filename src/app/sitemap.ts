import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chatio.tech",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://chatio.tech/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://chatio.tech/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
