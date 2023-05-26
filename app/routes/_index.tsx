import { useLoaderData, Await, Link } from "@remix-run/react";
import { Suspense } from "react";
import { json } from "@remix-run/deno";

export const loader = async () => {
  console.log("/ loader");

  const [ditto, charmander] = await Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((data) =>
      data.json()
    ),
    fetch("https://pokeapi.co/api/v2/pokemon/charmander").then((data) =>
      data.json()
    ),
  ]);

  return json({ ditto: ditto, charmander: charmander });
};

export default function Index() {
  const { ditto, charmander } = useLoaderData<{
    ditto: any;
    charmander: any;
  }>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>No Defer (with cache)</h1>
      <ul>
        <li>
          <Link to={"/defer"}>Defer</Link>
        </li>
        <li>
          <Link to={"/defer"} prefetch="intent">
            Defer (Prefetch)
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
