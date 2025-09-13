import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  //서버 컴포넌트 페이지에서 자동으로 받는 현재 페이지의 쿼리스트링
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    return <div>오류 발생.</div>;
  }
  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
