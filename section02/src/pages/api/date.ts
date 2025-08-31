import type { NextApiRequest, NextApiResponse } from "next";

//API를 생성할 수 있다. api디렉토리의 하위에 원하는 api생성 파일을 생성한다.
//매개변수로는 요청(req)와 응답(res)를 받는다. 타입은 넥스트에서 제공해주는 타입을 사용한다.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  //res함수를 사용해 응답값을 만들 수 있다.
  res.json({ date: date.toLocaleDateString() });
}
