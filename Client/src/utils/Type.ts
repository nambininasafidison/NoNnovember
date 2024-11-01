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
