export type Day = {
  date: Date;
  label: string;
};

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export type TasksByDate = {
  [date: string]: Task[];
};
