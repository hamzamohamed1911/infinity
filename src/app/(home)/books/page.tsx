import BooksList from "./_components/BooksList";

export default function Page() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 الكتب المتاحة</h1>
      <BooksList />
    </section>
  );
}
