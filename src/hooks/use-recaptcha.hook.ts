import { useEffect } from "react";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

// or

// declare global {
//   interface Window {
//     grecaptcha?: {
//       ready: (cb: () => void) => void;
//       execute: (
//         siteKey: string,
//         options: { action: string }
//       ) => Promise<string>;
//     };
//   }
// }

/**
 * Custom React hook for Google reCAPTCHA v3.
 *
 * Implements:
 * 1. grecaptcha.ready() — ensures reCAPTCHA library is fully loaded
 *    before executing to prevent race conditions.
 *
 * 2. trustedtypes=true — adds Trusted Types support for better
 *    Content Security Policy (CSP) compatibility.
 */
export function useRecaptcha(siteKey: string) {
  useEffect(() => {
    // Avoid reloading script
    if (document.getElementById("recaptcha-script")) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}&trustedtypes=true`;
    script.async = true;
    script.id = "recaptcha-script";
    document.body.appendChild(script);
  }, [siteKey]);

  const execute = async (action: string) => {
    return new Promise<string>((resolve, reject) => {
      const tryExecute = () => {
        if (!window.grecaptcha) {
          // Wait and retry until grecaptcha is defined
          const interval = setInterval(() => {
            if (window.grecaptcha) {
              clearInterval(interval);
              runExecute();
            }
          }, 200);
        } else {
          runExecute();
        }
      };

      const runExecute = () => {
        window.grecaptcha!.ready(async () => {
          try {
            const token = await window.grecaptcha!.execute(siteKey, { action });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      };

      tryExecute();
    });
  };

  return { execute };
}
