import { Language } from '../contexts/LanguageContext'

type DescriptionItem = string | { text: string; items?: DescriptionItem[] }

export interface ResumeData {
  title: string
  subtitle: string
  sections: {
    workExperience: string
    education: string
    contact: string
  }
  experience: Array<{
    title: string
    company: string
    period: string
    current?: boolean
    description: DescriptionItem[]
  }>
  education: {
    degree: string
    university: string
    period: string
  }
  contact: {
    email: string
    github: string
    linkedin: string
  }
}

export const resumeData: Record<Language, ResumeData> = {
  en: {
    title: 'Resume',
    subtitle: '',
    sections: {
      workExperience: 'Work Experience',
      education: 'Education',
      contact: 'Contact',
    },
    experience: [
      {
        title: 'Game Developer (Client & Backend & SDK)',
        company: 'DeNA Co., Ltd.',
        period: 'May 2024 - Present',
        current: true,
        description: [
          'Developing new game title with Unity (iOS/Android, Clean Architecture)',
          'Backend development with Ruby on Rails, Go, AWS, GCP',
          'SDK development using C# and C++',
          'CI/CD implementation with GitHub Actions and Jenkins',
        ],
      },
      {
        title: 'Full-Stack Developer (New Business)',
        company: 'DeNA Co., Ltd.',
        period: 'Sep 2023 - May 2024',
        description: [
          'Built new service using Unity + Cloud Run (Go) + Firestore',
          'Handled both client and backend development',
          'Implemented video streaming features end-to-end',
        ],
      },
      {
        title: 'Game Developer (New Title)',
        company: 'DeNA Co., Ltd.',
        period: 'Sep 2022 - Sep 2023',
        description: [
          'Developed PC game (Unity for MacOS/Windows) using PlayFab + Azure Functions (C#)',
          'Technology selection, architecture design, and infrastructure development',
          'Handled out-game development and in-game prototyping',
          'GDPR compliance and international business development',
        ],
      },
      {
        title: 'Lead Engineer (WebGL Game)',
        company: 'DeNA Co., Ltd.',
        period: 'Mar 2022 - Aug 2022',
        description: [
          'Led development of Unity (WebGL) game for live gaming platform',
          'Implemented entire out-game system single-handedly',
          'Managed team of 2 engineers and coordinated with project managers',
        ],
      },
      {
        title: 'Game Developer & Team Lead',
        company: 'DeNA Co., Ltd.',
        period: 'Apr 2019 - Mar 2022',
        description: [
          'Developed client (Unity/C#) and backend (Ruby on Rails) for live game (multi-hundred million yen monthly revenue)',
          'Led engineering team as Lead Engineer',
          'Handled Unity upgrades, platform adaptations (iOS/Android), and emergency operations',
          'Improved CI/CD pipelines using Jenkins',
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
      workExperience: '職歴',
      education: '学歴',
      contact: '連絡先',
    },
    experience: [
      {
        title: 'ゲーム開発者（クライアント・バックエンド・SDK）',
        company: '株式会社ディー・エヌ・エー',
        period: '2024年5月 - 現在',
        current: true,
        description: [
          'Unity（iOS/Android、Clean Architecture）を用いた新規ゲームタイトル開発',
          'Ruby on Rails、Go、AWS、GCPによるバックエンド開発',
          'C#、C++を使用したSDK開発',
          'GitHub Actions、Jenkinsを用いたCI/CD実装',
        ],
      },
      {
        title: 'フルスタック開発者（新規事業）',
        company: '株式会社ディー・エヌ・エー',
        period: '2023年9月 - 2024年5月',
        description: [
          'Unity + Cloud Run（Go）+ Firestoreを使った新規サービス開発',
          'クライアント・バックエンド両方の開発を担当',
          'ビデオストリーミング機能を一気通貫で実装',
        ],
      },
      {
        title: 'ゲーム開発者（新規タイトル）',
        company: '株式会社ディー・エヌ・エー',
        period: '2022年9月 - 2023年9月',
        description: [
          'Unity（MacOS/Windows）+ PlayFab + Azure Functions（C#）を使ったPCゲーム開発',
          '技術選定、設計・基盤開発を担当',
          'アウトゲーム開発とインゲームプロト実装',
          'GDPR等法務対応と海外企業との会社Developer登録',
        ],
      },
      {
        title: 'WebGLゲーム / ゲームクライアントエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2022年3月 - 2022年8月',
        description: [
          'Unity を用いたライブゲーミングプラットフォーム（fingger）向け新規ゲームタイトルのテックリード',
          'ゲームクライアント（Unity + C#）アウトゲーム全システムを単独で実装',
          'エンジニア2名のマネジメントとプロジェクトマネージャーとの連携',
        ],
      },
      {
        title: 'モバイルゲーム / フルスタックエンジニア（テックリード）',
        company: '株式会社ディー・エヌ・エー',
        period: '2019年4月 - 2022年3月',
        description: [
          {
            text: '月売上数億円規模のモバイルゲーム運用におけるテックリード',
            items: [
              'エンジニア10名のチームマネジメント、技術選定、アーキテクチャ設計',
              '大型アップデートのプロジェクト推進（マルチバトル、ギルド戦機能）',
            ]
          },
          {
            text: 'フルスタック開発',
            items: [
              {
                text: 'Unity/C#によるゲームクライアント開発',
                items: [
                  'MVP/DDDアーキテクチャの導入と保守',
                  'リアルタイムマルチバトルシステムの実装（WebSocket、最大8人同時対戦）',
                  'パフォーマンス最適化（Draw Call削減、メモリ使用量40%削減）'
                ]
              },
              {
                text: 'Ruby on Railsによるサーバーサイド開発',
                items: [
                  'マッチングシステムのアルゴリズム改善（マッチング時間を平均30秒→10秒に短縮）',
                  'MySQL/Redisを用いたデータベース設計・チューニング',
                  'オンプレミス環境での高負荷対策（同時接続10万人対応）'
                ]
              }
            ]
          },
          {
            text: '開発基盤・運用改善',
            items: [
              'Jenkinsを用いたCI/CDパイプラインの構築・改善（ビルド時間を60分→20分に短縮）',
              'Unity大型アップデート対応（2018 LTS → 2020 LTS、ダウンタイムゼロ）',
              'iOS/Androidプラットフォーム対応、ストア審査対応'
            ]
          }
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
}