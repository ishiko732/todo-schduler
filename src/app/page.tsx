import TodoPage from "@todo/page/Todo";
import { LocalStoragePage } from "@todo/page/localStoragePage";

export default function Home() {
  return (
    <LocalStoragePage>
      <TodoPage />
    </LocalStoragePage>
  );
}
