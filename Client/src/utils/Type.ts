export type AlertType = {
  label: string;
  title: string;
  description?: string;
  className?: string;
  variant?: string;
  alertStatus: () => void;
};

export type JustType = {
  title: string;
  isOpen: boolean;
  variant: string;
  onClose: () => void;
};

export type OptPropsType = {
  email: string;
  isOpen: boolean;
  description: string;
  onOtpValidated?: () => void;
};

export interface OtpRef {
  sendOtpConfirm: () => Promise<void>;
}

export type CommentType = {
  commentId: string;
  commentator: {
    username: string;
    avatar: string;
  };
  body: string;
  files?: string[];
  isFile?: boolean;
  likes: string[];
};

export type PostPropsType = {
  postId: string;
  author: {
    authorId: string;
    authorName: string;
    avatar: string;
  };
  timestamp: string;
  body: string;
  likes: string[];
  supporters: string[];
  files?: string[];
  commentsNumber: number;
};
export type NoticePropsType = {
  senderName: string;
  timestamp: string;
  content: string;
  users: {
    avatar: string;
  };
};

export type ConversationType = {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
};

export type ChatPropsType = {
  selectedConversation: ConversationType;
  onChangeOpen: () => void;
};

export type DiscussionPropsType = {
  selectedConversation: ConversationType;
  onChangeOpen: (status: boolean) => void;
  onChangeSelected: (value: ConversationType) => void;
};

export type AvatarPickerProps = {
  avatars: string[];
  onSelect: (avatar: string) => void;
};

export type PhotoType = {
  id: string;
  src: string;
  alt: string;
  likes: string[];
  comments: number;
  body: string;
};

export type FriendType = { id: string; status: string };

export type UserProfileType = {
  userId: string;
  email: string;
  name: string;
  gender: string;
  userAccountType: string;
  avatar: string;
  bio: string;
  location: string;
  occupation: string;
  joinDate: string;
  friends: FriendType[];
  postsNumber: number;
};
