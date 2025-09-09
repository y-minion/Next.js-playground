//URL 파라미터는 넥스트에서 자동으로 props으로 전달해준다. 그래서 해당 params를 구조분해 할당으로 사용한다.
// 이때 params는 Promise형태이므로 이점 참고하여 타입 선언해준다.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //params에서 원하는 url파라미터를 꺼내쓸때는 params가 Promise 이므로 await를 사용한다
  const { id } = await params;
  return <div>book/[id] 페이지입니다. 현재 페이지 : {id}</div>;
}
