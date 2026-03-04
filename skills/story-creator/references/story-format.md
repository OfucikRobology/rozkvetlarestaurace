# Story Format Technical Reference

## Database schema: `books` table

```sql
CREATE TABLE books (
  id TEXT PRIMARY KEY,           -- slug: "ztraceny-klic", "zachrana-eeveeho"
  title TEXT NOT NULL,           -- "Ztracený klíč"
  description TEXT,              -- 1-2 sentence hook
  cover_image TEXT,              -- picsum URL 400x600 (portrait for cover)
  cover_color TEXT DEFAULT '#8B4513', -- hex background color
  difficulty TEXT DEFAULT 'střední',  -- snadné | střední | těžké
  category TEXT DEFAULT 'dobrodruzne', -- detske|fantasy|scifi|dobrodruzne|zahadne
  story_data JSONB,             -- the full story tree (see below)
  coming_soon BOOLEAN DEFAULT false,
  is_free BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## story_data JSONB structure

```json
{
  "story_title": "Název příběhu",
  "start_node": "zacatek",
  "nodes": {
    "zacatek": {
      "image": "https://picsum.photos/seed/descriptive-english-seed/640/320",
      "text": "Czech story text, 250-400 characters. Present tense, 2nd person.",
      "choices": [
        {
          "text": "Prozkoumej tajemnou jeskyni vlevo",
          "next_node": "jeskyne_vstup"
        },
        {
          "text": "Vydej se po osvětlené stezce vpravo",
          "next_node": "stezka_svetlo"
        }
      ]
    },
    "konec_vitezstvi": {
      "image": "https://picsum.photos/seed/celebration-treasure/640/320",
      "text": "Gratulace! Dokázal/a jsi to! Popis vítězství...",
      "choices": [
        {
          "text": "Hrát znovu 🔄",
          "next_node": "zacatek"
        }
      ]
    }
  }
}
```

## Conventions from existing stories

### Node IDs
- Czech, lowercase, underscores: `zacatek`, `les_vstup`, `setkani_s_drakem`
- Endings prefixed with purpose: `vitezstvi_01`, `konec_spatny`, `game_over`
- Descriptive of scene content

### Image seeds
- English, lowercase, hyphens: `sunny-meadow-forest`, `dark-cave-entrance`
- 2-4 descriptive words capturing the scene mood
- Size always `640/320` (landscape, 2:1 ratio)
- Cover images use `400/600` (portrait, 2:3 ratio)

### Text style
- Present tense, 2nd person singular: "Stojíš...", "Vidíš...", "Cítíš..."
- 250-400 characters per node
- Sensory descriptions: what you see, hear, feel
- Age-appropriate vocabulary

### Choice text
- 8-15 words
- Imperative or action-oriented: "Prozkoumej...", "Uteč...", "Zeptej se..."
- Clear about immediate action, hints at consequence

### End node pattern
- Exactly 1 choice: `{"text": "Hrát znovu 🔄", "next_node": "<start_node>"}`
- The GameEngine detects this: `choices.length === 1 && choices[0].next_node === story.start_node`

### Story statistics from existing stories
| Metric | Story 1 (Klíč) | Story 2 (Eevee) | Guideline |
|--------|----------------|-----------------|-----------|
| Total nodes | 35 | 40 | 15-45 |
| Victory endings | 1 | 1 | 1-2 |
| Failure endings | ~5 | ~8 | 3-8 |
| Choices per node | 2 | 2 | 2 (rarely 3) |
| Path depth | 5-8 | 6-10 | 5-10 |
| Start branches | 2 | 3 | 2-3 |

### Category values
- `detske` — Dětské (Children's)
- `fantasy` — Fantasy
- `scifi` — Sci-fi
- `dobrodruzne` — Dobrodružné (Adventure)
- `zahadne` — Záhadné (Mystery)

### Difficulty values
- `snadné` — Easy (fewer nodes, simpler choices, younger audience)
- `střední` — Medium (standard complexity)
- `těžké` — Hard (more nodes, subtle consequences, older audience)

## SQL INSERT template

```sql
INSERT INTO books (id, title, description, cover_image, cover_color, difficulty, category, story_data, coming_soon, is_free, is_published, sort_order)
VALUES (
  'story-slug-id',
  'Název příběhu',
  'Krátký popis příběhu v 1-2 větách.',
  'https://picsum.photos/seed/cover-seed/400/600',
  '#hexcolor',
  'střední',
  'dobrodruzne',
  '{...story_data JSON...}'::jsonb,
  false,
  false,
  true,
  10
);
```
