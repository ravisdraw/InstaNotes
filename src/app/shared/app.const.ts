import {
  faPaintBrush,
  faAppleAlt,
  faMoneyCheckDollar,
  faBookOpenReader,
  faComputer,
  faEdit,
  faCode,
  faReplyAll,
  faCheck,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';

export const dashBoardItems = [
  { name: 'All Post', icon: faCheckSquare , active : true },
  { name: 'UI', icon: faPaintBrush , active : false },
  { name: 'Tech', icon: faAppleAlt , active : false },
  { name: 'Coding', icon: faCode , active : false },
  { name: 'Trading', icon: faMoneyCheckDollar , active : false },
  { name: 'Interview', icon: faBookOpenReader , active : false },
  { name: 'AI', icon: faComputer , active : false },
];

export interface Post {
  postid: string;
  postTitle: string;
  postCategory: string;
  postKeywords: any;
  postNotes: string;
  postLinks: any;
  postTime: any;
}

export interface Note {
  postid:string;
  postNotes:string;
  noteLinks:any;
}