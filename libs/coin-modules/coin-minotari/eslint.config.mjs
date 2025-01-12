import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
    },
    {
      rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      }
    }
);