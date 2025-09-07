//쿼리 파람을 사용하기 위해 useRouter를 호출해 객체를 사용해야한다.
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

//Next.js가 SSR 함수에서 자동으로 브라우저에 관련된 장보들을 매개변수로 전달한다. 컴포넌트가 렌더링 되기 전에 사전에 서버로 쿼리파라미터를 contex로 전달해 쿼리를 추출한뒤, 서버에 fetch요청을 보낸다
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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

export default function Search({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
