import { useEffect } from "react";

// uncomment global declaration below:

// declare global {
//   const grecaptcha: any;
// }

//or

// declare global {
//   const grecaptcha: {
//     enterprise: {
//       execute: (
//         siteKey: string,
//         options: { action: string }
//       ) => Promise<string>;
//     };
//   };
// }

export function useRecaptchaEnterprise(siteKey: string) {
  useEffect(() => {
    if (typeof grecaptcha == undefined) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    document.body.appendChild(script);
  }, [siteKey]);

  const execute = async (action: string) => {
    const token = await grecaptcha.enterprise.execute(siteKey, { action });
    return token;
  };

  return { execute };
}
