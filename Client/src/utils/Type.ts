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
  image?: string;
  like: number;
  text: string;
};

export type PostPropsType = {
  username: string;
  time: string;
  description: string;
  like: number;
  avatar: string;
  images?: string[];
  comments?: CommentType[];
};
export type NoticePropsType = {
  time: string;
  description: string;
  avatar: string;
  images?: string[];
};

export type ConversationType = {
  id: number;
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
