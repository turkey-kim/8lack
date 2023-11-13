interface User {
  id: string;
  username: string;
  picture: string;
}

export interface IAvatars {
  users?: User[];
  isPrivate?: boolean;
}
