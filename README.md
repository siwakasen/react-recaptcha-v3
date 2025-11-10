# Google reCAPTCHA v3 in React (No Third-Party Packages)

In Google’s official documentation, reCAPTCHA v3 is demonstrated using plain JavaScript.  
However, implementing it in frameworks like React requires a slightly different approach.

This project aims to apply **Google reCAPTCHA v3** in the simplest possible way,  
**without using any third-party packages**. While third-party packages can make integration easier,  
they also introduce risks if the package contains bugs or malicious code.  
For that reason, it’s safer to rely directly on Google’s own script.

---

### Goals

1. **No third-party packages** — depend only on Google’s official script.  
2. **Simple and framework-agnostic** — works with any React setup. 
3. **Reusable hook** — reCAPTCHA loads only on specific pages, not globally.

---

### Demo & Repository

- Live demo: [https://recaptcha.siwakasen.dev](https://recaptcha.siwakasen.dev)  
- reCAPTCHA hook: [`use-recaptcha.hook.ts`](https://github.com/siwakasen/react-recaptcha-v3/blob/master/src/hooks/use-recaptcha.hook.ts)  
- Enterprise version: [`use-recaptcha-enterprise.hook.ts`](https://github.com/siwakasen/react-recaptcha-v3/blob/master/src/hooks/use-recaptcha-enterprise.hook.ts)  
- Example page using reCAPTCHA: [`page.tsx`](https://github.com/siwakasen/react-recaptcha-v3/blob/master/src/app/page.tsx)
