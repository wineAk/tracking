import Spinner from "./spinner";

export default function Fallback() {
  return (
    <section className="h-full flex justify-center items-center">
      <Spinner />
    </section>
  );
}
