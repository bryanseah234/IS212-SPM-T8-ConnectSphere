# Frontend Verification Plan

ConnectSphere · IS212 (AY 2026/27 T1) · 11 September 2026

## The short answer

Verify the frontend against the **acceptance criteria**, not against the Figma.

The Week 4 rubric has six graded rows: user stories, system design, working software, testing and traceability, code quality and CI, and accountability. None of them mentions design, mockups, UI fidelity or visual consistency, and there is no deliverable for a prototype. Effort spent proving the build matches a Figma earns nothing.

What is graded, in the top bands:

- *"the core workflows behave consistently, including important conflict, change, and failure scenarios"*
- *"Testing is comprehensive and traceable, combining appropriate unit and integration/end-to-end tests for normal, boundary, conflict, and failure scenarios. 100% coverage unless not possible and stated why."*
- *"a comprehensive CI pipeline reliably builds and tests the system"*
- *"Demonstrates complete ownership and deep understanding of all code … articulately justifies trade-offs and AI contributions during Q&A"*

The imported scaffold currently contains 222 `test.fixme()` cases written in
that taxonomy. Turning the relevant cases into an automated suite is the
verification, and it produces the traceability evidence as a by-product.

## The Figma problem is smaller than it looks

A paid seat is not required. Figma's free Starter plan includes view-only file sharing and full export to PNG, JPG, SVG and PDF at any resolution, and viewers do not need a Figma account when the file is shared with "anyone can view" access. Only full Dev Mode inspection is Professional-only.

Two actions, both free, both today:

1. **She shares a view link.** One click. Works for anyone, no account needed.
2. **She exports one PNG per screen into `docs/design/` in the repo**, named by story ID — `E02-S01-submit-request.png`. This is the one that actually helps, because it survives without a live link and a coding agent with vision can read it straight from the repo.

Then extract the colours, spacing, type scale and radii into frontend design
tokens **once** after the stack decision is recorded. Design tokens matter far
more than screenshots for agent-built UI: they make output consistent without
the agent ever seeing the design. A mismatched shade of blue is a five-minute
fix; a component built against the wrong spacing scale is a rewrite.

## The real risk is the agents, and the rubric names it

The failing band for Accountability reads *"relies on unverified or AI-generated code without understanding"*, and the instructions state plainly that *"An AI-generated solution that you cannot explain/justify will not score well."*

With agents on the repo, the control that protects your grade is not a tool. It is that each person can open any file in their area during the Week 13 Q&A and explain why it is built that way. Two cheap habits:

- Every pull request gets a human-written line saying what changed and why. Not the agent's summary — yours.
- Each team member owns two or three epics. Before Week 13, each person walks their own code once, without the agent.

## What the scaffold gives you

The imported scaffold is parked under
`docs/testing/frontend-verification-scaffold-v5/` until the frontend stack and
test runner are formally adopted.

| File | What it is |
|---|---|
| `tests/e2e/e01..e14.spec.ts` | 222 cases as `test.fixme()` stubs, grouped by story. Each carries its ID, matched acceptance criterion, pre-conditions, test data, expected result and numbered steps as a docblock. |
| `tests/seed/SEED_DATA.md` | The 12 accounts, 2 client organisations, 2 venues and 2 equipment items your cases assume exist, extracted from their pre-conditions. |
| `tests/seed/global-setup.ts` | Reset-and-reseed hook, refusing to run against an unknown database. |
| `playwright.config.ts` | Desktop and mobile projects, HTML + JSON reporters. |
| `github-workflow.example.yml` | Example future workflow with Postgres service, lint, build, unit tests with coverage, Playwright, and artefacts uploaded. It is not active CI. |

**Why stubs rather than implementations.** The docblock is the specification and the agent fills in the body. That ordering is the brief's own recommendation — *"agree the test cases first, then generate code to pass them"* — and it stops the agent inventing its own idea of correct behaviour. It also means the traceability is structural: the test name is the case ID, so the HTML report *is* your requirement-to-test-to-result evidence.

**196 of 222 cases were auto-matched to a specific scenario.** The remaining 26 say `TODO - confirm which scenario this is evidence for`. Those need a human, and they are the same 26 that the missing AC Reference column would have identified.

## Running order

1. Record the frontend stack and package manager decision in `docs/decisions/`.
2. Move the relevant scaffold files into the real test locations, likely `tests/e2e/` and `tests/seed/`, in the same PR that adds the frontend test tooling.
3. Install the chosen test runner dependencies and commit the lockfile.
4. Implement `global-setup.ts` against your migration/seed tooling, and seed the rows in `SEED_DATA.md`.
5. Pick the screens that already exist. Remove `.fixme` from those cases, let the agent fill in selectors, watch them go green.
6. Add `data-testid` attributes as you go. Selectors built on visible text break the moment your teammate renames a button.
7. Add active CI jobs only after the commands exist locally. Keep the current protected repository checks separate from application lint, tests, builds, and deployment.
8. Work outward story by story. Each newly passing case is a row of evidence.

## Definition of Done

The brief says cross-cutting concerns belong in the DoD, set once, rather than cloned onto every story. Proposed bar for the Increment:

- [ ] Every acceptance criterion for the story has at least one passing test case
- [ ] Boundary cases present for any threshold in the story: below, at, above
- [ ] Unit or integration tests cover the business rules, not just the happy path
- [ ] Venue search, venue availability calendar and registration submission each complete in under 3 seconds (BDR T-51)
- [ ] Renders correctly at desktop and mobile widths — covered by the two Playwright projects, not per-story cases
- [ ] Keyboard reachable, form inputs labelled
- [ ] Errors surface a specific message, never a blank screen
- [ ] Regression suite green in CI
- [ ] A human can explain every file changed
- [ ] Backlog, BDR or ADR updated if a decision changed

## What to say in the Q&A if asked about the design

That the Figma informed the interface, that the acceptance criteria are the specification, and that verification is against the criteria because that is what the customer agreed to. That is a stronger answer than claiming pixel fidelity to a document the customer never signed off.
