//쿼리 파람을 사용하기 위해 useRouter를 호출해 객체를 사용해야한다.
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookDate } from "@/types";
import Head from "next/head";

/*

//Next.js가 SSR 함수에서 자동으로 브라우저에 관련된 장보들을 매개변수로 전달한다. 컴포넌트가 렌더링 되기 전에 사전에 서버로 쿼리파라미터를 contex로 전달해 쿼리를 추출한뒤, 서버에 fetch요청을 보낸다
export const getStaticProps = async (context: GetStaticPropsContext) => {
  //매개변수의 context에서 쿼리파라미터를 추출
  const q = context.query.q;

  //서버로 fetch요청을 보낸다.
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

*/

export default function SearchPage() {
  const [books, setBooks] = useState<BookDate[]>([]);

  //쿼리파람은 사전에 미리 알 수 없기 때문에 SSG가 불가능하다. 그래서 CSR으로 처리해줘야 한다.
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const books = await fetchBooks(q as string);
    setBooks(books);
  };

  useEffect(() => {
    if (!q) return;
    fetchSearchResult();
  }, [q]);
  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
