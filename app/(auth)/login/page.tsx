import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          ログイン
        </h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          学習を続けるにはログインが必要です
        </p>

        <GoogleLoginButton />

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
