module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
	plugins: ["@typescript-eslint", "import"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	rules: {
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^_" },
		],
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				selector: "parameter",
				format: ["camelCase"],
				filter: { regex: "^G$", match: false },
			},
		],
		"@typescript-eslint/semi": "warn",
		"import/no-unresolved": "off",
		"import/order": ["warn", { "newlines-between": "always" }],
		curly: "warn",
		eqeqeq: "warn",
		"no-throw-literal": "warn",
		semi: "off",
	},
	ignorePatterns: ["out", "dist", "**/*.d.ts"],
};
