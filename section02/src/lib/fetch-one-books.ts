import { BookDate } from "@/types";

export default async function fetchOneBook(
  id: string
): Promise<BookDate | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("상세 책 페이지 에러");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
