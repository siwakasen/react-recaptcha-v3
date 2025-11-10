import { useEffect } from "react";

declare global {
  const grecaptcha: any;
}

// or

// declare global {
//   const grecaptcha: {
//     execute: (siteKey: string, options: { action: string }) => Promise<string>;
//   };
// }

export function useRecaptcha(siteKey: string) {
  useEffect(() => {
    if (typeof grecaptcha == undefined) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.body.appendChild(script);
  }, [siteKey]);

  const execute = async (action: string) => {
    const token = await grecaptcha.execute(siteKey, { action });
    return token;
  };

  return { execute };
}
