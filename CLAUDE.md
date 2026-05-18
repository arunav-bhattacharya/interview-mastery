# Interview Mastery — Claude session primer

A Docusaurus-based interview-prep site. This file is auto-loaded at the start of every Claude Code session in this repo; keep it skim-able.

## Stack

- **Docusaurus v3.10** + TypeScript, MDX content
- **@docusaurus/theme-mermaid** for class / sequence / state diagrams (Mermaid v11)
- **prism-react-renderer** via a custom `src/components/CodeTabs.tsx` with brace-depth reindenter
- **JetBrains Mono** (mono) + **Inter** (sans), navy-with-purple-touch indigo accent palette
- **Swizzled** `src/theme/DocItem/Layout/index.tsx` adds a floating TOC hide/show toggle (state in localStorage; `position: fixed`)
- Difficulty pills, interactive checklist, live progress summary — all backed by localStorage

## Sidebar structure (top-level → leaves)

- **Guide**
- **DSA** — hub-and-spoke under each family
  - Arrays & Strings (two-pointers, sliding-window, hashmap, prefix-sum)
  - Lists & Trees (linked-list, stack, queue-deque, binary-tree, heap-preview)
  - Heap & Trie (heap, trie)
  - Graphs & DP (graph-traversal, binary-search, dynamic-programming, backtracking)
  - More Patterns (intervals, matrix-traversal, bit-manipulation)
  - Problem Checklist (interactive `<Problem>` rows + `<ChecklistSummary>` dashboard)
  - Practice Solutions (Java / Kotlin / Python / Go for all 9 problems)
- **System Design** — flat
- **Skills** (wraps the whole engineering-skill set)
  - Java — flat: Java Core, Concurrency, Modern Java, Interview Q&A, + nested Design Patterns
    - Design Patterns: SOLID; Creational / Structural / Behavioral (each with a Mental Model recall card at `sidebar_position: 0` + per-pattern spokes); Architectural
  - Kotlin (basics, data-sealed, coroutines, functional, java-interop)
  - Spring (core-di, transactions, rest-api, security, data-jpa, observability, testing, docker, interview-qa)
  - Quarkus (fundamentals, cdi-di, rest-reactive, panache, native-image, vs-spring)
  - Microservices (fundamentals)
  - SQL, Cloud
- **Behavioral** (stays outside Skills)

## Key custom components — REUSE these, don't reinvent

- `src/components/QuickNav.tsx` — `<QuickNav items={[{label, href}]} />` pill bar at top of hubs
- `src/components/CodeTabs.tsx` — `<CodeTabs java={`...`} kotlin={`...`} python={`...`} go={`...`} />`, `groupId="im-lang"` for cross-page sync
- `src/components/Pillbar.tsx` — `<Pillbar pills={[{label, value}]} />` metadata chips
- `src/components/Difficulty.tsx` — `<Difficulty>Easy|Medium|Hard</Difficulty>` LeetCode-style pill
- `src/components/Problem.tsx` + `problemStore.ts` — `<Problem id="lc-NNN" url="..." difficulty="Easy" pattern="...">title</Problem>` interactive checklist row; persists to localStorage key `im-problem-checklist-v1`
- `src/components/ChecklistSummary.tsx` — live-counting dashboard reading the same store
- VizFrame / VizControls / VizLegend / VizState — DSA visualizer helpers

## Visual conventions

