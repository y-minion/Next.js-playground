//쿼리 파라미터 또한 넥스트에서 자동으로 props로 전달해주므로 searchParams로 구조분해 할당으로 꺼내 쓴다. 타입은 promise이므로 이점 유의하여 타입 선언해 준다.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  //넥스트에서 Props를 통해 전달해주는 searchParams는 promise형태이므로 await를 사용하여 쿼리파라미터를 추출한다.
  const { q } = await searchParams;
  return <div>Search 페이지 : {q}</div>;
}
