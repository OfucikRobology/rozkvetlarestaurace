---
name: story-creator
description: |
  Interactive story generator for the "Hravá kniha" (Playful Book) project. Creates complete branching "choose your own adventure" stories in Czech with images, ready for Supabase insertion.
  Use this skill whenever the user wants to: create a new interactive story, write a branching narrative, add a book to the Hravá kniha library, generate a story with choices, build an adventure game story, or produce content for the interactive book platform. Also trigger when the user mentions "příběh" (story), "kniha" (book), "dobrodružství" (adventure), or talks about writing stories with choices/branching paths for children.
---

# Story Creator for Hravá kniha

You are creating interactive branching stories ("choose your own adventure") for a Czech children's web app called **Hravá kniha**. Each story is stored as a JSON object in a Supabase `books` table and played through a game engine that shows text, an image, and 2+ choices at each node.

## Before you start

Read the reference file at `references/story-format.md` (relative to this skill's directory) to understand the exact JSON schema, naming conventions, and patterns from existing stories. That file contains the complete technical specification — this document focuses on the creative and workflow aspects.

## Workflow overview

1. **Gather requirements** — theme, category, difficulty, target age, approximate size
2. **Plan the story graph** — sketch the branching structure before writing
3. **Write all nodes** — text, choices, images for every node
4. **Validate** — run the validation script to catch structural issues
5. **Generate SQL** — produce an INSERT statement ready for Supabase
6. **Review with the user** — present a summary and let them adjust

## Step 1: Gather requirements

Ask the user for these (suggest defaults if they don't specify):

| Parameter | Options | Default |
|-----------|---------|---------|
| **Téma / námět** | Anything — pirates, space, animals, fairy tales... | *(required)* |
| **Kategorie** | `detske`, `fantasy`, `scifi`, `dobrodruzne`, `zahadne` | `dobrodruzne` |
| **Obtížnost** | `snadné`, `střední`, `těžké` | `střední` |
| **Věk** | 4-6, 5-8, 7-10, 8-12 | 6-9 |
| **Rozsah** | malý (15-20 uzlů), střední (25-35), velký (35-45) | střední |
| **Jazyk příběhu** | čeština | čeština |

## Step 2: Plan the story graph

Before writing any text, design the branching structure. This is the most important step — a well-designed graph makes for a satisfying reading experience.

**Design principles from existing stories:**

- **Funnel shape**: Start with 2-3 initial branches that sometimes converge at key story moments, then diverge again toward endings. This means readers feel their choices matter while the story stays coherent.
- **Multiple ending types**: Aim for 1-2 "victory" endings (the best outcomes), 2-3 "partial success" endings, and 3-5 "failure" endings. Failures should feel like natural consequences of choices, not arbitrary punishment.
- **Choice balance**: Each node typically offers exactly 2 choices. Occasionally 3 for important decisions, but never more. Choices should present genuine dilemmas — avoid obvious "right answer" vs "obviously wrong" patterns.
- **Depth**: Most paths through the story should be 6-10 nodes long. Some shortcuts and some longer scenic routes keep things interesting.
- **No dead ends**: Every path must reach an ending node. Ending nodes loop back to the start node (`start_node`) with a single "Hrát znovu" (Play again) choice.

**⚠️ HARD RULES — the story MUST satisfy all of these:**

1. **Minimum node count**: The total number of nodes MUST meet or exceed the lower bound of the requested size range (malý ≥ 15, střední ≥ 25, velký ≥ 35). Count your nodes in the outline phase and add more branches if you're under the minimum. Do NOT proceed to writing text until the outline hits the target.
2. **Every non-ending node MUST have at least 2 choices.** A node with only 1 choice that does NOT loop back to `start_node` is a "linear corridor" — these are forbidden. If you find yourself writing a node with a single forward choice, either (a) add a second choice branching to a different path, or (b) merge the node's content into its parent or child. The only nodes allowed to have exactly 1 choice are ending nodes (where that single choice is "Hrát znovu 🔄" → `start_node`).
3. **Maximum 40% endings**: Ending nodes should be at most 40% of total nodes. If you have 15 nodes, no more than 6 can be endings. The rest must be meaningful decision points.

Write out the graph as a simple outline before proceeding to full text. **Count the nodes and verify rules 1-3 before moving on.** Show the outline to the user.

## Step 3: Write all nodes

For each node, produce:

### Text (field: `text`)
- **Length**: 250-400 characters (Czech). This is about 2-3 short paragraphs displayed on a mobile screen.
- **Style**: Present tense, second person ("Stojíš před...", "Vidíš..."). Vivid, sensory descriptions. Match the tone to the age group — simpler vocabulary for younger readers, more nuance for older ones.
- **Ending nodes**: Make endings feel conclusive. Victory endings are celebratory, failure endings explain what went wrong with a gentle tone (no scaring young kids).

### Choices (field: `choices`)
- Each choice is `{"text": "...", "next_node": "node_id"}`
- **Choice text**: 8-15 words in Czech. Action-oriented, starting with a verb ("Prozkoumej jeskyni", "Uteč zpátky do lesa"). The reader should understand the immediate consequence of their action.
- Ending nodes have exactly one choice: `{"text": "Hrát znovu 🔄", "next_node": "<start_node_id>"}`

### Images (field: `image`)
- Use `https://picsum.photos/seed/<descriptive-english-seed>/640/320`
- The seed should be a 2-4 word English description of the scene, joined by hyphens: `forest-moonlight-path`, `underwater-coral-reef`, `mountain-cabin-snow`
- Each node gets a unique, scene-appropriate image seed. Avoid repeating seeds.

### Node IDs
- Czech lowercase with underscores: `zacatek`, `jeskyne_vstup`, `setkani_s_drakem`, `vitezstvi_01`
- Descriptive of the scene/event
- Start node is typically `zacatek` or similar

## Step 4: Validate the story

After writing all nodes, run the validation script bundled with this skill:

```bash
python <skill-dir>/scripts/validate_story.py <story-json-file>
```

This checks:
- All `next_node` references point to existing nodes
- `start_node` exists in `nodes`
- Every ending node loops back to `start_node`
- No orphaned nodes (unreachable from start)
- Text length within bounds
- At least 2 ending nodes exist
- No duplicate node IDs

Fix any issues before proceeding.

## Step 5: Generate the SQL INSERT

The book needs both **metadata** and the **story_data** JSONB. Use the helper script:

```bash
python <skill-dir>/scripts/generate_sql.py <story-json-file> \
  --id "slug-id" \
  --title "Název knihy" \
  --description "Krátký popis 1-2 věty" \
  --category "dobrodruzne" \
  --difficulty "střední" \
  --cover-color "#hexcolor" \
  --sort-order 20 \
  [--is-free] \
  [--coming-soon]
```

This produces a complete SQL INSERT for the `books` table. The cover image is auto-generated from the start node's image seed.

Alternatively, you can insert directly via the Supabase MCP `execute_sql` tool if available and the user wants immediate insertion.

## Step 6: Review

Present the user with:
- Story title and description
- A text summary of the branching structure (which paths lead where)
- Total node count and ending count
- The SQL file or offer to insert directly

## Cover colors

Pick a cover color that matches the story's mood:
- Forest/nature: `#2d5a27`, `#1a472a`
- Ocean/water: `#1a3a5c`, `#0d4f8b`
- Fantasy/magic: `#5b2c6f`, `#7d3c98`
- Space/sci-fi: `#1b2631`, `#2c3e50`
- Mystery/dark: `#1c1c1c`, `#2c2c2c`
- Warm/adventure: `#b7410e`, `#d35400`
- Fairy tale/whimsical: `#c0392b`, `#e74c3c`

## Example story structure (small ~18 nodes)

Every non-ending node below has 2 choices (indicated by the branches). No linear corridors allowed.

```
zacatek (2 choices)
├── cesta_lesem (2 choices)
│   ├── setkani_s_vilem (2 choices)
│   │   ├── pomoc_vilovi (2 choices)
│   │   │   ├── odmena_vila [VICTORY]
│   │   │   └── vilova_lest [FAILURE]
│   │   └── ignoruj_vila (2 choices)
│   │       ├── ztracen_v_lese [FAILURE]
│   │       └── nahodny_objev [PARTIAL SUCCESS]
│   └── temna_stezka (2 choices)
│       ├── past_v_lese [FAILURE]
│       └── unik_z_pasti (2 choices)
│           ├── navrat_na_cestu ──▶ converges to cesta_rekou
│           └── skryta_jeskyne [PARTIAL SUCCESS]
└── cesta_rekou (2 choices)
    ├── ostrov (2 choices)
    │   ├── hledani_pokladu (2 choices)
    │   │   ├── poklad [VICTORY]
    │   │   └── bouri [FAILURE]
    │   └── pruzkum_plaze (2 choices)
    │       ├── lod_na_obzoru [PARTIAL SUCCESS]
    │       └── tajny_tunel ──▶ converges to jeskyne
    └── vodopad (2 choices)
        ├── jeskyne (2 choices)
        │   ├── krystaly [PARTIAL SUCCESS]
        │   └── temnota [FAILURE]
        └── za_vodopadem (2 choices)
            ├── zaklinaci_portal [VICTORY]
            └── kluzka_skala [FAILURE]
```

Note: `──▶ converges to X` means the choice's `next_node` points to an already-defined node, creating path convergence. This is a key design tool — it makes the graph feel rich without needing too many nodes.

## Important notes

- All story text is in **Czech**. Maintain consistent Czech grammar and diacritics.
- The web app's `GameEngine` detects end nodes by: `node.choices.length === 1 && node.choices[0].next_node === start_node`. Make sure all endings follow this pattern exactly.
- The `books` table uses `id TEXT PRIMARY KEY` — use a descriptive slug like `piratske-dobrodruzstvi` or `zachrana-jednozorce`.
- Stories should be engaging, age-appropriate, and educational where possible. Avoid violence, scary content for young ages, and anything inappropriate.
- Image seeds should paint a vivid picture even though picsum returns random photos — the seed serves as a thematic hint and ensures consistent images across sessions.
