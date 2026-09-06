# PRIME HOSPITAL OPD

Fresh rebuild of the Prime Hospital OPD management application.

## Current foundation
- Keyboard-first responsive OPD interface
- Login screen with explicit error/loading states
- Home dashboard
- New consultation form
- Patient search and visit history
- Old visit open/print
- A5 prescription printing
- Medicine library
- Treatment templates
- Clinical shortcuts
- Local-first storage and offline indicator
- No service-role secrets in browser code

## Cloud setup
The new Supabase project must be connected before production authentication and cloud sync are enabled. Only the Supabase project URL and publishable/anon client key belong in the browser; the service-role key must never be exposed.

## Deployment
This is a zero-build static application and is Vercel-ready. The repository is `adnanufa-sudo/prime-hospital-opd` on branch `main`.
