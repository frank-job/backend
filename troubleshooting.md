# Troubleshooting Summary

## 1. `ReferenceError: organizations is not defined` (EJS Template)
- **File:** `src/views/organizations.ejs`
- **Problematic lines:** 21‑31 (original loop) and duplicated block lines 36‑44.
- **Why it happened:** The template tried to iterate over `organizations` without guaranteeing that the variable existed. When the route failed to pass the data (or the variable was undefined), EJS threw a ReferenceError.
- **Fix applied:** Updated the loop to guard against an undefined value:
  ```ejs
  <% (organizations || []).forEach(organization => { %>
  ```
  This ensures an empty array is used if `organizations` is falsy, preventing the crash.
- **Line changed:** `src/views/organizations.ejs` line 21 (now includes the `|| []` guard).

## 2. Duplicate markup in `organizations.ejs`
- **File:** `src/views/organizations.ejs`
- **Lines:** 36‑44 contain a second copy of the same list rendering.
- **Why it happened:** The original template was duplicated, causing redundant HTML and a potential second ReferenceError.
- **Fix suggestion:** Remove or comment out the duplicated block. (Not yet applied; you may do this later.)

## 3. `Cannot GET /` (Express root route missing)
- **File:** `server.js`
- **Problematic lines:** No route defined for `/`.
- **Why it happened:** Express responded with 404 because there was no handler for the root URL.
- **Fix applied:** Added a simple root route that redirects to the organizations page:
  ```js
  app.get('/', (req, res) => {
      res.redirect('/organizations');
  });
  ```
- **Line added:** `server.js` line 28 (after the `/projects` route).

## 4. Debug logging added (optional)
- **File:** `server.js`
- **Line added:** 38 – `console.log('organizations', getAllOrganizations());`
- **Why:** To verify that `getAllOrganizations()` returns data before awaiting it.
- **Note:** This logs a Promise object because the function is async; the real data is logged after awaiting. It can be removed once debugging is done.

---

These notes capture the hard‑coded mistakes we encountered, why they caused failures, and the precise code changes (including line numbers) that resolved them. Keep this file handy for future reference or when onboarding new developers.
