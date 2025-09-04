import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import { globalIgnores } from 'eslint/config';

import pluginImport from 'eslint-plugin-import';

export default tseslint.config([
	globalIgnores(['dist/**', 'build/**', 'coverage/**', 'node_modules/**']),
	js.configs.recommended,
	...tseslint.configs.recommended,
	...vue.configs['flat/recommended'],
	{
		files: ['**/*.vue', '**/*.ts'],
		languageOptions: {
			parser: vueParser,
			parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] },
		},
		plugins: { vue, import: pluginImport },
		settings: {
			'import/resolver': {
				// 讓 eslint-plugin-import 讀 TypeScript 的 tsconfig
				typescript: {
					// 如果你有 tsconfig.json / tsconfig.app.json，可以明確指定
					project: ['./tsconfig.json'],
				},
				node: true, // 保留 node resolver，讓第三方套件一樣能解析
			},
		},
		rules: {
			'vue/html-indent': ['error', 'tab'],
			'no-var': 'error',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			eqeqeq: ['error', 'smart'],
			curly: ['error', 'multi-line'],
			'object-shorthand': ['error', 'always'],
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'always',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
			'vue/html-closing-bracket-newline': [
				'error',
				{
					singleline: 'never',
					multiline: 'never',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
				},
			],
		},
	},
	{
		files: ['**/*.config.js', '**/*.config.cjs'],
		languageOptions: {
			globals: {
				module: 'readonly',
				require: 'readonly',
				__dirname: 'readonly',
			},
		},
	},
]);
