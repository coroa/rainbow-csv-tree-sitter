# Rainbow CSV Tree-Sitter Grammars

Tree-sitter grammars for parsing CSV files with different separators. This repository provides syntax highlighting and parsing for comma, semicolon, pipe, and tab-separated values.

## Grammars

- **csv** - Comma-separated values (`,`)
- **ssv** - Semicolon-separated values (`;`)
- **psv** - Pipe-separated values (`|`)
- **tsv** - Tab-separated values (`\t`)

## Installation

### Prerequisites

- [tree-sitter CLI](https://github.com/tree-sitter/tree-sitter/blob/master/cli/README.md)
- [Rust](https://www.rust-lang.org/tools/install) (for building bindings)
- [just](https://github.com/casey/just) (for task automation)

Install `just`:
```bash
cargo install just
# or
brew install just  # macOS
# or see https://github.com/casey/just for other methods
```

## Building

### Quick Start

```bash
# Generate all parsers
just generate

# Run all tests
just test

# Generate and test everything
just all
```

### Grammar-Specific Commands

```bash
# Generate specific grammar
just generate-csv
just generate-ssv
just generate-psv
just generate-tsv

# Test specific grammar
just test-csv
just test-ssv
just test-psv
just test-tsv

# Update test expectations
just update-csv
just update-ssv
just update-psv
just update-tsv
```

### All Available Commands

```bash
just  # Lists all available commands
```

## Project Structure

```
rainbow-csv-tree-sitter/
├── common/               # Shared grammar definition
│   └── define-grammar.js
├── csv/                  # Comma-separated values grammar
│   ├── grammar.js
│   └── test/
│       └── corpus/
├── ssv/                  # Semicolon-separated values grammar
│   ├── grammar.js
│   └── test/
│       └── corpus/
├── psv/                  # Pipe-separated values grammar
│   ├── grammar.js
│   └── test/
│       └── corpus/
├── tsv/                  # Tab-separated values grammar
│   ├── grammar.js
│   └── test/
│       └── corpus/
├── bindings/             # Language bindings
│   └── rust/
├── tree-sitter.json      # Grammar metadata
└── justfile              # Build automation
```

## Grammar Features

Each grammar supports:
- Basic field parsing
- Quoted fields (with embedded separators)
- Escaped quotes within quoted fields (`""`)
- Empty fields
- Windows (`\r\n`) and Unix (`\n`) line endings
- Unlimited number of columns (cycling through field names after 7)

### Field Naming

Fields are named in a cycling pattern:
- Columns 1-7: `first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh`
- Columns 8-14: `first`, `second`, `third`, `fourth`, `fifth`, `sixth`, `seventh` (repeating)
- And so on...

## Testing

### Structure

Each grammar directory contains its own test suite:
```
<grammar>/
├── grammar.js
├── src/
│   └── (generated parser files)
└── test/
    └── corpus/
        └── basic.txt (and other test files)

### Writing Tests

Test files use the tree-sitter test format:

```
==================
Test name
==================

input,data,here
more,input,rows

---

(csv
  (row
    (first)
    (second)
    (third))
  (row
    (first)
    (second)
    (third)))
```

## License

ISC

## Links

- Repository: https://github.com/coroa/rainbow-csv-tree-sitter