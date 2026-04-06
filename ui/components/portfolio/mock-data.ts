import type { Course, CourseEnrollment } from "@template/contracts";

export const MOCK_COURSES: Course[] = [
  {
    id: "course-001",
    title: "React 19 Fundamentals",
    description: "Master React 19 with the new Compiler, Server Components, and modern patterns.",
    instructor: "Sarah Chen",
    level: "beginner",
    status: "published",
    thumbnailUrl: undefined,
    duration: 480,
    lessonsCount: 24,
    rating: 4.8,
    enrolledCount: 1247,
    tags: ["React", "TypeScript", "Frontend"],
    images: [
      "https://placehold.co/800x450/1e3a5f/94a3b8?text=React+Hooks",
      "https://placehold.co/800x450/172554/7dd3fc?text=Components",
      "https://placehold.co/800x450/1e1b4b/a78bfa?text=Server+Components",
      "https://placehold.co/800x450/0c4a6e/38bdf8?text=Patterns",
      "https://placehold.co/800x450/1e293b/e2e8f0?text=React+Compiler",
    ],
    longDescription: `## What You'll Learn

React 19 introduces a paradigm shift in how we build user interfaces. This course guides you through the **React Compiler**, which eliminates the need for manual memoization, and the new **Server Components** model that lets you fetch data directly in your component tree without client-side waterfalls.

## Why React 19 Matters

The React team spent years developing a compiler that understands your component tree deeply enough to optimize re-renders automatically. Gone are the days of sprinkling \`useMemo\` and \`useCallback\` everywhere — the compiler handles all of that. Combined with the streaming architecture of React 19, you can build apps that feel instantaneous.

## Course Approach

Every concept is introduced with a real-world problem first, then the React 19 solution. By the end, you'll have built a full feature — a live-updating dashboard — using every major React 19 primitive.`,
    prerequisites: [
      "Basic JavaScript (ES6+)",
      "HTML & CSS fundamentals",
      "npm/yarn package management",
    ],
    syllabus: [
      {
        title: "Getting Started",
        duration: 60,
        lessons: [
          "Setting up your environment",
          "Understanding the React model",
          "Your first component",
        ],
      },
      {
        title: "React Compiler Deep Dive",
        duration: 90,
        lessons: [
          "Why memoization is gone",
          "How the compiler works",
          "Opting out safely",
          "Debugging compiler output",
        ],
      },
      {
        title: "Server Components",
        duration: 120,
        lessons: [
          "Client vs Server components",
          "Data fetching in Server Components",
          "Streaming with Suspense",
          "Composition patterns",
        ],
      },
      {
        title: "Forms and Actions",
        duration: 90,
        lessons: [
          "useActionState hook",
          "Progressive enhancement",
          "Optimistic updates",
          "Error boundaries",
        ],
      },
      {
        title: "Capstone: Live Dashboard",
        duration: 120,
        lessons: [
          "Project setup",
          "Building the data layer",
          "Streaming widgets",
          "Deploying to Vercel",
        ],
      },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "course-002",
    title: "Advanced TypeScript Patterns",
    description:
      "Deep dive into generics, conditional types, mapped types, and real-world patterns.",
    instructor: "Alex Rivera",
    level: "advanced",
    status: "published",
    thumbnailUrl: undefined,
    duration: 600,
    lessonsCount: 32,
    rating: 4.9,
    enrolledCount: 892,
    tags: ["TypeScript", "Patterns", "Architecture"],
    images: [
      "https://placehold.co/800x450/1c1917/fbbf24?text=Generics",
      "https://placehold.co/800x450/292524/f97316?text=Conditional+Types",
      "https://placehold.co/800x450/1a1a2e/e879f9?text=Mapped+Types",
      "https://placehold.co/800x450/27272a/a3e635?text=Utility+Types",
    ],
    longDescription: `## Beyond the Basics

Most TypeScript tutorials stop at interfaces and enums. This course picks up where they leave off. You'll master **conditional types**, **infer**, **template literal types**, and the full suite of mapped type modifiers that separate senior engineers from the rest.

## Type-Level Programming

TypeScript's type system is Turing-complete — you can compute types at compile time just as you compute values at runtime. We'll build type-safe parsers, builders, and state machines entirely in the type layer. You'll never reach for \`any\` or \`as\` again.

## Real-World Architecture

Theory without practice is useless. Each section closes with a real pattern extracted from production codebases: discriminated union state machines, branded primitives to prevent ID mix-ups, type-safe event emitters, and exhaustive switch checking. These are patterns you'll use on day one.`,
    prerequisites: [
      "TypeScript fundamentals (interfaces, enums, basic generics)",
      "6+ months of TypeScript in production",
      "Familiarity with a JS framework (React, Vue, or Node)",
    ],
    syllabus: [
      {
        title: "Generics Mastery",
        duration: 120,
        lessons: [
          "Variance and covariance",
          "Constrained generics",
          "Default type parameters",
          "Generic factories",
        ],
      },
      {
        title: "Conditional & Infer",
        duration: 150,
        lessons: [
          "Conditional type syntax",
          "Distributive conditionals",
          "The infer keyword",
          "Recursive conditional types",
          "Building DeepPartial",
        ],
      },
      {
        title: "Mapped Types",
        duration: 120,
        lessons: [
          "Mapping over object keys",
          "Modifier flags (readonly, ?)",
          "Key remapping with as",
          "Template literal keys",
        ],
      },
      {
        title: "Branded Types & Safety",
        duration: 90,
        lessons: [
          "The ID mix-up problem",
          "Opaque types in TypeScript",
          "Runtime validation bridges",
          "Integrating with Zod",
        ],
      },
      {
        title: "Architecture Patterns",
        duration: 120,
        lessons: [
          "Discriminated union state machines",
          "Builder pattern with type safety",
          "Type-safe event emitters",
          "Exhaustive checks",
        ],
      },
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "course-003",
    title: "Next.js 15 Full Stack",
    description: "Build production-ready apps with App Router, Server Actions, and streaming.",
    instructor: "Jordan Lee",
    level: "intermediate",
    status: "published",
    thumbnailUrl: undefined,
    duration: 720,
    lessonsCount: 36,
    rating: 4.7,
    enrolledCount: 2103,
    tags: ["Next.js", "React", "Full Stack"],
    images: [
      "https://placehold.co/800x450/0f172a/38bdf8?text=App+Router",
      "https://placehold.co/800x450/1e1b4b/c084fc?text=Server+Actions",
      "https://placehold.co/800x450/052e16/4ade80?text=Streaming+SSR",
      "https://placehold.co/800x450/18181b/f472b6?text=Deployment",
      "https://placehold.co/800x450/1c1917/fb923c?text=API+Routes",
    ],
    longDescription: `## The Full-Stack Framework

Next.js 15 brings the App Router to maturity. This course teaches you how to architect a complete SaaS application — from authentication and database access to streaming UI and deployment — using nothing but Next.js and its ecosystem.

## Server Actions Replace Your API

One of the biggest shifts in Next.js 15 is using **Server Actions** as your mutation layer. Instead of building separate REST endpoints, you co-locate server-side logic with the UI that triggers it. We cover progressive enhancement, optimistic updates, error handling, and form state management using the new \`useActionState\` hook.

## Production-Grade Patterns

This isn't a todo-app tutorial. You'll build a multi-tenant SaaS shell with protected routes via middleware, role-based access, streaming data fetches, and proper caching strategies. Every decision is explained with the *why* — trade-offs between static generation, incremental regeneration, and dynamic rendering.`,
    prerequisites: [
      "React fundamentals (hooks, components, props)",
      "Basic TypeScript knowledge",
      "Understanding of HTTP and REST APIs",
      "Node.js and npm familiarity",
    ],
    syllabus: [
      {
        title: "App Router Architecture",
        duration: 90,
        lessons: [
          "File-system routing model",
          "Layouts and nested layouts",
          "Route groups and parallel routes",
          "Loading and error boundaries",
        ],
      },
      {
        title: "Data Fetching Strategies",
        duration: 120,
        lessons: [
          "fetch() in Server Components",
          "Static vs dynamic rendering",
          "Revalidation strategies",
          "Streaming with Suspense",
        ],
      },
      {
        title: "Server Actions",
        duration: 150,
        lessons: [
          "What Server Actions replace",
          "Form actions and useActionState",
          "Optimistic UI patterns",
          "File uploads and multipart",
          "Security considerations",
        ],
      },
      {
        title: "Authentication & Middleware",
        duration: 120,
        lessons: [
          "Middleware execution model",
          "Auth with Supabase",
          "Protecting routes",
          "Role-based access control",
        ],
      },
      {
        title: "Deployment & Performance",
        duration: 120,
        lessons: [
          "Edge vs Node.js runtime",
          "Image optimization",
          "Core Web Vitals",
          "Vercel deployment pipeline",
          "Environment variables management",
        ],
      },
      {
        title: "Capstone: SaaS Template",
        duration: 120,
        lessons: [
          "Multi-tenant architecture",
          "Subscription gating",
          "Dashboard with streaming KPIs",
          "CI/CD with GitHub Actions",
        ],
      },
    ],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-04-01T00:00:00Z",
  },
  {
    id: "course-004",
    title: "Tailwind CSS Mastery",
    description: "From utility classes to custom design systems with Tailwind CSS 4.",
    instructor: "Morgan Wu",
    level: "beginner",
    status: "published",
    thumbnailUrl: undefined,
    duration: 360,
    lessonsCount: 18,
    rating: 4.6,
    enrolledCount: 3456,
    tags: ["CSS", "Tailwind", "Design"],
    images: [
      "https://placehold.co/800x450/0e7490/67e8f9?text=Design+System",
      "https://placehold.co/800x450/1d4ed8/93c5fd?text=Theme+Tokens",
      "https://placehold.co/800x450/7e22ce/d8b4fe?text=Components",
      "https://placehold.co/800x450/0f766e/5eead4?text=Dark+Mode",
    ],
    longDescription: `## Utility-First, Not Utility-Only

Tailwind CSS 4 is a complete redesign of the framework. Built on CSS custom properties and the new \`@layer\` cascade, it gives you design-token control that was previously only possible with dedicated design-system tools. This course starts at the foundation — *why* utility-first CSS works — before building up to a full component library.

## Design Systems at Scale

You'll learn how to define a coherent design system using Tailwind's \`theme()\` function and CSS variables, ensuring your colors, spacing, and typography are consistent across the entire app. We'll extract reusable component variants with CVA (class-variance-authority) and tie it all together with the \`cn()\` utility.

## Dark Mode, Responsive Design, and Animations

Practical UI demands responsiveness and accessibility. The course dedicates full sections to Tailwind's responsive breakpoint system, the \`dark:\` variant, and the \`transition\` / \`animate\` utilities for motion. By the end, you'll be able to replicate any design from Figma using only Tailwind.`,
    prerequisites: ["Basic HTML & CSS knowledge", "Familiarity with any JavaScript framework"],
    syllabus: [
      {
        title: "Utility-First Foundations",
        duration: 60,
        lessons: [
          "Why utility-first CSS wins",
          "Tailwind 4 setup with Vite",
          "Core utilities: spacing, typography, color",
          "Responsive design with breakpoints",
        ],
      },
      {
        title: "Design Tokens & Theming",
        duration: 90,
        lessons: [
          "CSS custom properties in Tailwind 4",
          "Defining your color palette",
          "Typography scale",
          "Spacing and sizing system",
          "Dark mode configuration",
        ],
      },
      {
        title: "Component Patterns",
        duration: 90,
        lessons: [
          "cn() utility pattern",
          "CVA for variant components",
          "Composing with @apply (when to use it)",
          "Building a Button system",
          "Building a Card system",
        ],
      },
      {
        title: "Animation & Interactions",
        duration: 60,
        lessons: [
          "Transition utilities",
          "Keyframe animations",
          "Hover and focus states",
          "Reduced-motion support",
        ],
      },
      {
        title: "Real-World Project",
        duration: 60,
        lessons: [
          "Figma to Tailwind workflow",
          "Building a landing page",
          "Building a dashboard layout",
          "Performance: purge and bundle size",
        ],
      },
    ],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
  },
  {
    id: "course-005",
    title: "State Management with Zustand",
    description: "Modern React state management without the boilerplate. Zustand 5 patterns.",
    instructor: "Casey Kim",
    level: "intermediate",
    status: "published",
    thumbnailUrl: undefined,
    duration: 240,
    lessonsCount: 12,
    rating: 4.5,
    enrolledCount: 678,
    tags: ["React", "Zustand", "State"],
    images: [
      "https://placehold.co/800x450/312e81/818cf8?text=Store+Setup",
      "https://placehold.co/800x450/1e3a5f/7dd3fc?text=Slices",
      "https://placehold.co/800x450/064e3b/34d399?text=Persist",
      "https://placehold.co/800x450/581c87/c084fc?text=DevTools",
    ],
    longDescription: `## State Management Doesn't Have to Be Hard

Redux gave us patterns but also gave us reducers, actions, selectors, middleware, thunks, and sagas. Zustand gives us a single function. This course proves that global state management can be simple, predictable, and type-safe without sacrificing power.

## Zustand 5: What Changed

Zustand 5 introduces a fully typed store API with first-class support for \`useShallow\` selectors. You'll learn why shallow comparison matters for render performance and how to structure your store slices so components only re-render when their slice actually changes.

## From Simple Stores to Production Patterns

We start with the smallest possible store and build up to sliced stores, middleware (persist, devtools, immer), and cross-slice actions. You'll finish with a pattern for integrating Zustand with React Query / Server Components so your client and server state live in harmony — not conflict.`,
    prerequisites: [
      "React hooks (useState, useEffect, useContext)",
      "TypeScript fundamentals",
      "Understanding of component re-render triggers",
    ],
    syllabus: [
      {
        title: "Zustand Fundamentals",
        duration: 60,
        lessons: [
          "Why not useState or Context?",
          "Creating your first store",
          "Reading and writing state",
          "Derived state with selectors",
        ],
      },
      {
        title: "Performance with useShallow",
        duration: 60,
        lessons: [
          "How React re-renders work",
          "Referential equality pitfalls",
          "useShallow for multi-property selectors",
          "Benchmarking with React DevTools",
        ],
      },
      {
        title: "Slices & Architecture",
        duration: 60,
        lessons: [
          "The slices pattern",
          "Cross-slice actions",
          "Store composition",
          "Typed store with TypeScript",
        ],
      },
      {
        title: "Middleware & Persistence",
        duration: 60,
        lessons: [
          "persist middleware",
          "devtools integration",
          "immer for complex updates",
          "Custom middleware",
        ],
      },
    ],
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-05-01T00:00:00Z",
  },
  {
    id: "course-006",
    title: "Testing with Playwright",
    description: "End-to-end testing for modern web apps. Page Objects, fixtures, and CI/CD.",
    instructor: "Riley Adams",
    level: "intermediate",
    status: "published",
    thumbnailUrl: undefined,
    duration: 300,
    lessonsCount: 15,
    rating: 4.4,
    enrolledCount: 543,
    tags: ["Testing", "Playwright", "E2E"],
    images: [
      "https://placehold.co/800x450/991b1b/fca5a5?text=E2E+Tests",
      "https://placehold.co/800x450/0f766e/5eead4?text=Browser+Context",
      "https://placehold.co/800x450/1e3a5f/93c5fd?text=CI+Pipeline",
      "https://placehold.co/800x450/4c1d95/c4b5fd?text=Debugging",
      "https://placehold.co/800x450/713f12/fde68a?text=Fixtures",
    ],
    longDescription: `## End-to-End Testing That Actually Works

Flaky tests are worse than no tests — they erode trust in the test suite and slow down CI. This course teaches Playwright the *right* way: resilient locators, proper async handling, Page Object Models, and test isolation patterns that prevent tests from interfering with each other.

## Playwright's Superpower: Auto-Waiting

Unlike Cypress or Selenium, Playwright auto-waits for elements to be actionable before interacting. But "auto-wait" isn't magic — you need to understand what Playwright waits for and when to add explicit assertions. We demystify the network idle, DOM settled, and animation-complete states so you can write tests that are fast *and* reliable.

## From Local to CI/CD

A test suite that only runs locally is half a test suite. We cover GitHub Actions configuration, parallelization across browsers (Chromium, Firefox, WebKit), artifact collection on failure, and integrating test reports into your PR review workflow. You'll ship confident knowing every merge is covered.`,
    prerequisites: [
      "JavaScript or TypeScript fundamentals",
      "Basic understanding of how web apps work (DOM, HTTP)",
      "Familiarity with a testing framework (Jest or Vitest is enough)",
    ],
    syllabus: [
      {
        title: "Playwright Setup & Core Concepts",
        duration: 60,
        lessons: [
          "Installing Playwright",
          "Your first test",
          "Browser contexts and pages",
          "Auto-waiting explained",
        ],
      },
      {
        title: "Resilient Locators",
        duration: 60,
        lessons: [
          "getByRole and ARIA semantics",
          "getByTestId strategy",
          "Avoiding brittle CSS selectors",
          "Chaining and filtering locators",
        ],
      },
      {
        title: "Page Object Model",
        duration: 60,
        lessons: [
          "Why Page Objects matter",
          "Building your first Page Object",
          "Composing Page Objects",
          "Fixtures for reusable setup",
        ],
      },
      {
        title: "Network & State",
        duration: 60,
        lessons: [
          "Mocking API responses",
          "Intercepting and modifying requests",
          "Authentication fixtures",
          "Database seeding strategies",
        ],
      },
      {
        title: "CI/CD Integration",
        duration: 60,
        lessons: [
          "GitHub Actions configuration",
          "Parallel browser testing",
          "Trace viewer for debugging failures",
          "HTML report artifacts",
          "Sharding large test suites",
        ],
      },
    ],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
  },
];

export const MOCK_ENROLLMENTS: CourseEnrollment[] = [
  {
    id: "enr-001",
    courseId: "course-001",
    userId: "mock-user-001",
    progress: 75,
    completedLessons: 18,
    startedAt: "2024-02-01T00:00:00Z",
    lastAccessedAt: "2024-06-15T00:00:00Z",
  },
  {
    id: "enr-002",
    courseId: "course-003",
    userId: "mock-user-001",
    progress: 40,
    completedLessons: 14,
    startedAt: "2024-03-01T00:00:00Z",
    lastAccessedAt: "2024-06-10T00:00:00Z",
  },
  {
    id: "enr-003",
    courseId: "course-005",
    userId: "mock-user-001",
    progress: 100,
    completedLessons: 12,
    startedAt: "2024-04-15T00:00:00Z",
    lastAccessedAt: "2024-05-20T00:00:00Z",
  },
];
