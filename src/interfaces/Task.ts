export default interface Task {
  id: number;
  title: string;
  text: string;
  task_done: boolean;
  duration: string;
  date_added: string;
  category_id: number;
}
