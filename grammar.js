/**
 * @file Csv grammar for tree-sitter
 * @author Hans
 * @license ISC
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "csv",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
