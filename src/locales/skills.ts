import { Language } from '../contexts/LanguageContext'

export interface SkillCategory {
  category: string
  skills: string[]
  color: string
}

export interface SkillsData {
  title: string
  categories: SkillCategory[]
}

export const skillsData: Record<Language, SkillsData> = {
  en: {
    title: 'Technical Skills',
    categories: [
      {
        category: 'Languages',
        skills: ['C#', 'Ruby', 'C++', 'Go', 'HLSL / GLSL'],
        color: 'bg-tn-blue/10 text-tn-blue border-tn-blue/20',
      },
      {
        category: 'Game Development',
        skills: ['Unity', 'Clean Architecture', 'MVP / DDD', 'Addressable Asset System', 'IAP', 'WebGL', 'Photon', 'Steam', 'fingger'],
        color: 'bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20',
      },
      {
        category: 'Backend & Frameworks',
        skills: ['Ruby on Rails', 'MySQL', 'Redis', 'ridgepole', 'PlayFab', 'Azure Functions'],
        color: 'bg-tn-green/10 text-tn-green border-tn-green/20',
      },
      {
        category: 'Cloud & Infrastructure',
        skills: ['AWS', 'GCP', 'On-premises'],
        color: 'bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20',
      },
      {
        category: 'DevOps & Tools',
        skills: ['GitHub Actions', 'Jenkins', 'CI / CD', 'GDPR Compliance', 'Build Systems'],
        color: 'bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20',
      },
      {
        category: 'Leadership & Expertise',
        skills: ['Tech Lead', 'Team Management (2-10 engineers)', 'Architecture Design', 'Performance Optimization'],
        color: 'bg-tn-red/10 text-tn-red border-tn-red/20',
      },
    ],
  },
  ja: {
    title: '技術スキル',
    categories: [
      {
        category: 'プログラミング言語',
        skills: ['C#', 'Ruby', 'C++', 'Go', 'HLSL / GLSL'],
        color: 'bg-tn-blue/10 text-tn-blue border-tn-blue/20',
      },
      {
        category: 'ゲーム開発',
        skills: ['Unity', 'Clean Architecture', 'MVP / DDD', 'Addressable Asset System', 'IAP', 'WebGL', 'Photon', 'Steam', 'fingger'],
        color: 'bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20',
      },
      {
        category: 'バックエンド・フレームワーク',
        skills: ['Ruby on Rails', 'MySQL', 'Redis', 'ridgepole', 'PlayFab', 'Azure Functions'],
        color: 'bg-tn-green/10 text-tn-green border-tn-green/20',
      },
      {
        category: 'クラウド・インフラ',
        skills: ['AWS', 'GCP', 'オンプレミス'],
        color: 'bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20',
      },
      {
        category: 'DevOps・ツール',
        skills: ['GitHub Actions', 'Jenkins', 'CI / CD', 'GDPR 対応', 'ビルドシステム'],
        color: 'bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20',
      },
      {
        category: 'リーダーシップ・専門性',
        skills: ['テックリード', 'チームマネジメント（2 - 10 名）', 'アーキテクチャ設計', 'パフォーマンスチューニング'],
        color: 'bg-tn-red/10 text-tn-red border-tn-red/20',
      },
    ],
  },
}