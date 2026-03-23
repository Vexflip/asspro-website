export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Training {
  id: string;
  title: string;
  description: string;
  category: "arres" | "elearning" | "simulation" | "softkills" | "autres";
  date: string;
  location: string;
  image: string;
  duration: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  specialty: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  featured: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
