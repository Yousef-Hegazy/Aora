export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  url: string;
  user: VideoUploaderSchema;
}

export interface VideoUploaderSchema {
  id: number;
  username: string;
  avatar: string;
}
