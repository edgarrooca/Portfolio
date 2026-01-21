
export type Language = 'es' | 'en';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  type: 'web' | 'video';
  title: string;
  category: string;
  client?: string; 
  year?: string;   
  imageUrl: string; 
  mobileImageUrl?: string;
  gallery?: string[]; 
  videoUrl?: string; 
  description: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  stack?: string[]; 
  url?: string;     
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
