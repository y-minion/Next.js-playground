import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Player 화면 입니다.플레이어 id:{id}</h1>;
}
