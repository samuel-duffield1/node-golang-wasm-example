#!/bin/bash

# Build the Rust code to WebAssembly
wasm-pack build --target nodejs --out-dir ../rust-node/pkg
