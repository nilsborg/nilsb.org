import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>nilsb.org</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header class="p-4">
          <a href="/">Home</a>
        </header>
        <main class="p-4">
          <Component />
        </main>
      </body>
    </html>
  );
}
