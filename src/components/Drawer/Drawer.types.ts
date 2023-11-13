export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
