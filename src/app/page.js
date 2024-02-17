import Link from "next/link";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.wrapper}>
      <p>
        This is a simple todo app built with Next.js, Clerk, Prisma, and SQLite.
        It demonstrates how to use Clerk to build a fullstack app with
        authentication, authorization, and data persistence.
      </p>

      <ul className={classes.linksContainer}>
        <li className={classes.topLevelListItem}>
          <Link className={classes.link} href="/client-rendered-todos">
            Client Rendered Todos
          </Link>
          <ul>
            <li>Uses SWR for data fetching and local state</li>
            <li>
              Makes requests to endpoints defined in our todos route handler for
              CRUD
            </li>
            <li>
              Looks and feels like &quot;vanilla&quot; React, with hooks and
              event handling
            </li>
          </ul>
        </li>
        <li className={classes.topLevelListItem}>
          <Link className={classes.link} href="/server-rendered-todos">
            Server Rendered Todos
          </Link>
          <ul>
            <li>Uses HTML native form and server actions</li>
            <li>The TodosPage and TodoList components are server rendered</li>
            <li>
              The TodoItem component is client rendered for client side
              interactivity (i.e. listening for DOM events and reacting to them)
            </li>
          </ul>
        </li>
      </ul>
    </main>
  );
}
