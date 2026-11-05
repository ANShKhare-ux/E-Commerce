import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import ts from "typescript";
import nextConfig from "../next.config.mjs";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";
import {
  GoogleSignInButton,
  getSafeRedirectUrl as getSafeRedirectUrlFromButton,
  GoogleIcon,
} from "@/components/GoogleSignInButton";
import { SafeImage, DEFAULT_FALLBACK_IMAGE, INLINE_FALLBACK_SVG } from "@/components/SafeImage";

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

function getAllSourceFiles(dir: string, exts = [".ts", ".tsx", ".js", ".jsx", ".mjs"]): string[] {
  let res: string[] = [];
  if (!fs.existsSync(dir)) return res;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== "node_modules" && item !== ".next") {
        res = res.concat(getAllSourceFiles(full, exts));
      }
    } else if (exts.some((ext) => item.endsWith(ext))) {
      res.push(full);
    }
  }
  return res;
}

function resolveModulePath(sourceFile: string, specifier: string): string | null {
  let target = "";
  if (specifier.startsWith("@/")) {
    target = path.join(srcDir, specifier.slice(2));
  } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
    target = path.resolve(path.dirname(sourceFile), specifier);
  } else {
    return null; // External package
  }

  const extensions = ["", ".ts", ".tsx", ".js", ".jsx", ".mjs", "/index.ts", "/index.tsx", "/index.js"];
  for (const ext of extensions) {
    const candidate = target + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

describe("Webpack Runtime & Module Integrity Guard Suite", () => {
  describe("next.config.mjs optimizePackageImports Architecture", () => {
    it("must NOT include framer-motion in experimental.optimizePackageImports", () => {
      const experimental = (nextConfig as any).experimental || {};
      const packageImports: string[] = experimental.optimizePackageImports || [];

      // framer-motion does not support Webpack AST barrel-splitting and throws:
      // Runtime TypeError: __webpack_modules__[moduleId] is not a function
      expect(packageImports).not.toContain("framer-motion");
    });

    it("should only contain verified ESM barrel packages in optimizePackageImports", () => {
      const experimental = (nextConfig as any).experimental || {};
      const packageImports: string[] = experimental.optimizePackageImports || [];
      const allowedPackages = new Set(["lucide-react"]);

      for (const pkg of packageImports) {
        expect(allowedPackages.has(pkg)).toBe(true);
      }
    });

    it("must retain share.google and Google Drive in remotePatterns", () => {
      const remotePatterns = (nextConfig as any).images?.remotePatterns || [];
      const hosts = remotePatterns.map((p: any) => p.hostname);

      expect(hosts).toContain("share.google");
      expect(hosts).toContain("drive.google.com");
      expect(hosts).toContain("*.googleusercontent.com");
      expect(hosts).toContain("*.google.com");
      expect(hosts).toContain("*.supabase.co");
      expect(hosts).toContain("*.phonepe.com");
    });

    it("must include share.google and Google domains in Content Security Policy headers", async () => {
      const headersFn = (nextConfig as any).headers;
      expect(typeof headersFn).toBe("function");

      const headers = await headersFn();
      const globalHeader = headers.find((h: any) => h.source === "/:path*");
      expect(globalHeader).toBeDefined();

      const csp = globalHeader.headers.find((h: any) => h.key === "Content-Security-Policy");
      expect(csp).toBeDefined();
      expect(csp.value).toContain("https://share.google");
      expect(csp.value).toContain("https://drive.google.com");
      expect(csp.value).toContain("https://*.googleusercontent.com");
      expect(csp.value).toContain("https://*.google.com");
      expect(csp.value).toContain("https://*.supabase.co");
      expect(csp.value).toContain("https://*.phonepe.com");
    });
  });

  describe("Acyclic Dependency Graph Validation (Zero Circular Imports)", () => {
    it("should have zero circular dependencies across the entire src directory", () => {
      const srcFiles = getAllSourceFiles(srcDir);
      const graph = new Map<string, string[]>();

      for (const file of srcFiles) {
        const code = fs.readFileSync(file, "utf8");
        const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
        const deps: string[] = [];

        function visit(node: ts.Node) {
          if (ts.isImportDeclaration(node)) {
            const spec = (node.moduleSpecifier as ts.StringLiteral).text;
            // Ignore type-only imports as they are erased during compilation
            if (node.importClause?.isTypeOnly) return;
            const resolved = resolveModulePath(file, spec);
            if (resolved) deps.push(resolved);
          } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
            const spec = (node.moduleSpecifier as ts.StringLiteral).text;
            if (node.isTypeOnly) return;
            const resolved = resolveModulePath(file, spec);
            if (resolved) deps.push(resolved);
          }
          ts.forEachChild(node, visit);
        }

        visit(sf);
        graph.set(file, deps);
      }

      // Detect cycles via DFS
      const visited = new Map<string, number>(); // 0: unvisited, 1: visiting, 2: visited
      const cycles: string[][] = [];

      function dfs(node: string, stack: string[]) {
        visited.set(node, 1);
        stack.push(node);

        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
          if (visited.get(neighbor) === 1) {
            const cycleStart = stack.indexOf(neighbor);
            cycles.push(stack.slice(cycleStart).concat(neighbor));
          } else if (!visited.get(neighbor)) {
            dfs(neighbor, stack);
          }
        }

        stack.pop();
        visited.set(node, 2);
      }

      for (const file of graph.keys()) {
        if (!visited.get(file)) {
          dfs(file, []);
        }
      }

      if (cycles.length > 0) {
        const formatted = cycles.map((c) =>
          c.map((f) => path.relative(rootDir, f)).join(" -> ")
        );
        expect.fail(`Circular dependencies detected in src:\n${formatted.join("\n")}`);
      }

      expect(cycles.length).toBe(0);
    });
  });

  describe("Module Import & Export Contract Verification", () => {
    it("should verify GoogleSignInButton exports both named and default symbols", () => {
      expect(typeof GoogleSignInButton).toBe("function");
      expect(typeof GoogleIcon).toBe("function");
      expect(typeof getSafeRedirectUrlFromButton).toBe("function");
      expect(getSafeRedirectUrlFromButton).toBe(getSafeRedirectUrl);
    });

    it("should verify SafeImage exports both named and default component functions", () => {
      expect(typeof SafeImage).toBe("function");
      expect(DEFAULT_FALLBACK_IMAGE).toBeDefined();
      expect(INLINE_FALLBACK_SVG).toBeDefined();
    });

    it("should ensure no file imports default from a module lacking a default export", () => {
      const srcFiles = getAllSourceFiles(srcDir);
      const moduleMeta = new Map<string, { hasDefault: boolean; named: Set<string> }>();

      for (const file of srcFiles) {
        const code = fs.readFileSync(file, "utf8");
        const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
        const named = new Set<string>();
        let hasDefault = false;

        function visit(node: ts.Node) {
          if (ts.isExportAssignment(node) && !node.isExportEquals) {
            hasDefault = true;
          }
          if (ts.isExportDeclaration(node)) {
            if (node.exportClause && ts.isNamedExports(node.exportClause)) {
              for (const el of node.exportClause.elements) {
                if (el.name.text === "default") hasDefault = true;
                else named.add(el.name.text);
              }
            }
          }
          const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
          if (modifiers && modifiers.some((m: ts.ModifierLike) => m.kind === ts.SyntaxKind.ExportKeyword)) {
            const isDefault = modifiers.some((m: ts.ModifierLike) => m.kind === ts.SyntaxKind.DefaultKeyword);
            if (isDefault) hasDefault = true;
            if (ts.isFunctionDeclaration(node) && node.name && !isDefault) named.add(node.name.text);
            else if (ts.isClassDeclaration(node) && node.name && !isDefault) named.add(node.name.text);
            else if (ts.isVariableStatement(node)) {
              for (const decl of node.declarationList.declarations) {
                if (ts.isIdentifier(decl.name)) named.add(decl.name.text);
              }
            } else if (
              ts.isTypeAliasDeclaration(node) ||
              ts.isInterfaceDeclaration(node) ||
              ts.isEnumDeclaration(node)
            ) {
              named.add(node.name.text);
            }
          }
          ts.forEachChild(node, visit);
        }

        visit(sf);
        moduleMeta.set(file, { hasDefault, named });
      }

      const defaultImportViolations: string[] = [];

      for (const file of srcFiles) {
        const code = fs.readFileSync(file, "utf8");
        const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);

        function check(node: ts.Node) {
          if (ts.isImportDeclaration(node)) {
            const spec = (node.moduleSpecifier as ts.StringLiteral).text;
            const target = resolveModulePath(file, spec);
            if (target && moduleMeta.has(target)) {
              const meta = moduleMeta.get(target)!;
              if (node.importClause?.name && !meta.hasDefault) {
                defaultImportViolations.push(
                  `${path.relative(rootDir, file)} imports default "${node.importClause.name.text}" from ${path.relative(rootDir, target)} which has NO default export`
                );
              }
            }
          }
          ts.forEachChild(node, check);
        }

        check(sf);
      }

      expect(defaultImportViolations).toEqual([]);
    });
  });

  describe("Server vs Client Module Boundary Integrity", () => {
    it("should never import node built-in modules in 'use client' files", () => {
      const srcFiles = getAllSourceFiles(srcDir);
      const nodeBuiltins = new Set([
        "fs",
        "path",
        "crypto",
        "os",
        "child_process",
        "stream",
        "http",
        "https",
        "net",
        "tls",
        "zlib",
      ]);

      const violations: string[] = [];

      for (const file of srcFiles) {
        const code = fs.readFileSync(file, "utf8");
        const isClientComponent =
          code.startsWith('"use client"') ||
          code.startsWith("'use client'") ||
          code.includes('\n"use client"') ||
          code.includes("\n'use client'");

        if (isClientComponent) {
          const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
          ts.forEachChild(sf, function check(node: ts.Node) {
            if (ts.isImportDeclaration(node)) {
              const spec = (node.moduleSpecifier as ts.StringLiteral).text;
              const cleanSpec = spec.replace(/^node:/, "");
              if (nodeBuiltins.has(cleanSpec)) {
                violations.push(
                  `${path.relative(rootDir, file)} is a Client Component but imports server builtin "${spec}"`
                );
              }
            }
            ts.forEachChild(node, check);
          });
        }
      }

      expect(violations).toEqual([]);
    });

    it("should verify interactive Framer Motion components declare 'use client'", () => {
      const motionComponents = [
        "src/components/PageTransition.tsx",
        "src/components/IntroEntranceAnimation.tsx",
        "src/components/CartDrawer.tsx",
        "src/components/Header.tsx",
        "src/components/HeroSection.tsx",
        "src/components/ProductCard.tsx",
        "src/components/QuickViewModal.tsx",
        "src/components/SearchDialog.tsx",
        "src/components/ScrollProgress.tsx",
        "src/components/ScrollReveal.tsx",
      ];

      for (const relativePath of motionComponents) {
        const fullPath = path.join(rootDir, relativePath);
        expect(fs.existsSync(fullPath)).toBe(true);
        const content = fs.readFileSync(fullPath, "utf8");
        const hasUseClient =
          content.trimStart().startsWith('"use client"') ||
          content.trimStart().startsWith("'use client'");
        expect(
          hasUseClient,
          `${relativePath} must declare "use client" at top because it utilizes framer-motion client hooks`
        ).toBe(true);
      }
    });
  });
});
