export interface User {
  name: string;
  password: string;
}
export interface ELDResponse {
  userId: string;
  password: string;
  categoryWiseVideo: (CategoryWiseVideoEntity)[];
}
export interface CategoryWiseVideoEntity {
  category: string;
  videoList?: (Video)[] | null;
}
export interface Video {
  id: number;
  name: string;
  description: string;
  fileName: string;
  author: string;
  category?: string | null;
  uploadedBy: string;
  creationTime: string;
  like: boolean;
  totalNoOfLikes: number;
  rating: number;
  currentUser: number;
  vtt: string;
  thumbneil: string;
}

export class VideoLikeRequest {
  videoId!: number;
  userId!: any;
  like!: boolean;
}

export class VideoRateRequest {
  videoId!: number;
  userId!: string | null;
  rating!: number;
}