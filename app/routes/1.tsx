import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <Link to={"/"} prefetch="intent">
        /
      </Link>
    </main>
  );
}