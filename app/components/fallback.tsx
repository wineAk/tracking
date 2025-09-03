import Spinner from "./spinner";

export default function Fallback() {
  return (
    <section className="h-full flex flex-1 justify-center items-center">
      <Spinner />
    </section>
  );
}
