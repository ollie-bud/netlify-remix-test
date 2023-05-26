import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
// Looking to use renderReadableStream? See https://github.com/netlify/remix-template/discussions/100
import { renderToString } from "react-dom/server";

import { setupServer } from "msw/node";

import { rest } from "msw";
import { DITTO } from "./ditto";

export const handlers = [
  rest.get("https://example-url.com/api/slow", (_, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(DITTO))
  ),
];

export const server = setupServer(...handlers);

server.listen({ onUnhandledRequest: "warn" });

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
