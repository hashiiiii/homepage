export interface OSSProject {
  id: string;
  name: string;
  description: string;
  url: string;
  githubUrl?: string;
  stars?: number;
  language: string;
  tags: string[];
}

export interface Presentation {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  slidesUrl?: string;
  videoUrl?: string;
  tags: string[];
}

export interface ProductData {
  title: string;
  sections: {
    ossProjects: string;
    presentations: string;
  };
  labels: {
    github: string;
    slides: string;
    video: string;
  };
  ossProjects: OSSProject[];
  presentations: Presentation[];
}
