import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { q, id } = router.query;
  return (
    <>
      <h1>이것은 테스트 페이지</h1>
      <h2>하지만 쿼리스트링과 {q}</h2>
      <h2>URL 파라미터 {id}를 사용할 수 있습니다.</h2>
    </>
  );
}
