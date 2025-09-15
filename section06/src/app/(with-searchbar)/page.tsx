import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import delay from "util/delay";
import { Suspense } from "react";

export const dynamic = "auto";
//특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정한다.
// 1. auto
// 2. force-dynamic
// 3. force-static
// 4. error

const AllBooks = async () => {
  await delay(1500);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    return <div>오류가 발생 했습니다...</div>;
  }

  const allBooks: BookData[] = await res.json();
  console.log(allBooks); //오직 서버에서만 콘솔이 찍힌다. -> 기본적으로 넥스트는 모든 컴포넌트가 서버 컴포넌트임
  return (
    <div>
      {allBooks.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
};

const RecoBooks = async () => {
  await delay(3000);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!res.ok) {
    return <div>오류가 발생 했습니다...</div>;
  }
  const recoBooks: BookData[] = await res.json();
  return (
    <div>
      {recoBooks.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다 ...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다 ...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
