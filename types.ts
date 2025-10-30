export interface Story {
  name: string;
  location: string;
  profileImageUrl: string;
  answers: {
    question: string;
    answer: string;
  }[];
}

export interface Question {
  id: string;
  text: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
}
