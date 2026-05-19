export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold">Civic Connect</h1>

      <p className="text-gray-500 mt-4 text-center max-w-lg">
        Report local civic issues like potholes, garbage, streetlight failures,
        and track their status in one place.
      </p>

      <button className="mt-8 px-6 py-3 rounded-xl bg-black text-white">
        Report an Issue
      </button>
    </main>
  );
}