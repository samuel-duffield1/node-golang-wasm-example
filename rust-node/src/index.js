import { greet, hello_world, add } from '../pkg/rust_wasm_example.js';

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
    // The WASM module is automatically initialized when imported
    // The main function runs automatically due to #[wasm_bindgen(start)]
    // But we can also call functions manually:
    
    // Call the greet function
    greet('Rust WASM');
    
    // Call the add function
    const result = add(5, 3);
    console.log(`5 + 3 = ${result}`);
    
    // Call hello_world again
    hello_world();
    
    // Restore console.log
    console.log = originalConsoleLog;
    
    // Show captured output
    console.log('--- CAPTURED OUTPUT ---');
    console.log(capturedOutput.trim());
    console.log('-----------------------');
    
    // Check if output contains expected text
    if (capturedOutput.includes('hello world')) {
      console.log('Success! The Rust WASM output was captured correctly.');
    } else {
      console.log('Output captured:', JSON.stringify(capturedOutput.trim()));
    }
    
    // Demonstrate the add function
    console.log(`\nDemonstrating add function: 10 + 7 = ${add(10, 7)}`);
    
  } catch (error) {
    console.log = originalConsoleLog;
    console.error('Error running Rust WASM:', error);
  }
}

runWasm();
