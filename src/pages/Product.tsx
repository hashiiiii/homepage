import type React from "react";
import { fetchProductData } from "@/lib/product";
import { productConfig } from "../config/product";
import { useTranslation } from "../contexts/LanguageContext";
import { usePageTitle } from "../hooks/usePageTitle";

export const Product: React.FC = () => {
  const { language } = useTranslation();
  const data = fetchProductData(language);

  usePageTitle(data.title || "Product");

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8 sm:mb-12">
        <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{data.title}</h1>
      </div>

      {/* Open Source Projects Section */}
      <section className="mb-12 sm:mb-16">
        <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">{data.sections.ossProjects}</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {data.ossProjects.map((project) => (
            <article key={project.id} className="card group">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-tn-fg-primary transition-colors group-hover:text-tn-blue">
                  {project.name}
                </h3>
                {productConfig.showStars && project.stars !== undefined && (
                  <div className="flex items-center gap-1 text-tn-yellow">
                    <span>⭐</span>
                    <span className="text-sm">{project.stars}</span>
                  </div>
                )}
              </div>

              <p className="mb-4 text-tn-fg-secondary">{project.description}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="tag">{project.language}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link flex items-center gap-2"
                  >
                    <span>{data.labels.github}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Presentations Section */}
      {data.presentations.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">{data.sections.presentations}</h2>
          <div className="space-y-4 sm:space-y-6">
            {data.presentations.map((presentation) => (
              <article key={presentation.id} className="card">
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-semibold text-tn-fg-primary">{presentation.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-tn-fg-secondary">
                    <span>{presentation.event}</span>
                    <span>•</span>
                    <span>
                      {new Date(presentation.date).toLocaleDateString(language === "ja" ? "ja-JP" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-tn-fg-secondary">{presentation.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {presentation.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {presentation.slidesUrl && (
                    <a
                      href={presentation.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link flex items-center gap-2"
                    >
                      <span>{data.labels.slides}</span>
                      <span>↗</span>
                    </a>
                  )}
                  {presentation.videoUrl && (
                    <a
                      href={presentation.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link flex items-center gap-2"
                    >
                      <span>{data.labels.video}</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
