import { json } from "@vercel/remix";
import { Await, useLoaderData, Link } from "@remix-run/react";
import { Suspense } from "react";

export const config = { runtime: "edge" };

export const loader = async () => {
  const ditto = fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((data) =>
    data.json()
  );
  const charmander = fetch("https://pokeapi.co/api/v2/pokemon/charmander").then(
    (data) => data.json()
  );

  console.log({ ditto, charmander });
  return json({ ditto: await ditto, charmander: await charmander });
};

export default function Index() {
  const { ditto, charmander } = useLoaderData<{
    ditto: any;
    charmander: any;
  }>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>JSON (without cache)</h1>

      <ul>
        <li>
          <Link to={"/defer"}>/defer</Link>
        </li>
        <li>
          <Link to={"/defer"} prefetch="intent">
            /defer (Prefetch)
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
