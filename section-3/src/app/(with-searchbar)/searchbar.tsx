//클라리언트 컴포넌트 명시 -> 넥스트가 클라이언트 컴포넌트로 인식 가능
"use client";

import { useState } from "react";

export default function Searchbar() {
  // 사용자와 상호작용이 필요한 로직에는 최소한으로 추려서 클라이언트 컴포넌트를 사용한다.
  //따라서 전체 레이아웃에 설정하지 않고 따로 검색 전용 컴포넌트 즉, 사용자와 상호작용이 필요한 부분만 클라이언트 컴포넌트로 분리한다.
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input value={search} onInput={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
