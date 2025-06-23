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
        skills: ['C#', 'Go', 'Ruby', 'C++'],
        color: 'bg-tn-blue/10 text-tn-blue border-tn-blue/20',
      },
      {
        category: 'Game Development',
        skills: ['Unity', 'PlayFab', 'Photon'],
        color: 'bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20',
      },
      {
        category: 'Backend & Frameworks',
        skills: ['Ruby on Rails', 'gRPC', 'SDK Development'],
        color: 'bg-tn-green/10 text-tn-green border-tn-green/20',
      },
      {
        category: 'Cloud & Platforms',
        skills: ['AWS (EC2, S3)', 'GCP (Cloud Run, GCS)', 'Steam'],
        color: 'bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20',
      },
      {
        category: 'DevOps & Tools',
        skills: ['GitHub Actions', 'Jenkins', 'Docker', 'GitHub'],
        color: 'bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20',
      },
      {
        category: 'Specialization',
        skills: ['Infrastructure Development', 'New Project Development', 'Team Management'],
        color: 'bg-tn-red/10 text-tn-red border-tn-red/20',
      },
    ],
  },
  ja: {
    title: '技術スキル',
    categories: [
      {
        category: 'プログラミング言語',
        skills: ['C#', 'Go', 'Ruby', 'C++'],
        color: 'bg-tn-blue/10 text-tn-blue border-tn-blue/20',
      },
      {
        category: 'ゲーム開発',
        skills: ['Unity', 'PlayFab', 'Photon'],
        color: 'bg-tn-cyan/10 text-tn-cyan border-tn-cyan/20',
      },
      {
        category: 'バックエンド・フレームワーク',
        skills: ['Ruby on Rails', 'gRPC', 'SDK開発'],
        color: 'bg-tn-green/10 text-tn-green border-tn-green/20',
      },
      {
        category: 'クラウド・プラットフォーム',
        skills: ['AWS (EC2, S3)', 'GCP (Cloud Run, GCS)', 'Steam'],
        color: 'bg-tn-magenta/10 text-tn-magenta border-tn-magenta/20',
      },
      {
        category: 'DevOps・ツール',
        skills: ['GitHub Actions', 'Jenkins', 'Docker', 'GitHub'],
        color: 'bg-tn-yellow/10 text-tn-yellow border-tn-yellow/20',
      },
      {
        category: '専門分野',
        skills: ['基盤開発', '新規開発', 'チームマネジメント'],
        color: 'bg-tn-red/10 text-tn-red border-tn-red/20',
      },
    ],
  },
}