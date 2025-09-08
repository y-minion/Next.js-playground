//URL변수도 쿼리파람과 마찬가지로 객체를 불러온다.
import style from "./[Id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],

    fallback: true,
    // false : Paths이외의 url파람 요청시 404 Notfound 화면 렌더링
    // blocking : SSR 방식으로 추가 화면 렌더링
    // true : SSR방식 + 데이터가 없는 폴백 상태의 페이지부터 반환 -> 이후 응답 오면 해당 페이지 렌더링
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(id as string);

  //응답 에러시, 즉 없는 페이지 요청 또는 패치 에러시 안내 페이지 렌더링 설정
  if (!book) {
    return {
      //반환을 404 페이지로 설정
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  //useRouter의 isFallback옵션으로 로딩중 상태 알 수 있다.
  if (router.isFallback) return "로딩중입니다.";
  if (!book) return "문제가 발생했습니다. 다시 시도하세요!";

  const { title, subTitle, coverImgUrl, description, author, publisher } = book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
