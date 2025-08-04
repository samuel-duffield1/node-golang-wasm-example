const fs = require('fs');
require('../wasm_exec.js'); // Load the Go WebAssembly runtime

// This variable will hold the captured output from the WASM module.
let capturedOutput = '';

// Override console.log to capture output
const originalConsoleLog = console.log;
console.log = function(...args) {
  capturedOutput += args.join(' ') + '\n';
  // Uncomment this line if you want to see output in real-time
  // originalConsoleLog(...args);
};

async function runWasm() {
  try {
    // Create a new Go runtime instance
    const go = new Go();
    
    // Read the WASM file
    const wasmBuffer = fs.readFileSync('../go/main.wasm');
    
    // Instantiate the WASM module with Go's import object
    const { instance } = await WebAssembly.instantiate(wasmBuffer, go.importObject);
    
    // Run the Go program
    await go.run(instance);
    
    // Restore console.log
    console.log = originalConsoleLog;
    
    // Show captured output
    console.log('--- CAPTURED OUTPUT ---');
    console.log(capturedOutput.trim());
    console.log('-----------------------');
    
    // Check if output matches expected
    if (capturedOutput.trim() === 'hello world') {
      console.log('Success! The output was captured correctly.');
    } else {
      console.log('Output captured:', JSON.stringify(capturedOutput.trim()));
    }
    
  } catch (error) {
    console.log = originalConsoleLog;
    console.error('Error running WASM:', error);
  }
}

runWasm();
