import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  console.log("hey", props);

  return <div>Hello {props.params.name}</div>;
}
