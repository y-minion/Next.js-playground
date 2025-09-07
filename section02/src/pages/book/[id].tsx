//URL변수도 쿼리파람과 마찬가지로 객체를 불러온다.
import style from "./[Id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(id as string);
  console.log(book);
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return null;

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
