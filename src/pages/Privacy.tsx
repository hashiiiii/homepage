import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useTranslation } from '../contexts/LanguageContext';
import { getPrivacyData } from '@/locales/privacy';

export function Privacy() {
  const { language } = useTranslation();
  const data = getPrivacyData(language);

  usePageTitle(data.title);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-tn-fg-primary">{data.title}</h1>

        <div className="prose prose-invert max-w-none">
          <p className="mb-6 text-tn-fg-secondary">
            {data.lastUpdated}: {formatDate(new Date())}
          </p>

          {/* データ収集 */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.dataCollection.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.dataCollection.description}</p>
            <ul className="mb-4 list-disc pl-6 text-tn-fg-secondary">
              {data.sections.dataCollection.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Google Analytics */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.googleAnalytics.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.googleAnalytics.description}</p>
            <ul className="mb-4 list-disc pl-6 text-tn-fg-secondary">
              {data.sections.googleAnalytics.privacyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="mb-4 text-tn-fg-secondary">
              {data.sections.googleAnalytics.linkDescription}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tn-blue hover:underline"
              >
                {data.sections.googleAnalytics.linkText}
              </a>
              {language === 'ja' ? 'をご確認ください。' : '.'}
            </p>
          </section>

          {/* データ使用目的 */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.dataUsage.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.dataUsage.description}</p>
            <ul className="mb-4 list-disc pl-6 text-tn-fg-secondary">
              {data.sections.dataUsage.purposes.map((purpose, index) => (
                <li key={index}>{purpose}</li>
              ))}
            </ul>
          </section>

          {/* データの第三者提供 */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.dataSharing.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.dataSharing.description}</p>
          </section>

          {/* Cookie */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.cookies.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.cookies.description}</p>
            <ul className="mb-4 list-disc pl-6 text-tn-fg-secondary">
              {data.sections.cookies.purposes.map((purpose, index) => (
                <li key={index}>{purpose}</li>
              ))}
            </ul>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.cookies.note}</p>
          </section>

          {/* お問い合わせ */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.contact.title}
            </h2>
            <p className="mb-4 text-tn-fg-secondary">{data.sections.contact.description}</p>
          </section>

          {/* 変更について */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-tn-fg-primary">
              {data.sections.changes.title}
            </h2>
            <p className="text-tn-fg-secondary">{data.sections.changes.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
