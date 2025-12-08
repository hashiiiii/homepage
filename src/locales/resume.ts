import type { Language } from "../contexts/LanguageContext";

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
    title: "Resume",
    subtitle: "",
    sections: {
      workExperienceTitle: "Work Experience",
      workExperience: "Company",
      freelance: "Freelance",
      education: "Education",
      contact: "Contact",
    },
    experience: [
      {
        title: "Mobile Game Backend Platform Operations & Development",
        company: "DeNA Co., Ltd.",
        period: "January 2025 - Present",
        current: true,
        description: [
          {
            text: "Server development using Ruby on Rails",
            items: [
              "API development",
              "Database design and development using ActiveRecord + MySQL",
              "Implementation of Daemon and Batch processes",
              "Migration of legacy components",
              "Framework update support",
              "Monitoring and incident response",
            ],
          },
          {
            text: "SDK development using C++",
            items: ["Error protocol refactoring", "Middleware refactoring", "Response Parser implementation"],
          },
        ],
      },
      {
        title: "Unity (Android, iOS) New Mobile Game Title (Lead Engineer)",
        company: "DeNA Co., Ltd.",
        period: "May 2024 - December 2024",
        description: [
          {
            text: "Collaboration with numerous internal and external stakeholders",
            items: [
              "Coordination of role division and alignment of expectations with multiple partner companies",
              "Technical collaboration and coordination",
            ],
          },
          {
            text: "Architect experience in large-scale title development",
            items: ["Design based on Clean Architecture", "Various PoCs", "Technology selection including OSS"],
          },
          {
            text: "Implementation of various client infrastructure including middleware",
            items: [
              "Trading system",
              "Cache design and implementation",
              "UI infrastructure, middleware development using Addressable Asset System, Globalization",
              "Shader implementation",
              "Various performance tuning",
            ],
          },
        ],
      },
      {
        title: "New Service Development",
        company: "DeNA Co., Ltd.",
        period: "September 2023 - May 2024",
        description: [
          "Unity client development using Clean Architecture",
          "C++ native plugin development",
          "Server development using Go + GCP managed services",
        ],
      },
      {
        title: "Unity (PC + WebGL) New Game Title (Lead Engineer)",
        company: "DeNA Co., Ltd.",
        period: "September 2022 - September 2023",
        description: [
          {
            text: "Handling wide-ranging requirements including non-engineering domains",
            items: [
              "Development planning, task assignment to members, and progress management",
              "Internal and external coordination including partner companies",
              "Compliance with legal requirements such as GDPR",
              "Steam developer registration support",
            ],
          },
          "Support for a wide range of platforms (macOS, Windows, WebGL)",
          {
            text: "Client development including middleware implementation and technology selection",
            items: [
              "Architecture design, technology selection",
              "UI navigation infrastructure",
              "Middleware development using Addressable Asset System",
              "Overall out-game development",
              "In-game prototype implementation",
            ],
          },
          {
            text: "Server development using PlayFab + Azure Functions (C#)",
            items: [
              "Implementation of functionality not present in PlayFab (item granting, deletion, player data deletion, export)",
            ],
          },
          {
            text: "DevOps",
            items: [
              "CI/CD pipeline construction using Github Actions",
              "Master data build and deployment to PlayFab",
              "ROM build and deployment to Steam platform",
            ],
          },
        ],
      },
      {
        title: "Unity (WebGL) New Game Title (Lead Engineer)",
        company: "DeNA Co., Ltd.",
        period: "March 2022 - August 2022",
        description: [
          "New game title for live gaming platform (fingger) using Unity (WebGL)",
          "Casual game",
          "Overall out-game development on the client side",
        ],
      },
      {
        title: "Unity (Android, iOS) Live Mobile Game Title (Lead Engineer)",
        company: "DeNA Co., Ltd.",
        period: "April 2019 - March 2022",
        description: [
          {
            text: "Lead engineer experience on a large-scale title",
            items: [
              "Management of approximately 10 engineers",
              "Development planning, task assignment to members, and progress management",
              "Internal and external coordination including partner companies",
              "Direction during incidents",
            ],
          },
          {
            text: "Overall client development",
            items: [
              "Implementation using MVP + DDD based design",
              "Real-time PvP system implementation",
              "UI and Animation implementation",
            ],
          },
          {
            text: "Server development using Ruby on Rails",
            items: [
              "Implementation of GvG grouping system based on rank rating",
              "API development (chat, GvG)",
              "Adding various features to operation management screen",
              "Database design and development using ActiveRecord + MySQL",
            ],
          },
          {
            text: "DevOps",
            items: [
              "CI/CD pipeline construction and improvement using Jenkins",
              "Unity major update support (2018 LTS -> 2020 LTS)",
            ],
          },
        ],
      },
    ],
    freelance: [
      {
        title: "Web3 New Game Title",
        description: [
          {
            text: "Client development using Unity (Android, iOS) + C#",
            items: [
              "Architecture design assistance, code review",
              "Implementation of various UI features",
              "IAP (In-App Purchase) feature implementation",
              "Implementation of various system logic (Gacha, SHOP)",
              "Asset infrastructure implementation using Addressable Asset System",
              "AssetBundle build pipeline construction using Github Actions + GCS",
            ],
          },
        ],
      },
    ],
    education: {
      degree: "Master of Science (Planetary Atmospheric Science)",
      university: "Graduate School of Natural Science and Technology, Okayama University",
      period: "2017 - 2019",
    },
    contact: {
      email: "contact[at]hashiiiii.com",
      github: "github.com/hashiiiii",
      linkedin: "linkedin.com/in/hashiiiii",
    },
  },
  ja: {
    title: "Resume",
    subtitle: "",
    sections: {
      workExperienceTitle: "職歴",
      workExperience: "会社",
      freelance: "個人",
      education: "学歴",
      contact: "連絡先",
    },
    experience: [
      {
        title: "モバイルゲーム向けバックエンドプラットフォーム運用・開発",
        company: "株式会社ディー・エヌ・エー",
        period: "2025年1月 - 現在",
        current: true,
        description: [
          {
            text: "Ruby on Rails によるサーバー開発",
            items: [
              "各種 API 開発",
              "ActiveRecord + MySQL を利用した DB 設計, 開発",
              "Daemon や Batch の実装",
              "各種レガシーコンポーネントの移行",
              "Framework のアップデート対応",
              "各種監視, 障害対応",
            ],
          },
          {
            text: "C++ を用いた SDK 開発",
            items: ["エラープロトコルの改修", "ミドルウェアの改修", "レスポンス Parser の実装"],
          },
        ],
      },
      {
        title: "Unity (Android, iOS) 新規モバイルゲームタイトル (リードエンジニア)",
        company: "株式会社ディー・エヌ・エー",
        period: "2024年5月 - 2024年12月",
        description: [
          {
            text: "社内外の多数のステークホルダーとの連携",
            items: ["複数の協業各社との役務分担の取り決めや期待値のすり合わせ", "技術的な連携や調整"],
          },
          {
            text: "大規模タイトル開発でのアーキテクト経験",
            items: ["Clean Architecture をベースにした設計", "各種 PoC", "各種 OSS 等を含む技術選定"],
          },
          {
            text: "ミドルウェアを含む各種クライアント基盤の実装",
            items: [
              "取引システム",
              "キャッシュ設計と実装",
              "UI 基盤, Addressable Asset System を用いたミドルウェア開発, Globalization",
              "Shader の実装",
              "各種パフォーマンスチューニング",
            ],
          },
        ],
      },
      {
        title: "新規サービス開発",
        company: "株式会社ディー・エヌ・エー",
        period: "2023年9月 - 2024年5月",
        description: [
          "Clean Architecture を用いた Unity クライアント開発",
          "C++ ネイティブプラグイン開発",
          "Go + GCP の各種マネージドサービスを用いたサーバー開発",
        ],
      },
      {
        title: "Unity (PC + WebGL) 新規ゲームタイトル (リードエンジニア)",
        company: "株式会社ディー・エヌ・エー",
        period: "2022年9月 - 2023年9月",
        description: [
          {
            text: "非エンジニア領域を含む幅広い要件への対応",
            items: [
              "開発計画の策定やメンバーへの割り振り, タスクの進捗管理",
              "協業他社を含む、社内外との連携や調整",
              "GDPR 等の法務要件への対応",
              "Steam へのデベロッパー登録対応",
            ],
          },
          "幅広いプラットフォームへの対応 (macOS, Windows, WebGL)",
          {
            text: "各種ミドルウェアの実装や技術選定を含めたクライアント開発",
            items: [
              "アーキテクチャ設計, 技術選定",
              "UI ナビゲーション基盤",
              "Addressable Asset System を利用したミドルウェアの開発",
              "アウトゲーム開発全般",
              "インゲームのプロトタイプ実装",
            ],
          },
          {
            text: "PlayFab + Azure Functions (C#) を用いたサーバー開発",
            items: ["PlayFab に存在しない機能要件 (アイテム付与, 削除, プレイヤーデータの削除, エクスポート) の実装"],
          },
          {
            text: "DevOps",
            items: [
              "Github Actions を用いた CI/CD パイプラインの構築",
              "マスターデータのビルド, PlayFab へのデプロイ",
              "ROM のビルド, Steam プラットフォームへのデプロイ",
            ],
          },
        ],
      },
      {
        title: "Unity (WebGL) 新規ゲームタイトル (リードエンジニア)",
        company: "株式会社ディー・エヌ・エー",
        period: "2022年3月 - 2022年8月",
        description: [
          "Unity (WebGL) を用いたライブゲーミングプラットフォーム (fingger) 向け新規ゲームタイトル",
          "カジュアルゲーム",
          "クライアントのアウトゲーム開発全般",
        ],
      },
      {
        title: "Unity (Android, iOS) 運用モバイルゲームタイトル (リードエンジニア)",
        company: "株式会社ディー・エヌ・エー",
        period: "2019年4月 - 2022年3月",
        description: [
          {
            text: "大規模タイトルでのリードエンジニア経験",
            items: [
              "エンジニア 10 名規模のマネジメント",
              "開発計画の策定やメンバーへの割り振り, タスクの進捗管理",
              "協業他社を含む、社内外との連携や調整",
              "障害発生時の各種ディレクション",
            ],
          },
          {
            text: "クライアント開発全般を担当",
            items: ["MVP + DDD ベースの設計を用いた実装", "リアルタイム PvP システムの実装", "UI や Animation の実装"],
          },
          {
            text: "Ruby on Rails によるサーバー開発",
            items: [
              "ランクレーティングに応じた GvG のグルーピングシステムの実装",
              "各種 API 開発 (チャット, GvG)",
              "Operation 管理画面への各種機能追加",
              "ActiveRecord + MySQL を利用した DB 設計, 開発",
            ],
          },
          {
            text: "DevOps",
            items: [
              "Jenkins を用いた CI/CD パイプラインの構築, 改善",
              "Unity 大型アップデート対応 (2018 LTS -> 2020 LTS)",
            ],
          },
        ],
      },
    ],
    freelance: [
      {
        title: "Web 3 新規ゲームタイトル",
        description: [
          {
            text: "Unity (Android, iOS) によるクライアント開発",
            items: [
              "アーキテクチャの設計補助, コードレビュー",
              "各種 UI 機能の実装",
              "IAP (In-App Purchase) 機能の実装",
              "各種システムロジックの実装 (ガチャ, SHOP)",
              "Addressable Asset System を用いた Asset ミドルウェアの実装",
              "Github Actions + GCS を用いた AssetBundle ビルドパイプラインの構築",
            ],
          },
        ],
      },
    ],
    education: {
      degree: "理学修士（惑星大気科学専攻）",
      university: "岡山大学大学院自然科学研究科",
      period: "2017年 - 2019年",
    },
    contact: {
      email: "contact[at]hashiiiii.com",
      github: "github.com/hashiiiii",
      linkedin: "linkedin.com/in/hashiiiii",
    },
  },
};
