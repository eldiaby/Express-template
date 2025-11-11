import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: [
			"tests/**/*.test.ts",
			"tests/**/*.spec.ts",
			"src/**/*.test.ts",
			"src/**/*.spec.ts",
		],
		globals: true,
		environment: "node",
		setupFiles: [`./tests/setup.ts`],
		coverage: {
			provider: "v8",
			reportsDirectory: "./coverage",
		},
	},
});
