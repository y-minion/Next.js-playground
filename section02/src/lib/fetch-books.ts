import { BookDate } from "@/types";

//쿼리파라미터의 전달 유무에 따라 다른 api로 요청을 보내도록 한다
export default async function fetchBooks(q?: string): Promise<BookDate[]> {
  let url = "http://localhost:12345/book";

  //쿼리파라미터가 존재하는경우 다른 api로 GET요청
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
