export default defineEventHandler(async (event) => {
  const backendBase = process.env.BACKEND_URL || "http://localhost:8080";
  if (event.req.url?.startsWith("/auth")) {
    try {
      const url = `${backendBase}${event.req.url}`;
      const headers = new Headers(event.req.headers as Record<string, string>);

      const response = await fetch(url, {
        method: event.req.method,
        headers,
        body:
          event.req.method !== "GET" && event.req.method !== "HEAD"
            ? await readBody(event)
            : undefined,
        redirect: "manual",
      });

      event.res.statusCode = response.status;
      response.headers.forEach((value, key) => {
        event.res.setHeader(key, value);
      });

      event.res.end(await response.text());
    } catch (error) {
      console.error("Proxy Error:", error);
      event.res.statusCode = 500;
      event.res.end("Something went wrong");
    }
  }
});
