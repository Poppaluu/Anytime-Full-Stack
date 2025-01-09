// processDemo.js

// Print the process arguments
console.log('Process Arguments:');
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

// Print the current working directory
console.log(`Current Working Directory: ${process.cwd()}`);

// Print the Node.js version
console.log(`Node.js Version: ${process.version}`);

// Print the platform
console.log(`Platform: ${process.platform}`);

// Print the memory usage
console.log('Memory Usage:');
console.log(process.memoryUsage());

//process.env
console.log('Environment Variables:');
console.log(process.env);
console.log(process.env.PATHTEXT);

//pid
console.log('Process ID:');
console.log(process.pid);

//cwd
console.log('Current Working Directory:');
console.log(process.cwd());

//title
console.log(process.title);

//uptime
console.log('Uptime:');
console.log(process.uptime());

process.on('exit', (code) => {
    console.log(`Exiting with code: ${code}`);
});

//exit
process.exit(0); // 0 is the exit code