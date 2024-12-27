export default defineEventHandler(async (event) => {
  const { req, res } = event;
  const backendBase = useRuntimeConfig().public.apiBase;

  if (req.url?.startsWith("/auth/login")) {
    console.log(`Proxying request to: ${backendBase}${req.url}`);

    const backendResponse = await fetch(`${backendBase}${req.url}`, {
      method: req.method,
      headers: req.headers as any,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? await readBody(event)
          : undefined,
      redirect: "manual",
    });

    res.statusCode = backendResponse.status;
    backendResponse.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    if (backendResponse.status !== 302) {
      const data = await backendResponse.text();
      res.end(data);
    } else {
      res.end();
    }

    return;
  }
});
