import type { HeadersFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData, Link } from "@remix-run/react";
import { Suspense } from "react";

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": "public, max-age=60, s-maxage=60",
});

export const loader = async () => {
  const ditto = fetch("https://example-url.com/api/slow").then((data) =>
    data.json()
  );
  const charmander = fetch("https://pokeapi.co/api/v2/pokemon/charmander").then(
    (data) => data.json()
  );
  return defer({ ditto: ditto, charmander: await charmander });
};

export default function Index() {
  const { ditto, charmander } = useLoaderData<{
    ditto: any;
    charmander: any;
  }>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Defer (with cache)</h1>

      <Link to={"/1"}>Another page</Link>
      <Link to={"/defer"}>Defer</Link>

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