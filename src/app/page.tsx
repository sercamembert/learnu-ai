import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex gap-3">
      <LoginLink>
        <div className="bg-emerald-500 rounded-lg p-3 text-white">Sign In</div>
      </LoginLink>
      <RegisterLink>
        <div className="bg-blue-500 rounded-lg p-3 text-white">Sign UP</div>
      </RegisterLink>
    </div>
  );
}
