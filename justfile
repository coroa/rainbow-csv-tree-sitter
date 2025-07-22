# List available recipes
default:
    @just --list

# Generate all grammars
generate: generate-csv generate-ssv generate-psv generate-tsv

# Generate CSV grammar
generate-csv:
    cd csv && tree-sitter generate

# Generate SSV grammar
generate-ssv:
    cd ssv && tree-sitter generate

# Generate PSV grammar
generate-psv:
    cd psv && tree-sitter generate

# Generate TSV grammar
generate-tsv:
    cd tsv && tree-sitter generate

# Test all grammars
test: test-csv test-ssv test-psv test-tsv

# Test CSV grammar
test-csv:
    cd csv && tree-sitter test

# Test SSV grammar
test-ssv:
    cd ssv && tree-sitter test

# Test PSV grammar
test-psv:
    cd psv && tree-sitter test

# Test TSV grammar
test-tsv:
    cd tsv && tree-sitter test

# Update test expectations for all grammars
update-tests: update-csv update-ssv update-psv update-tsv

# Update CSV test expectations
update-csv:
    cd csv && tree-sitter test --update

# Update SSV test expectations
update-ssv:
    cd ssv && tree-sitter test --update

# Update PSV test expectations
update-psv:
    cd psv && tree-sitter test --update

# Update TSV test expectations
update-tsv:
    cd tsv && tree-sitter test --update

# Clean generated files
clean:
    rm -rf csv/src ssv/src psv/src tsv/src

# Run a specific test file
test-file grammar file:
    cd {{grammar}} && tree-sitter test --file-name {{file}}

# Generate and test all grammars
all: generate test
