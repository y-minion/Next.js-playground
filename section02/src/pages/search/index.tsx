//쿼리 파람을 사용하기 위해 useRouter를 호출해 객체를 사용해야한다.
import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Search() {
  const router = useRouter();
  //라우터의 객체에서 query속성에 접근해 쿼리 파람의 키에 접근한다.
  const { q } = router.query;
  return <h1>search 화면 {q}</h1>;
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
