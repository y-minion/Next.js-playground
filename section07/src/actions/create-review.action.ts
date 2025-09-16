"use server";
import { revalidatePath, revalidateTag } from "next/cache";

//서버에서만 실행이 되도록 만들어주는 지시자를 사용한다.

export default async function createReviewAction(formData: FormData) {
  console.log("server action called");

  //이때 formData의 타입으로 string이나 파일타입이 올 수 있다.
  //하지만 우리는 현재 string만 사용할 것이기 때문에 값이 존재하면 문자열로 변환한다.
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  //서버측에서 클라이언트에 비어있는 항목이 있으면 올바르지 않은 요청으로 판단하여 종료한다
  if (!bookId || !content || !author) return;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    //패치가 성공적으로 이루어 지면 해당 페이지를 새롭게 만들어서 클라이언트에 보내준다
    revalidateTag(`review-${bookId}`);
    console.log(response);
  } catch (err) {
    console.error(err);
    return;
  }
}
