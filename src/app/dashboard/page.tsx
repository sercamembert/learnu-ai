import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
const page = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return <div>page</div>;
};

export default page;
