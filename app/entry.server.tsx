import type { EntryContext } from "@vercel/remix";
import { RemixServer } from "@remix-run/react";
// Looking to use renderReadableStream? See https://github.com/netlify/remix-template/discussions/100
import { renderToString } from "react-dom/server";
// import { rest } from "msw";

// import { setupServer } from "msw/node";
// import { DITTO } from "./ditto";

// export const server = setupServer(
//   rest.get("https://example.com/slow-request", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.delay(1000), ctx.json(DITTO));
//   })
// );

// server.listen({ onUnhandledRequest: "warn" });
// console.info("MSW initialised");
// server.printHandlers();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
