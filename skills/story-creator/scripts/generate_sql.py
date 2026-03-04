#!/usr/bin/env python3
"""
Generates a SQL INSERT statement for the Hravá kniha `books` table
from a story JSON file.

Usage:
  python generate_sql.py story.json \
    --id "piratske-dobrodruzstvi" \
    --title "Pirátské dobrodružství" \
    --description "Vydej se na moře a hledej poklad!" \
    --category "dobrodruzne" \
    --difficulty "střední" \
    --cover-color "#b7410e" \
    --sort-order 20 \
    [--is-free] \
    [--coming-soon]
"""

import json
import sys
import argparse


def escape_sql_string(s):
    """Escape single quotes for SQL."""
    return s.replace("'", "''")


def main():
    parser = argparse.ArgumentParser(description="Generate SQL INSERT for books table")
    parser.add_argument("story_file", help="Path to story JSON file")
    parser.add_argument("--id", required=True, help="Book slug ID (e.g. piratske-dobrodruzstvi)")
    parser.add_argument("--title", required=True, help="Book title in Czech")
    parser.add_argument("--description", required=True, help="Short description (1-2 sentences)")
    parser.add_argument("--category", default="dobrodruzne",
                        choices=["detske", "fantasy", "scifi", "dobrodruzne", "zahadne"])
    parser.add_argument("--difficulty", default="střední",
                        choices=["snadné", "střední", "těžké"])
    parser.add_argument("--cover-color", default="#8B4513", help="Hex cover background color")
    parser.add_argument("--sort-order", type=int, default=10, help="Sort order in library")
    parser.add_argument("--is-free", action="store_true", help="Mark as free book")
    parser.add_argument("--coming-soon", action="store_true", help="Mark as coming soon")
    parser.add_argument("--output", "-o", help="Output SQL file path (default: stdout)")

    args = parser.parse_args()

    with open(args.story_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Handle both raw story_data and wrapped format
    if "story_data" in data:
        story_data = data["story_data"]
    elif "nodes" in data:
        story_data = data
    else:
        print("ERROR: JSON must contain either 'story_data' or 'nodes'", file=sys.stderr)
        sys.exit(1)

    # Extract cover image from start node
    start_node = story_data.get("start_node", "")
    start = story_data.get("nodes", {}).get(start_node, {})
    start_image = start.get("image", "")

    # Derive cover image (portrait version) from start node image
    if "picsum.photos/seed/" in start_image:
        seed = start_image.split("/seed/")[1].split("/")[0]
        cover_image = f"https://picsum.photos/seed/{seed}/400/600"
    else:
        cover_image = start_image

    # Serialize story_data
    story_json = json.dumps(story_data, ensure_ascii=False, separators=(',', ':'))

    sql = f"""INSERT INTO books (id, title, description, cover_image, cover_color, difficulty, category, story_data, coming_soon, is_free, is_published, sort_order)
VALUES (
  '{escape_sql_string(args.id)}',
  '{escape_sql_string(args.title)}',
  '{escape_sql_string(args.description)}',
  '{escape_sql_string(cover_image)}',
  '{escape_sql_string(args.cover_color)}',
  '{escape_sql_string(args.difficulty)}',
  '{escape_sql_string(args.category)}',
  '{escape_sql_string(story_json)}'::jsonb,
  {str(args.coming_soon).lower()},
  {str(args.is_free).lower()},
  true,
  {args.sort_order}
);"""

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(sql + "\n")
        print(f"SQL written to {args.output}")
    else:
        print(sql)


if __name__ == "__main__":
    main()
