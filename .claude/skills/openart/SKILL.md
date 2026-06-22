---
name: openart
description: "Generate AI art and images via the OpenArt MCP connector. Actions: generate, create image, make art, text-to-image, style transfer, character/model art. Use when the user wants to create images, illustrations, concept art, avatars, or visual assets through OpenArt. Backed by the OpenArt MCP server (https://mcp.openart.ai/mcp)."
argument-hint: "[prompt] [style]"
license: MIT
metadata:
  author: clanton.piaur
  version: "1.0.0"
---

# OpenArt - AI Image Generation

Generate AI art and images through the OpenArt MCP connector. This skill is a thin
wrapper that points at the OpenArt MCP server; the actual generation is done by the
server's tools (named `mcp__openart__*`).

## When to Activate

Activate when the user asks to:
- Generate, create, or make an image / illustration / artwork / concept art
- Produce avatars, characters, stickers, or visual assets via OpenArt
- Do text-to-image, image-to-image, or style transfer through OpenArt

Do NOT activate for: editing existing local files, HTML/CSS design layout, or
non-image tasks.

## How to Use

1. The OpenArt connector is configured in the project `.mcp.json` under the
   `openart` server (endpoint `https://mcp.openart.ai/mcp`).
2. Discover the available tools with ToolSearch using the query `openart`, then
   load the schema for the tool you need before calling it.
3. Call the relevant `mcp__openart__*` tool with the user's prompt and any
   requested style, aspect ratio, or model parameters.
4. Return the resulting image URL(s) or asset references to the user.

## Notes

- OpenArt is a remote (streamable HTTP) MCP server. On first use it may require
  an OAuth sign-in / authorization in the Claude Code connectors UI.
- Outbound network access to `mcp.openart.ai` must be permitted by the
  environment's network policy.
