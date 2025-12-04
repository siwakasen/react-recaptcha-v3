"use client";

import { useState } from "react";
import { envConfig } from "@/configs/env.config";
import { useRecaptcha } from "@/hooks/use-recaptcha.hook";

export default function RecaptchaForm() {
  const { execute } = useRecaptcha(envConfig.recaptchaSiteKey);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recaptchaToken = await execute("submit_form");
      setToken(recaptchaToken);
    } catch (error) {
      console.error("reCAPTCHA error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
      >
        <h1 className="text-lg font-semibold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          Generate reCAPTCHA v3 Token
        </h1>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <span className="h-4 w-4 border-2 border-t-transparent border-white dark:border-zinc-800 rounded-full animate-spin"></span>
              Generating...
            </span>
          ) : (
            "Generate Token"
          )}
        </button>

        {token && (
          <div className="mt-5">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Generated Token:
            </p>
            <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
              <p className="break-all leading-relaxed">{token}</p>
            </div>
          </div>
        )}
      </form>
      <div className="mt-2">
        source code:{" "}
        <a
          href="https://github.com/siwakasen/react-recaptcha-v3"
          className="underline text-blue-400"
        >
          react-recaptcha-v3
        </a>
      </div>
    </div>
  );
}
