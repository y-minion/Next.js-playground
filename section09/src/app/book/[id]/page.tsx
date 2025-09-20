import { notFound } from "next/navigation";
import style from "./page.module.css";
import ReviewEditor from "@/components/review-editor";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import Image from "next/image";

//미리 빌드 시점에 존재할 url파라미터를 넥스트 서버에 전달해준다. 이렇게 되면 빌드 시점에 미리 전달한 url파라미터에 대한 페이지들이 만들어 진다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!res.ok) {
    if (res.status === 404) {
      //네비게이션의 notFound함수를 호출시 가장 가까운 not-Found 컴포넌트를 렌더링 해준다.
      notFound();
    }
    return <div>오류 발생....</div>;
  }
  const book = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt="책 커버 이미지"
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok) {
    //이미 error.tsx파일을 설정했기 때문에 에러 발생시 에러를 던지기만 하면 넥스트가 에러페이지를 렌더링 시켜준다
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => {
        return <ReviewItem key={`review-item-${review.id}`} {...review} />;
      })}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
