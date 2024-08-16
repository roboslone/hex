import globals from "globals"
import pluginJs from "@eslint/js"
import stylisticJs from "@stylistic/eslint-plugin-js"
import stylisticJsx from "@stylistic/eslint-plugin-jsx"
import tseslint from "typescript-eslint"


export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: { globals: globals.browser },
    },
    {},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            "@stylistic/js": stylisticJs,
            "@stylistic/jsx": stylisticJsx,
        },
        rules: {
            "@stylistic/js/comma-dangle": ["error", "always-multiline"],
            "@stylistic/js/indent": ["error", 4],
            "@stylistic/js/quotes": ["error", "double"],
            "@stylistic/js/semi": ["error", "never"],
            "@stylistic/jsx/jsx-curly-spacing": ["error", { when: "never", children: true }],
            "@stylistic/jsx/jsx-indent-props": ["error", 4],
            "@stylistic/jsx/jsx-tag-spacing": ["error", { beforeClosing: "never", beforeSelfClosing: "proportional-always" }],
        },
    },
]
