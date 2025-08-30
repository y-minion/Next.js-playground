import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  return <h1>search 화면 {q}</h1>;
}
