import type { Language } from '@/contexts/LanguageContext';

interface PrivacyData {
  title: string;
  lastUpdated: string;
  sections: {
    dataCollection: {
      title: string;
      description: string;
      items: string[];
    };
    googleAnalytics: {
      title: string;
      description: string;
      privacyFeatures: string[];
      linkText: string;
      linkDescription: string;
    };
    dataUsage: {
      title: string;
      description: string;
      purposes: string[];
    };
    dataSharing: {
      title: string;
      description: string;
    };
    cookies: {
      title: string;
      description: string;
      purposes: string[];
      note: string;
    };
    contact: {
      title: string;
      description: string;
    };
    changes: {
      title: string;
      description: string;
    };
  };
}

const privacyData: Record<Language, PrivacyData> = {
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日',
    sections: {
      dataCollection: {
        title: '収集する情報',
        description:
          '当サイトでは、サイトの改善とユーザー体験の向上のため、以下の情報を収集する場合があります：',
        items: [
          'アクセス状況（ページビュー、滞在時間など）',
          '使用デバイス・ブラウザの種類',
          'IP アドレス（匿名化済み）',
          'リファラー情報',
        ],
      },
      googleAnalytics: {
        title: 'Google Analytics',
        description:
          '当サイトでは、アクセス解析のために Google Analytics を使用しています。Google Analytics では以下の設定でプライバシーに配慮しています：',
        privacyFeatures: [
          'IP アドレスの匿名化を有効化',
          '広告パーソナライゼーションの無効化',
          'Google シグナルの無効化',
        ],
        linkText: 'Google のプライバシーポリシー',
        linkDescription: 'Google Analytics の詳細については、',
      },
      dataUsage: {
        title: 'データの使用目的',
        description: '収集したデータは以下の目的で使用します：',
        purposes: ['サイトの利用状況の分析', 'コンテンツの改善', '技術的な問題の特定と解決'],
      },
      dataSharing: {
        title: 'データの第三者提供',
        description:
          '収集したデータを第三者に提供することはありません。ただし、Google Analytics のサービス提供に必要な範囲で、Google にデータが送信されます。',
      },
      cookies: {
        title: 'Cookie について',
        description: '当サイトでは、以下の用途で Cookie を使用しています：',
        purposes: [
          'テーマ設定（ダーク/ライトモード）の保存',
          '言語設定の保存',
          'Google Analytics によるアクセス解析',
        ],
        note: 'ブラウザの設定で Cookie を無効にすることができますが、一部の機能が正常に動作しない場合があります。',
      },
      contact: {
        title: 'お問い合わせ',
        description:
          'プライバシーポリシーに関するご質問は、GitHub の Issue またはその他の連絡手段でお気軽にお問い合わせください。',
      },
      changes: {
        title: '変更について',
        description:
          'このプライバシーポリシーは、法令の変更やサービスの更新に伴い、事前の予告なく変更する場合があります。変更後のプライバシーポリシーは、このページに掲載した時点で効力を生じるものとします。',
      },
    },
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated',
    sections: {
      dataCollection: {
        title: 'Information We Collect',
        description:
          'We may collect the following information to improve our site and enhance user experience:',
        items: [
          'Access statistics (page views, session duration, etc.)',
          'Device and browser information',
          'IP addresses (anonymized)',
          'Referrer information',
        ],
      },
      googleAnalytics: {
        title: 'Google Analytics',
        description:
          'We use Google Analytics for website analytics with the following privacy-focused settings:',
        privacyFeatures: [
          'IP address anonymization enabled',
          'Advertising personalization disabled',
          'Google Signals disabled',
        ],
        linkText: "Google's Privacy Policy",
        linkDescription: 'For more details about Google Analytics, please refer to ',
      },
      dataUsage: {
        title: 'Data Usage Purpose',
        description: 'We use the collected data for the following purposes:',
        purposes: [
          'Analyzing website usage patterns',
          'Improving content quality',
          'Identifying and resolving technical issues',
        ],
      },
      dataSharing: {
        title: 'Data Sharing with Third Parties',
        description:
          'We do not share collected data with third parties. However, data may be transmitted to Google as necessary for Google Analytics service provision.',
      },
      cookies: {
        title: 'About Cookies',
        description: 'We use cookies for the following purposes:',
        purposes: [
          'Storing theme preferences (dark/light mode)',
          'Storing language preferences',
          'Google Analytics tracking',
        ],
        note: 'You can disable cookies in your browser settings, but some features may not function properly.',
      },
      contact: {
        title: 'Contact Us',
        description:
          'If you have any questions about this Privacy Policy, please feel free to contact us through GitHub Issues or other available communication channels.',
      },
      changes: {
        title: 'Changes to This Policy',
        description:
          'This Privacy Policy may be updated without prior notice due to legal changes or service updates. The updated Privacy Policy will take effect when posted on this page.',
      },
    },
  },
};

export function getPrivacyData(language: Language): PrivacyData {
  return privacyData[language];
}
