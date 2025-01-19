import { FreshContext } from "$fresh/server.ts";

type DataLoader<LoaderData, LoaderParams = void> = (
  refresh: boolean,
  params: LoaderParams,
) => Promise<{
  data: LoaderData;
  version: string;
}>;

export async function createHandler<LoaderData, LoaderParams = void>(
  req: Request,
  ctx: FreshContext,
  loader: DataLoader<LoaderData, LoaderParams>,
  params?: LoaderParams,
) {
  const url = new URL(req.url);
  const refresh = url.searchParams.get("refresh") === "true";
  const { data, version } = await loader(refresh, params as LoaderParams);

  if (!data) {
    return ctx.renderNotFound({
      message: "Data not found",
    });
  }

  // Check If-None-Match for 304
  const ifNoneMatch = req.headers.get("if-none-match");
  if (ifNoneMatch === `"${version}"`) {
    return new Response(null, { status: 304 });
  }

  const resp = await ctx.render(data);
  const headers = new Headers(resp.headers);

  headers.set(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=3600",
  );
  headers.set("ETag", `"${version}"`);

  return new Response(resp.body, {
    status: resp.status,
    headers,
  });
}