- Indigo palette CSS vars: `--im-accent: #3346b3` (navy-purple), `--im-accent-soft: #d8def0`, `--im-accent-fg: #1c2566`, plus standard surface/border/fg vars
- Mermaid theming lives in `docusaurus.config.ts > themeConfig.mermaid.options.themeVariables` — sets indigo primary, cyan/teal secondary (cache / data layer), amber tertiary (async / queue), plus sequence- and state-diagram palettes. **Note colours are also set there** (see gotcha #3).
- Mermaid class diagrams use a custom CSS skin in `src/css/custom.css`; class boxes are colour-coded as `imIface`, `imAbstract`, `imConcrete` via `cssClass "Name" role` inside each diagram (Mermaid v11 syntax)
- Core Concept sections wrapped in `<div className="im-core-concept">` for the floating "CORE CONCEPT" chip card
- Primary buttons use **white text on indigo** — NEVER `color: #1a1a1a` on `var(--im-accent)`

## Build / serve / verify

```bash
npm run typecheck                                # tsc — must pass clean
npm run build                                    # must complete with zero broken-link warnings
npm run serve -- --port 3280 --no-open           # manual smoke
```

For automated verification: use `mcp__Claude_Preview__preview_start` with the `docusaurus-serve` entry in `.claude/launch.json` (already configured for port 3280).

## Gotchas already paid for — don't re-pay them

1. **Mermaid v11 classDiagram lexer treats `-` as MINUS.** Identifiers in `cssClass "Foo" myRole` must be camelCase. Hyphens cause silent diagram-drop. Use `imIface` / `imAbstract` / `imConcrete`.

2. **Mermaid v11 emits class nodes as `g.node.<role>`**, NOT `g.classGroup.<role>` like v10. The "classic" look puts two unclassed `<path>` siblings inside `g.label-container.outer-path` (one fills, one strokes the hand-drawn outline). Style the path children, not the parent `<g>`.

3. **Mermaid v11 puts inline `style="…!important"` on note paths** — external CSS with `!important` won't beat that. To recolour notes set `noteBkgColor` / `noteBorderColor` / `noteTextColor` in `themeConfig.mermaid.options.themeVariables` in `docusaurus.config.ts`.

4. **Mermaid sizes note `foreignObject` for SINGLE-LINE text.** Multi-line via `<br/>` causes clipping / overlap / ragged-wrap. **Notes are written as single-line strings** and styled with `white-space: nowrap; width: max-content` so the box hugs the text exactly within Mermaid's allocated space. **DON'T add `<br/>` to notes.**

5. **Notes are drawn from the inner HTML, not Mermaid's path.** `custom.css` hides the Mermaid-drawn note outline (`g.node[id*="note"] .label-container > path { display: none }`) and styles the `<p>` as the visible card (slate-grey washed text on light slate bg, mode-neutral).

6. **The Mermaid wrapper class is `.docusaurus-mermaid-container`, NOT `.mermaid`.** CSS selectors should use `svg.classDiagram …`.

7. **YAML frontmatter** rejects unquoted `description:` values that start with `@` or contain mid-string colons. Quote them: `description: "@Transactional propagation, isolation"`.

8. **Relative `[link](./slug)` in MDX resolves against the URL, not the file path** (because `trailingSlash: false`). Use `[link](./slug.mdx)` so Docusaurus' file-based resolver handles it — otherwise build emits broken-link warnings.

9. **Browser caches Docusaurus' hashed CSS bundle.** After CSS changes, hard-reload (`location.reload(true)`) before re-querying computed styles in the preview MCP. Restarting the preview server also forces a fresh bundle hash.

10. **`mcp__Claude_Preview__preview_screenshot` occasionally returns blank/black frames** after navigation (especially on first attempt to a sub-page). DOM `preview_eval` is more reliable for verification; screenshot once the page has settled.

11. **DOM inspection during eval**: `getBoundingClientRect()` returns a `DOMRect` — when serialized to JSON via `preview_eval`, you get `{}` unless you destructure into a plain object. Always read individual fields (`r.top, r.left, r.width, r.height`).

12. **For long bulk edits (e.g. 20+ MDX files)**, write a Python script and pipe through `python3` in Bash — much faster and safer than 20 sequential `Edit` tool calls. Restructure scripts for DSA / Java refactors are in `/tmp/` from previous sessions.

## Recent work context (not exhaustive, just orientation)

- Design Patterns is fully hub-and-spoke with Mental Model recall cards per family.
- DSA was also restructured hub-and-spoke (5 families, ~17 pattern spokes).
- Problem Checklist is interactive — 120 problems backed by localStorage.
- Practice Solutions has all 9 problems in Java + Kotlin + Python + Go.
- Kotlin + Quarkus sections were added from scratch; the old `java/core-concurrency.mdx` and `java/spring-microservices.mdx` were split into per-topic spokes.
- UML notes have been iterated on heavily — current state (single-line, washed-grey card) works; **do NOT reintroduce `<br/>` in notes.**
- Top-level "Skills" category wraps Java, Kotlin, Spring, Quarkus, Microservices, SQL, Cloud. Behavioral stays outside.

When you start, read `sidebars.ts` and `src/css/custom.css` first to ground yourself. Use the `Agent` tool with `subagent_type: Explore` for broad codebase searches when uncertain about scope.
