module.exports = {
	root: true,
	env: {
		browser: true,
		jest: true,
	},
	extends: [
        '@tool-belt/eslint-config',
        'next/core-web-vitals',
        // 'plugin:react/recommended',
    ],
	ignorePatterns: [
		'**/coverage-e2e/*',
		'**/coverage/*',
		'**/build/*',
		'**/cms/*',
		'**/dist/*',
	],
	parserOptions: {
		project: ['./tsconfig.json'],
	},
	plugins: ['jam3', 'jsx-a11y', 'unused-imports'],
	rules: {
		'curly': 'off',
		'unused-imports/no-unused-imports': 'error',
	},
}
