export interface ScrapeOptions {
  text: boolean;
}

export interface ScrapedData {
  fake: boolean;
  real: boolean;
  fake_percentage: number;
  real_percentage: number;
  explanation: string;
  related_links: string[];
  author_verified: boolean;
  post_date: string;
  subject_expertise: string;
  media_presence: boolean;
  cross_check_sources: string[];
}

export type StatusType = "idle" | "loading" | "success" | "error";

export interface StatusState {
  type: StatusType;
  message: string;
}
