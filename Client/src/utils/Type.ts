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

export type CardPropsType = {
  img: string;
  title: string;
  miniDesc: string;
  logo: string;
  reference: string;
  montant: string;
  date: string;
  onApprove: () => void;
};

export type ModulePropsType = {
  img: string;
  title1: string;
  title2: string;
  logo: string;
  reference: string;
  montant: string;
  date: string;
  onApprove: () => void;
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

export type BigType = {
  x: string;
  y: number;
};

export type UserGrowthType = {
  id: string;
  data: BigType[];
};

export type ActivityType = {
  owner: string;
  type: string;
  title: string;
  description: string;
  date:string;
};

export type StatType = {
  totalUsers: number;
  activeSubscriptions: number;
  configuredModules: number;
};

export type DataHomeType = StatType & {
  userGrowth: UserGrowthType[];
  subscriptionBreakDown: BigType[];
  moduleUsage: BigType[];
  activities: ActivityType[];
};
