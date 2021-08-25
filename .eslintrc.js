/**
 * External Dependencies
 */
const DEFAULT_CONFIG = require( '@wordpress/scripts/config/.eslintrc' );

module.exports = {
	...DEFAULT_CONFIG,
	plugins: [ ...( DEFAULT_CONFIG.plugins || [] ), 'import' ],
	rules: {
		...DEFAULT_CONFIG.rules,
		'import/newline-after-import': [ 'error', { count: 1 } ],
		'import/no-unresolved': [ 'off' ],
		'import/no-extraneous-dependencies': [
			// The rule is off due to multiple major dependencies being
			// sourced indirectly from `@wordpress/scripts`
			'off',
		],
		'import/order': [
			'error',
			{
				alphabetize: { order: 'asc' },
				groups: [
					'builtin',
					'external',
					[ 'parent', 'sibling', 'index' ],
				],
				pathGroups: [
					{
						// Make sure `React` is listed as the first external import
						pattern: 'react',
						group: 'builtin',
						position: 'after',
					},
				],
				pathGroupsExcludedImportTypes: [ 'builtin' ],
			},
		],
		'sort-imports': [
			'error',
			{
				// Sort import keys only, because the import order is
				// already handled by `import/order`
				ignoreDeclarationSort: true,
			},
		],
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: [ 'wp-scripts-lint-js-test-repo' ],
			},
		],
		'@wordpress/no-unsafe-wp-apis': [ 'error' ],
	},
};
