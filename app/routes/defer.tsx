import { useLoaderData, Await, Link } from "@remix-run/react";
import { Suspense } from "react";
import { defer } from "@vercel/remix";

export const config = { runtime: "edge" };

export const loader = async () => {
  console.log("/defer loader");
  const ditto = fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((data) =>
    data.json()
  );

  const charmander = fetch("https://pokeapi.co/api/v2/pokemon/charmander").then(
    (data) => data.json()
  );

  console.log({ ditto, charmander });
  return defer({ ditto, charmander });
};

export default function Index() {
  const { ditto, charmander } = useLoaderData<{
    ditto: any;
    charmander: any;
  }>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Defer stream (without cache)</h1>

      <ul>
        <li>
          <Link to={"/"}>/</Link>
        </li>
        <li>
          <Link to={"/"} prefetch="intent">
            / (Prefetch)
          </Link>
        </li>
      </ul>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={ditto} errorElement={<p>Error loading</p>}>
          {(ditto) => (
            <>
              <h1>{ditto?.name}</h1>
              <img
                src={ditto?.sprites?.front_default}
                style={{ imageRendering: "pixelated" }}
              />
            </>
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={charmander} errorElement={<p>Error loading</p>}>
          {(charmander) => (
            <>
              <h1>{charmander?.name}</h1>
              <img
                src={charmander?.sprites?.front_default}
                style={{ imageRendering: "pixelated" }}
              />
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
