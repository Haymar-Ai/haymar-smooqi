# Spec: Fix HTTP Method Mismatches — Display Name + Password

## Problem
Two API routes only handle `PATCH` but their clients send `POST`. Both fail silently with a 405.

## Fix 1 — `app/api/user/profile/route.ts`
Add a `POST` export that is identical to the existing `PATCH` handler:

```ts
export async function POST(req: Request) {
  // identical implementation to PATCH
}
```

Or simply rename `PATCH` to `POST` — the route is only called by `ProfileEditForm.tsx` which sends `POST`.

## Fix 2 — `app/api/user/password/route.ts`
Same fix — add or rename to `POST`:

```ts
export async function POST(req: Request) {
  // identical implementation to PATCH
}
```

Only called by `app/(app)/settings/page.tsx` which sends `POST`.

## Constraints
- No changes to the client components
- No changes to any other routes
- TypeScript must compile clean

## Verification
- Update display name on profile page → saves and reflects immediately
- Change password in settings → succeeds with confirmation message
