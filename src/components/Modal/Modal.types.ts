export interface IModal {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  buttonText?: string | React.ReactNode;
  children: React.ReactNode;
}
