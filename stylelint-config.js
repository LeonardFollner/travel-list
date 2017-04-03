module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-property-sort-order-smacss"
  ],
  "rules": {
    // overwrites for 'stylelint-config-standard'
    "indentation": 4,
    "declaration-empty-line-before": null,
    "number-leading-zero": "never",
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-colon-newline-after": null,
    "declaration-no-important": null,
    // quotes
    "font-family-name-quotes": "always-where-recommended",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",
    "string-quotes": "single",
    // disallow vendor prefixing
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    // nesting
    "max-nesting-depth": 2,
    "selector-max-compound-selectors": 3,
    "selector-max-specificity": null,
    // other
    "selector-no-id": true,
    "number-no-trailing-zeros": true,
    "no-duplicate-selectors": true
  }
};
