# Green NTU

A bilingual (Arabic/English) PWA for environmental awareness at university — **الجامعة الخضراء | Green NTU**.

## Running Locally

### Prerequisites

- Node.js 20+
- pnpm — install with `npm install -g pnpm`

### PowerShell (Windows)

If you get a script execution error, first run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then install dependencies and start the dev server:

```powershell
pnpm install
$env:PORT="5173"; $env:BASE_PATH="/"; pnpm --filter @workspace/green-ntu run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Bash / Git Bash (Windows)

```bash
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/green-ntu run dev
```

## Notes

- The app is fully frontend-only — no backend or database required.
- The workspace was originally configured for Replit (Linux). For local Windows development, the following overrides in `pnpm-workspace.yaml` were re-enabled:
  - `@rollup/rollup-win32-x64-msvc`
  - `@esbuild/win32-x64`
  - `lightningcss-win32-x64-msvc`
  - `@tailwindcss/oxide-win32-x64-msvc`
