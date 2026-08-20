<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Agent rules

- Ship the smallest correct implementation. Inspect and reuse existing code before adding abstractions.
- Do not add overlapping dependencies, duplicate helpers/types/services, speculative scaffolding, or unrelated refactors.
- Remove obsolete code and fix root causes, not caller-specific symptoms.
- Validate untrusted data at trust boundaries. Never use `any` as an escape hatch; avoid unsafe assertions and non-null assertions.
- Do not weaken TypeScript, lint, Knip, or test configuration to make checks pass. Do not add fake `SAFETY:` comments or suppression directives for that purpose.
- Run `npm run typecheck && npm run lint && npm run deadcode && bun test` and review the final diff before finishing.
