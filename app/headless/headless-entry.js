const path = require('path');
const fs = require('fs');
const os = require('os');
const { fork } = require('child_process');

/**
 * Anker Insight Headless Entry Point
 * 
 * This script is the entry point for standalone binaries.
 * It ensures the project data directory exists in the user's home folder
 * and then launches the Anker Insight server.
 */

async function bootstrap() {
    console.log('Anker Insight Headless starting...');

    // 1. Determine the user data directory (similar to Electron app)
    const homeDir = os.homedir();
    const fuxaDataDir = path.join(homeDir, 'anker-insight-headless-data');
    
    // 2. Ensure the directory exists (Electron-style)
    if (!fs.existsSync(fuxaDataDir)) {
        console.log(`Creating initial data directory: ${fuxaDataDir}`);
        try {
            fs.mkdirSync(fuxaDataDir, { recursive: true });
        } catch (err) {
            console.error(`Failed to create data directory: ${err.message}`);
            process.exit(1);
        }
    } else {
        console.log(`Using existing data directory: ${fuxaDataDir}`);
    }

    // 3. Resolve the server path
    const serverPath = path.join(__dirname, 'server', 'main.js');

    if (!fs.existsSync(serverPath)) {
        console.error(`Could not find Anker Insight server at: ${serverPath}`);
        process.exit(1);
    }

    // 4. Launch the server (fork like Electron does)
    console.log(`Launching Anker Insight server with userDir: ${fuxaDataDir}`);
    
    const serverProcess = fork(serverPath, [], {
        env: { ...process.env, userDir: fuxaDataDir },
        stdio: 'inherit'
    });

    serverProcess.on('error', (err) => {
        console.error(`Failed to start Anker Insight server: ${err.message}`);
        process.exit(1);
    });

    // Keep the process running
    process.on('SIGINT', () => {
        console.log('Shutting down Anker Insight server...');
        serverProcess.kill('SIGTERM');
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log('Shutting down Anker Insight server...');
        serverProcess.kill('SIGTERM');
        process.exit(0);
    });
}

bootstrap();