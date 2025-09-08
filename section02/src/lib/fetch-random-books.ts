import { BookDate } from "@/types";

export default async function fetchRandomBooks(): Promise<BookDate[]> {
  const url =
    "https://onebite-books-server-main-sepia-beta.vercel.app/book/random";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("랜덤 책 패치 에러");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
