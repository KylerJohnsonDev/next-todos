import Link from "next/link";
import classes from "./page.module.css";

export default function Home() {
  return (
    <>
      <p>
        This is a simple todo app built with Next.js, Clerk, Prisma, and SQLite.
        It demonstrates how to use Clerk to build a fullstack app with
        authentication, authorization, and data persistence.
      </p>

      <section className={classes.linksContainer}>
        <Link className={classes.link} href="/client-rendered-todos">
          Client Rendered Todos
        </Link>
        <Link className={classes.link} href="/server-rendered-todos">
          Server Rendered Todos
        </Link>
      </section>
    </>
  );
}
