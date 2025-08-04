# node-golang-was-example

A simple example demonstrating how to compile Go code to WebAssembly (WASM) and run it in a Node.js environment, with output capture functionality.å

## Quick Start

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   cd node
   npm install
   ```

3. **Build and run:**
   ```bash
   npm start
   ```

That's it! You should see:
```
--- CAPTURED OUTPUT ---
hello world
-----------------------
Success! The output was captured correctly.
```

## Available Scripts

From the `node/` directory:

- **`npm start`** - Build Go WASM and run the complete example
- **`npm run build:go`** - Only build the Go code to WASM
- **`npm run build`** - Alias for `build:go`
- **`npm run dev`** - Same as `start` (development alias)
- **`npm run clean`** - Remove generated WASM files

## How It Works

### Go Side (`go/main.go`)
```go
package main

import (
    "fmt"
)

func main() {
    fmt.Println("hello world")
}
```

Simple Go program that prints "hello world" to stdout.

### Compilation
The Go code is compiled to WebAssembly using:
```bash
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

This creates a `main.wasm` file that can be loaded by JavaScript.

### Node.js Side (`node/src/index.js`)
1. **Loads Go WASM Runtime**: Uses the official `wasm_exec.js` from Go
2. **Captures Output**: Overrides `console.log` to capture Go's `fmt.Println` output
3. **Runs WASM**: Instantiates and executes the Go WebAssembly module
4. **Returns Output**: Restores console and displays captured output

## Key Components

### Official Go WASM Runtime
The project uses `wasm_exec.js` from the Go installation, which provides:
- Proper import object for Go WASM modules
- Memory management and garbage collection
- Support for Go runtime features (goroutines, etc.)
- Correct handling of system calls

### Output Capture
The Node.js script captures output by temporarily overriding `console.log`, since Go's `fmt.Println` translates to JavaScript `console.log` calls in the WASM environment.

## Troubleshooting

### "Cannot find module './wasm_exec.js'"
Make sure you have the `wasm_exec.js` file in the `node/` directory. It should be copied from your Go installation:
```bash
cp $(go env GOROOT)/lib/wasm/wasm_exec.js node/
```

### "Import #0 module="gojs": module is not an object or function"
This error occurs when trying to manually implement Go WASM imports. Always use the official `wasm_exec.js` runtime provided by Go.

### Go Build Errors
Ensure you're using the correct build command with WebAssembly target:
```bash
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

