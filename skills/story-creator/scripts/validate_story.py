#!/usr/bin/env python3
"""
Validates a Hravá kniha interactive story JSON file.
Checks structural integrity, reachability, endings, and text constraints.

Usage:
  python validate_story.py story.json
  python validate_story.py story.json --strict
"""

import json
import sys
from collections import deque


def validate_story(data, strict=False):
    errors = []
    warnings = []

    # Top-level structure
    if "story_title" not in data:
        errors.append("Missing 'story_title'")
    if "start_node" not in data:
        errors.append("Missing 'start_node'")
        return errors, warnings  # Can't continue without start_node
    if "nodes" not in data or not isinstance(data["nodes"], dict):
        errors.append("Missing or invalid 'nodes' object")
        return errors, warnings

    start = data["start_node"]
    nodes = data["nodes"]

    # Start node exists
    if start not in nodes:
        errors.append(f"start_node '{start}' not found in nodes")
        return errors, warnings

    # Check each node
    all_next_nodes = set()
    end_nodes = []
    node_ids_with_issues = []

    for nid, node in nodes.items():
        # Required fields
        if "text" not in node:
            errors.append(f"Node '{nid}': missing 'text'")
        if "choices" not in node or not isinstance(node["choices"], list):
            errors.append(f"Node '{nid}': missing or invalid 'choices'")
            continue
        if "image" not in node:
            warnings.append(f"Node '{nid}': missing 'image'")

        # Text length
        text = node.get("text", "")
        if len(text) < 50:
            warnings.append(f"Node '{nid}': text very short ({len(text)} chars)")
        if len(text) > 500 and strict:
            warnings.append(f"Node '{nid}': text long ({len(text)} chars, recommended <400)")

        # Choices
        choices = node.get("choices", [])
        if len(choices) == 0:
            errors.append(f"Node '{nid}': has 0 choices (must have at least 1)")
        elif len(choices) > 3:
            warnings.append(f"Node '{nid}': has {len(choices)} choices (recommended max 3)")

        # Check for end node pattern
        if len(choices) == 1 and choices[0].get("next_node") == start:
            end_nodes.append(nid)
        elif len(choices) == 1:
            # Linear corridor: non-ending node with only 1 choice
            errors.append(
                f"Node '{nid}': linear corridor — has only 1 choice but is not an ending node. "
                f"Every non-ending node must have at least 2 choices."
            )

        # Validate choice references
        for i, choice in enumerate(choices):
            if "text" not in choice:
                errors.append(f"Node '{nid}', choice {i}: missing 'text'")
            if "next_node" not in choice:
                errors.append(f"Node '{nid}', choice {i}: missing 'next_node'")
            else:
                next_n = choice["next_node"]
                all_next_nodes.add(next_n)
                if next_n not in nodes:
                    errors.append(f"Node '{nid}', choice {i}: next_node '{next_n}' does not exist")

            # Choice text length
            ctext = choice.get("text", "")
            if len(ctext) < 3:
                warnings.append(f"Node '{nid}', choice {i}: choice text very short")
            if len(ctext) > 80 and strict:
                warnings.append(f"Node '{nid}', choice {i}: choice text long ({len(ctext)} chars)")

        # Node ID convention
        if nid != nid.lower():
            warnings.append(f"Node '{nid}': ID should be lowercase")
        if " " in nid:
            errors.append(f"Node '{nid}': ID must not contain spaces")

    # Reachability check (BFS from start)
    reachable = set()
    queue = deque([start])
    while queue:
        current = queue.popleft()
        if current in reachable:
            continue
        reachable.add(current)
        node = nodes.get(current)
        if node and "choices" in node:
            for c in node["choices"]:
                nn = c.get("next_node")
                if nn and nn in nodes and nn not in reachable:
                    queue.append(nn)

    orphans = set(nodes.keys()) - reachable
    if orphans:
        errors.append(f"Orphaned nodes (unreachable from start): {', '.join(sorted(orphans))}")

    # Summary stats
    total = len(nodes)
    reachable_count = len(reachable)

    # Must have at least 2 endings
    if len(end_nodes) < 2:
        warnings.append(f"Only {len(end_nodes)} ending node(s) found (recommended: 3+)")
    if len(end_nodes) == 0:
        errors.append("No ending nodes found (nodes with single choice looping to start)")

    # Minimum node count
    if total < 15:
        errors.append(f"Story has only {total} nodes (minimum 15 required for the smallest size)")

    # Endings ratio: max 40% endings
    if total > 0 and len(end_nodes) / total > 0.4:
        warnings.append(
            f"Too many endings: {len(end_nodes)}/{total} = "
            f"{len(end_nodes)/total*100:.0f}% (recommended max 40%)"
        )

    return errors, warnings, {
        "total_nodes": total,
        "reachable_nodes": reachable_count,
        "end_nodes": len(end_nodes),
        "end_node_ids": end_nodes,
        "orphaned_nodes": list(orphans),
    }


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_story.py <story.json> [--strict]")
        sys.exit(1)

    filepath = sys.argv[1]
    strict = "--strict" in sys.argv

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Handle both raw story_data and full book record
    if "story_data" in data:
        story = data["story_data"]
    elif "nodes" in data:
        story = data
    else:
        print("ERROR: JSON must contain either 'story_data' or 'nodes' at top level")
        sys.exit(1)

    result = validate_story(story, strict=strict)
    if len(result) == 2:
        errors, warnings = result
        stats = {}
    else:
        errors, warnings, stats = result

    # Print results
    if stats:
        print(f"=== Story: {story.get('story_title', 'Unknown')} ===")
        print(f"Total nodes: {stats['total_nodes']}")
        print(f"Reachable nodes: {stats['reachable_nodes']}")
        print(f"End nodes: {stats['end_nodes']} ({', '.join(stats['end_node_ids'])})")
        if stats['orphaned_nodes']:
            print(f"Orphaned: {', '.join(stats['orphaned_nodes'])}")
        print()

    if errors:
        print(f"ERRORS ({len(errors)}):")
        for e in errors:
            print(f"  ❌ {e}")
    else:
        print("✅ No errors found!")

    if warnings:
        print(f"\nWARNINGS ({len(warnings)}):")
        for w in warnings:
            print(f"  ⚠️  {w}")

    if errors:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
