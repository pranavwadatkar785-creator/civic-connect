import Navbar from "@/components/Navbar"

export default function IssuesPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Browse Issues
      </h1>

      <p className="mt-4 text-slate-600">
        View all reported civic issues here.
      </p>
    </main>
    </>
  );
}