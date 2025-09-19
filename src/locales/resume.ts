import type { Language } from '../contexts/LanguageContext';

type DescriptionItem = string | { text: string; items?: DescriptionItem[] };

export interface ResumeData {
  title: string;
  subtitle: string;
  sections: {
    workExperience: string;
    workExperienceTitle: string;
    freelance: string;
    education: string;
    contact: string;
  };
  experience: Array<{
    title: string;
    company?: string;
    period?: string;
    current?: boolean;
    description: DescriptionItem[];
  }>;
  freelance: Array<{
    title: string;
    company?: string;
    period?: string;
    current?: boolean;
    description: DescriptionItem[];
  }>;
  education: {
    degree: string;
    university: string;
    period: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export const resumeData: Record<Language, ResumeData> = {
  en: {
    title: 'Resume',
    subtitle: '',
    sections: {
      workExperienceTitle: 'Work Experience',
      workExperience: 'Corporate',
      freelance: 'Freelance',
      education: 'Education',
      contact: 'Contact',
    },
    experience: [
      {
        title: 'Mobile Game Platform Operations & Development / Full-Stack Engineer',
        company: 'DeNA Co., Ltd.',
        period: 'Jan 2025 - Present',
        current: true,
        description: [
          {
            text: 'Server-side development with Ruby on Rails + MySQL / Memcached + AWS / GCP services',
            items: [
              'Worker implementation',
              'API development and admin panel feature additions',
              'Database design with MySQL and ridgepole, query optimization through index design',
            ],
          },
          {
            text: 'SDK development with C++',
            items: [
              'Error protocol improvements',
              'HTTP foundation modifications',
              'Response parser implementation',
            ],
          },
          {
            text: 'API test application modifications with Unity + C#',
          },
        ],
      },
      {
        title: 'New Mobile Game / Game Client Engineer (Tech Lead)',
        company: 'DeNA Co., Ltd.',
        period: 'May 2024 - Dec 2024',
        description: [
          {
            text: 'Tech lead for large-scale mobile game title development',
            items: [
              'Development planning and task progress management for team members',
              'Coordination and technical alignment with partner companies and internal teams',
            ],
          },
          {
            text: 'Client-side development with Unity + C#',
            items: [
              'Architecture design (Clean Architecture), technology selection, and PoC',
              'UI, animation, and system logic implementation',
              'Foundation development (UI navigation, Addressable Asset System, localization)',
              'Fragment shader and animation implementation',
              'Performance tuning (parallelization, batching, rebuild control)',
            ],
          },
        ],
      },
      {
        title: 'New Business / Full-Stack Engineer',
        company: 'DeNA Co., Ltd.',
        period: 'Sep 2023 - May 2024',
        description: [
          {
            text: 'Client-side development with Unity + C# + C++',
            items: [
              'UI and system logic implementation using Clean Architecture',
              'Native plugin development with C++',
            ],
          },
          {
            text: 'Server-side development with Go + GCP (Cloud Run + Firestore)',
            items: ['Various API development', 'GCS deployment infrastructure improvements'],
          },
        ],
      },
      {
        title: 'PC + WebGL New Game / Full-Stack Engineer (Tech Lead)',
        company: 'DeNA Co., Ltd.',
        period: 'Sep 2022 - Sep 2023',
        description: [
          {
            text: 'Tech lead for new title development on Steam and live gaming platform (fingger)',
            items: [
              'Development planning and task progress management for team members',
              'GDPR compliance and Steam developer registration',
              'Management of 2 engineers',
            ],
          },
          {
            text: 'Client-side development with Unity (macOS, Windows, WebGL) + C#',
            items: [
              'Architecture design and technology selection',
              'Foundation development (UI navigation, Addressable Asset System)',
              'Out-game development and in-game prototype implementation',
            ],
          },
          {
            text: 'Server-side development with PlayFab + Azure Functions (C#)',
            items: ['Worker implementation (item grants/deletions, player data deletion/export)'],
          },
          {
            text: 'DevOps',
            items: [
              'Master data infrastructure development',
              'Steam integration implementation',
              'CI / CD pipeline implementation with GitHub Actions (Steam, fingger)',
            ],
          },
        ],
      },
      {
        title: 'WebGL New Game / Game Client Engineer (Tech Lead)',
        company: 'DeNA Co., Ltd.',
        period: 'Mar 2022 - Aug 2022',
        description: [
          'Tech lead for new game title for live gaming platform (fingger) using Unity',
          'Full out-game system implementation with Unity + C#',
          'Management of 2 engineers',
        ],
      },
      {
        title: 'Live Mobile Game Operations / Full-Stack Engineer (Tech Lead)',
        company: 'DeNA Co., Ltd.',
        period: 'Apr 2019 - Mar 2022',
        description: [
          {
            text: 'Tech lead for large-scale mobile game title operations',
            items: [
              'Development planning and task progress management for team members',
              'Coordination and technical alignment with partner companies and internal teams',
              'Incident response and various direction during failures',
              'Management of 10 engineers',
            ],
          },
          {
            text: 'Client-side development with Unity (Android, iOS) + C#',
            items: [
              'MVP / DDD maintenance',
              'Real-time multi-battle system implementation',
              'UI and animation implementation',
              'System logic implementation (missions, matching, GvG features)',
            ],
          },
          {
            text: 'Server-side development with Ruby on Rails + MySQL + on-premises',
            items: [
              'Matching algorithm and worker implementation',
              'API development (chat, GvG features) and admin panel feature additions',
              'Database design with MySQL and ridgepole, query optimization through index design',
            ],
          },
          {
            text: 'DevOps',
            items: [
              'CI / CD pipeline improvements with Jenkins',
              'Unity major upgrade (2018 LTS -> 2020 LTS)',
              'iOS / Android platform support and store review handling',
              'Build server construction and operations',
            ],
          },
        ],
      },
    ],
    freelance: [
      {
        title: 'Web3 New Game / Game Client Engineer',
        description: [
          {
            text: 'Client-side development with Unity (Android, iOS) + C#',
            items: [
              'Architecture design assistance and code review',
              'Various UI feature implementations',
              'In-App Purchase (IAP) functionality implementation',
              'System logic implementations (Gacha, Shop)',
              'Asset infrastructure implementation using Addressable Asset System',
              'AssetBundle build pipeline construction using GitHub Actions + GCS',
            ],
          },
        ],
      },
    ],
    education: {
      degree: 'Master of Science in Planetary Atmospheric Science',
      university: 'Okayama University Graduate School of Natural Science and Technology',
      period: '2017 - 2019',
    },
    contact: {
      email: 'contact[at]hashiiiii.com',
      github: 'github.com/hashiiiii',
      linkedin: 'linkedin.com/in/hashiiiii',
    },
  },
  ja: {
    title: 'Resume',
    subtitle: '',
    sections: {
      workExperienceTitle: '職歴',
      workExperience: '会社',
      freelance: '個人',
      education: '学歴',
      contact: '連絡先',
    },
    experience: [
      {
        title: 'モバイルゲーム向けプラットフォーム運用・開発 / フルスタックエンジニア',
        company: '株式会社ディー・エヌ・エー',
        period: '2025年1月 - 現在',
        current: true,
        description: [
          {
            text: 'Ruby on Rails + MySQL / Memcached + AWS / GCP 各種サービスによるサーバーサイド開発',
            items: [
              'ワーカーの実装',
              '各種 API 開発',
              'MySQL, ridgepole を用いたデータベース設計',
              'インデックス設計によるクエリの高速化やインメモリキャッシュを用いたオフロード等のパフォーマンスチューニング',
            ],
          },
          {
            text: 'C++ による SDK 開発',
            items: ['エラープロトコル改修', 'http 基盤の改修', 'レスポンス Parser の実装'],
          },
          {
            text: 'Unity + C# による API テストアプリ改修',
          },
        ],
      },
      {
        title: '新規モバイルゲーム / ゲームクライアントエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2024年5月 - 2024年12月',
        description: [
          {
            text: '大規模モバイルゲームタイトル開発におけるテックリード',
            items: [
              '開発計画の策定やメンバーに割り当てたタスクの進捗管理',
              '協業他社や社内の別チームとの連携や技術的な調整',
            ],
          },
          {
            text: 'Unity + C# によるクライアントサイド開発',
            items: [
              'アーキテクチャ設計（Clean Architecture）や技術選定, PoC',
              'UI, Animation や各種システムロジックの実装',
              '基盤開発（UI ナビゲーション基盤, Addressable Asset System を用いた Asset 基盤, Glocalization 基盤）',
              'Fragment Shader や Animation の実装',
              '各種パフォーマンスチューニング（並列化, バッチング, Rebuild 制御）',
            ],
          },
        ],
      },
      {
        title: '新規事業 / フルスタックエンジニア',
        company: '株式会社ディー・エヌ・エー',
        period: '2023年9月 - 2024年5月',
        description: [
          {
            text: 'Unity + C# + C++ によるクライアントサイド開発',
            items: [
              'Clean Architecture を用いた UI やシステムロジックの実装',
              'C++ を用いたネイティブプラグイン開発',
            ],
          },
          {
            text: 'Go + GCP（Cloud Run + Firestore）によるサーバーサイド開発',
            items: ['各種 API 開発', 'GCS へのデプロイ基盤の改修'],
          },
        ],
      },
      {
        title: 'PC + WebGL 新規ゲーム / フルスタックエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2022年9月 - 2023年9月',
        description: [
          {
            text: 'Steam, ライブゲーミングプラットフォーム（fingger）新規タイトル開発におけるテックリード',
            items: [
              '開発計画の策定やメンバーに割り当てたタスクの進捗管理',
              'GDPR 等法務対応や Steam への Developer 登録',
              'エンジニア2名のマネジメント',
            ],
          },
          {
            text: 'Unity（macOS, Windows, WebGL）+ C# によるクライアントサイド開発',
            items: [
              'アーキテクチャ設計, 技術選定, ',
              '基盤開発（UI ナビゲーション基盤, Addressable Asset System を用いた Asset 基盤）',
              'アウトゲーム開発とインゲームプロト実装',
            ],
          },
          {
            text: 'PlayFab + Azure Functions（C#）によるサーバーサイド開発',
            items: ['各種ワーカーの実装（アイテム付与や削除, プレイヤーデータ削除やエクスポート）'],
          },
          {
            text: 'DevOps',
            items: [
              'マスターデータ基盤開発',
              'Steam との Integration 対応',
              'Github Actions を用いた CI / CD（Steam, fingger）パイプラインの実装',
            ],
          },
        ],
      },
      {
        title: 'WebGL 新規ゲーム / ゲームクライアントエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2022年3月 - 2022年8月',
        description: [
          'Unity を用いたライブゲーミングプラットフォーム（fingger）向け新規ゲームタイトルのテックリード',
          'ゲームクライアント（Unity + C#）アウトゲーム全システムの実装',
          'エンジニア 2 名のマネジメント',
        ],
      },
      {
        title: '運用モバイルゲーム / フルスタックエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2019年4月 - 2022年3月',
        description: [
          {
            text: '大規模モバイルゲームタイトル運用におけるテックリード',
            items: [
              '開発計画の策定やメンバーに割り当てたタスクの進捗管理',
              '協業他社や社内の別チームとの連携や技術的な調整',
              '障害発生時の対応や各種ディレクション',
              'エンジニア 10 名のマネジメント',
            ],
          },
          {
            text: 'Unity（Android, iOS）+ C# によるクライアントサイド開発',
            items: [
              'MVP / DDD の保守',
              'リアルタイムマルチバトルシステムの実装',
              'UI や Animation の実装',
              '各種システムロジックの実装（ミッション, マッチング, GvG 系）',
            ],
          },
          {
            text: 'Ruby on Rails + MySQL + オンプレミス によるサーバーサイド開発',
            items: [
              'マッチングアルゴリズムやワーカーの実装',
              '各種 API 開発（チャット, GvG 系）や管理画面への機能追加',
              'MySQL, ridgepole を用いたデータベース設計, インデックス設計によるクエリの高速化',
            ],
          },
          {
            text: 'DevOps',
            items: [
              'Jenkins を用いた CI / CD パイプラインの改善',
              'Unity 大型アップデート対応（2018 LTS -> 2020 LTS）',
              'iOS / Android プラットフォーム対応、ストア審査対応',
              'ビルドサーバーの構築と運用',
            ],
          },
        ],
      },
    ],
    freelance: [
      {
        title: 'Web 3 新規ゲーム / ゲームクライアントエンジニア',
        description: [
          {
            text: 'Unity（Android, iOS）+ C# によるクライアントサイド開発',
            items: [
              'アーキテクチャの設計補助, コードレビュー',
              '各種 UI 機能の実装',
              'IAP（In-App Purchase）機能の実装',
              '各種システムロジックの実装（ガチャ, SHOP）',
              'Addressable Asset System を用いた Asset 基盤の実装',
              'Github Actions + GCS を用いた AssetBundle ビルドパイプラインの構築',
            ],
          },
        ],
      },
    ],
    education: {
      degree: '理学修士（惑星大気科学専攻）',
      university: '岡山大学大学院自然科学研究科',
      period: '2017年 - 2019年',
    },
    contact: {
      email: 'contact[at]hashiiiii.com',
      github: 'github.com/hashiiiii',
      linkedin: 'linkedin.com/in/hashiiiii',
    },
  },
};
