export interface ScrapeOptions {
  text: boolean;
}

export interface ScrapedData {
  title: string;
  url: string;
  links?: Array<{
    text: string;
    href: string;
  }>;
  images?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

export type StatusType = "idle" | "loading" | "success" | "error";

export interface StatusState {
  type: StatusType;
  message: string;
}
