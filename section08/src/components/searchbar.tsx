"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  // App Router에서는 useSearchParams를 호출하여 쿼리파람을 불어온다.
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  //get메서드를 통해 원하는 프로퍼티에 접근한다.
  const q = searchParams.get("q");

  //쿼리파람이 변경될때마다 상태를 업데이트 해준다.
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    //직접 쿼리 파람 넣어주면서 페이지 네비게이션
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
