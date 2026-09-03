/**
 * AI Chat Tools - Functions the AI can call to fetch real data and reason about it.
 * Enables multifunctional, data-grounded responses.
 */

import { getAllProducts, getProductBySlug } from "./productsData";
import { getAllWashingStations, getWashingStationBySlug } from "./washingStationsData";
import { getAllBlogPosts } from "./blogData";

export const AI_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "search_products",
      description:
        "Search coffee products by name, flavor notes, processing method, region, or washing station. Use when the user asks about products, coffees, flavors, pricing, or what's available.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search term - product name, flavor (e.g. berry, citrus), processing (washed, natural, honey), region, or washing station name",
          },
          limit: {
            type: "number",
            description: "Max number of products to return (default 10)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_product_details",
      description: "Get full details for a specific product by slug. Use when the user asks about a specific coffee (e.g. Humure Natural, Bugoyi Washed).",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "Product slug (e.g. humure-natural, bugoyi-washed)",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_washing_stations",
      description:
        "Get washing stations. Use when the user asks about washing stations, farms, origins, locations, or where the coffee comes from.",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Optional: filter by station name or region",
          },
          limit: {
            type: "number",
            description: "Max number to return (default 25)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_washing_station_details",
      description: "Get full details for a specific washing station by slug.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "Station slug (e.g. humure, fugi, gitoki)",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_blog_posts",
      description:
        "Get blog posts. Use when the user asks about coffee knowledge, processing methods, sustainability, women in coffee, or wants to read articles.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Optional: farming, women-in-coffee, events, sustainability, news",
          },
          limit: {
            type: "number",
            description: "Max posts to return (default 5)",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_web",
      description:
        "Search the web for real-time information. Use when the user asks about: coffee industry trends, Rwanda news, global coffee prices, market data, competitor info, general coffee knowledge beyond Baho's site, weather in Rwanda, or any topic not in our internal data. Requires SERPER_API_KEY.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query - be specific (e.g. 'Rwanda coffee export 2024', 'specialty coffee market trends')",
          },
          num: {
            type: "number",
            description: "Number of results (default 5, max 10)",
          },
        },
        required: ["query"],
      },
    },
  },
];

type ToolName = "search_products" | "get_product_details" | "get_washing_stations" | "get_washing_station_details" | "get_blog_posts" | "search_web";

export async function executeTool(name: ToolName, args: Record<string, unknown>): Promise<string> {
  try {
    switch (name) {
      case "search_products": {
        const query = (args.query as string)?.toLowerCase().trim() || "";
        const limit = Math.min((args.limit as number) || 10, 20);
        const products = getAllProducts();
        const terms =
          query && !["all", "everything", "list"].includes(query)
            ? query.split(/\s+/).filter(Boolean)
            : [];
        const filtered = terms.length
          ? products.filter((p) => {
              const searchable = [
                p.name,
                p.washingStation,
                p.region,
                p.processingMethod,
                ...(p.flavorNotes || []),
              ]
                .join(" ")
                .toLowerCase();
              return terms.every((t) => searchable.includes(t));
            })
          : products;
        const results = filtered.slice(0, limit).map((p) => ({
          name: p.name,
          slug: p.slug,
          flavorNotes: p.flavorNotes,
          region: p.region,
          processingMethod: p.processingMethod,
          washingStation: p.washingStation,
          packagingOptions: p.packagingOptions,
          available: p.available,
        }));
        return JSON.stringify(results, null, 2);
      }

      case "get_product_details": {
        const slug = args.slug as string;
        const product = getProductBySlug(slug);
        if (!product) return JSON.stringify({ error: "Product not found" });
        return JSON.stringify(product, null, 2);
      }

      case "get_washing_stations": {
        const search = (args.search as string)?.toLowerCase() || "";
        const limit = Math.min((args.limit as number) || 25, 30);
        let stations = getAllWashingStations();
        if (search) {
          stations = stations.filter((s) => {
            const searchable = [s.name, s.location?.address, s.description].join(" ").toLowerCase();
            return searchable.includes(search) || search.split(/\s+/).some((q) => searchable.includes(q));
          });
        }
        const results = stations.slice(0, limit).map((s) => ({
          name: s.name,
          slug: s.slug,
          address: s.location?.address,
          altitude: s.location?.altitude,
          processingMethods: s.processingMethods,
          varieties: s.varieties,
          annualCapacity: s.annualCapacity,
          established: s.established,
          manager: s.manager?.name,
        }));
        return JSON.stringify(results, null, 2);
      }

      case "get_washing_station_details": {
        const slug = args.slug as string;
        const station = getWashingStationBySlug(slug);
        if (!station) return JSON.stringify({ error: "Washing station not found" });
        return JSON.stringify(station, null, 2);
      }

      case "get_blog_posts": {
        const category = args.category as string;
        const limit = Math.min((args.limit as number) || 5, 10);
        let posts = getAllBlogPosts();
        if (category) {
          posts = posts.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
        }
        const results = posts.slice(0, limit).map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          category: p.category,
          publishedAt: p.publishedAt,
          author: p.author,
        }));
        return JSON.stringify(results, null, 2);
      }

      case "search_web": {
        const apiKey = process.env.SERPER_API_KEY;
        if (!apiKey) {
          return JSON.stringify({
            error: "Web search not configured. Set SERPER_API_KEY for external data.",
            hint: "Use internal tools (search_products, get_washing_stations) for Baho-specific questions.",
          });
        }
        const query = (args.query as string)?.trim();
        if (!query) return JSON.stringify({ error: "Search query is required" });
        const num = Math.min((args.num as number) || 5, 10);
        try {
          const res = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: {
              "X-API-KEY": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ q: query, num }), // Serper uses "q" for search query
          });
          if (!res.ok) {
            const err = await res.text();
            return JSON.stringify({ error: `Search failed: ${res.status}`, details: err });
          }
          const data = (await res.json()) as {
            organic?: Array<{ title: string; link: string; snippet: string }>;
            knowledgeGraph?: { title?: string; description?: string };
            answer?: string;
          };
          const organic = data.organic?.slice(0, num) || [];
          const kg = data.knowledgeGraph;
          const answer = data.answer;
          const result = {
            answer: answer || null,
            knowledgeGraph: kg ? { title: kg.title, description: kg.description } : null,
            results: organic.map((r) => ({ title: r.title, link: r.link, snippet: r.snippet })),
          };
          return JSON.stringify(result, null, 2);
        } catch (err) {
          console.error("Serper search error:", err);
          return JSON.stringify({ error: "Web search failed", details: String(err) });
        }
      }

      default:
        return JSON.stringify({ error: `Unknown tool: ${name}` });
    }
  } catch (err) {
    console.error(`AI tool error (${name}):`, err);
    return JSON.stringify({ error: "Failed to execute tool" });
  }
}
