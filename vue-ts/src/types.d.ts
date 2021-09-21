// 声明 data类型
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
};

// 声明 props类型
export type TitleInfo = {
  value: string;
  color: string;
};
