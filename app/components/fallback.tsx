import Spinner from "./spinner";

export default function Fallback() {
  return (
    <section className="absolute left-0 top-0 w-full h-full flex justify-center items-center z-10">
      <Spinner />
    </section>
  );
}
