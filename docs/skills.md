# Installed skills

Installed and loaded on 2026-09-23, before audit scripts or application code were written.

| Skill | Project source | Verification |
| --- | --- | --- |
| Impeccable 4.3.1 | `.agents/skills/impeccable/SKILL.md` | Read skill and init playbook; engine v0.1.5; `impeccable context` exited 0. `PRODUCT.md` records the brief. |
| Taste: design-taste-frontend | `.agents/skills/design-taste-frontend/SKILL.md` | Read design, redesign, and pre-flight requirements. Project dials set to 6 / 3 / 3. |
| Taste: redesign-existing-projects | `.agents/skills/redesign-existing-projects/SKILL.md` | Read and applied its audit checklist to Phase 1. |
| Humanizer 3.0.0 | `.agents/skills/humanizer/SKILL.md` | Read and loaded, including file-mode instructions. Used on authored audit prose; unchanged source excerpts are exempt. Public copy review is pending Phase 5. |

The installed skills are available directly in this workspace and can be discovered by later Codex turns. Their source hashes are in `skills-lock.json`; the requested Taste dial override changes the local file after installation.

## Reinstallation

Run from the project root:

```sh
npx impeccable install --providers=codex --project --yes
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend --agent codex --yes
npx skills add https://github.com/Leonxlnx/taste-skill --skill redesign-existing-projects --agent codex --yes
npx skills add blader/humanizer --agent codex --yes
```

Set `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 3`, and `VISUAL_DENSITY: 3` in the project Taste skill after reinstalling. Use these same values in its project baseline paragraph. The dials provide some compositional variation, restrained interaction feedback, and space for imagery without increasing motion or hiding content.

The `.gitignore` includes Impeccable's recommended block from the installed package's `README.repo.md`. Skill payloads and machine-specific hooks are also ignored. Manual skill and detector execution does not depend on approving automatic editor hooks.
