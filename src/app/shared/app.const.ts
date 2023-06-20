import {
  faPaintBrush,
  faAppleAlt,
  faMoneyCheckDollar,
  faBookOpenReader,
  faComputer,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

export const dashBoardItems = [
  { name: 'Design', icon: faPaintBrush , active : false },
  { name: 'Tech', icon: faAppleAlt , active : false },
  { name: 'Trading', icon: faMoneyCheckDollar , active : false },
  { name: 'Interview', icon: faBookOpenReader , active : false },
  { name: 'AI', icon: faComputer , active : false },
  { name: 'Add Data', icon: faEdit , active : true },
];

export interface Post {
  postid: string;
  postTitle: string;
  postCategory: string;
  postKeywords: string[];
  postNotes: string;
  postTime: Date;
}
