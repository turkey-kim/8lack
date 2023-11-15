export interface CardProps {
  title: string;
  member: string;
  time: string;
  people: string[] | undefined;
}

export interface SlidiingListProps {
  data?: CardProps | any;
  direction?: string;
}
