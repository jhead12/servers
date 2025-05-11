import axios from 'axios';
import fs from 'fs';
import http from 'http';
import { MCPServer } from 'mcp-framework';

const mcpServer = new MCPServer({
  port: 3050,
  host: 'localhost',
  name: 'mcp-framework',
  version: '1.0.0',
  description: 'MCP Framework Example'
});

import { McpServer } from './server';

// async function main() {
//     // Create an instance of McpServer with the environment variable
//     const server = new McpServer({
//         name: 'github',
//         command: './node_modules/.bin/npx',
//         args: ['-y', '@modelcontextprotocol/server-github'],
//         env: {
//             GITHUB_PERSONAL_ACCESS_TOKEN: '<YOUR_TOKEN>'
//         }
//     });

//     await server.start();
// }

// main().catch(console.error);

async function main() {
  const serverUrl = await getServerUrl('');
  console.log(`Starting Filesystem server at ${serverUrl}`);

  const port = 3050;
  const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
      try {
        const filePath = req.url.substring(1);
        const file = await fs.promises.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(file);
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else if (req.method === 'POST') {
      try {
        const data = await new Promise((resolve, reject) => {
          let chunks = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => resolve(Buffer.concat(chunks).toString()));
        });
        const filePath = `uploads/${Date.now()}_${req.url.substring(1)}`;
        await fs.promises.writeFile(filePath, data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File uploaded: ${filePath}`);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error uploading file');
      }
    } else if (req.method === 'DELETE') {
      try {
        const filePath = req.url.substring(1);
        await fs.promises.unlink(filePath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File deleted: ${filePath}`);
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else if (req.method === 'PUT') {
      try {
        const data = await new Promise((resolve, reject) => {
          let chunks = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => resolve(Buffer.concat(chunks).toString()));
        });
        const filePath = req.url.substring(1);
        await fs.promises.writeFile(filePath, data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File updated: ${filePath}`);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error updating file');
      }
    } else if (req.method === 'HEAD') {
      try {
        const filePath = req.url.substring(1);
        const stats = await fs.promises.stat(filePath);
        res.setHeader('Content-Length', stats.size);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else if (req.method === 'OPTIONS') {
      try {
        const filePath = req.url.substring(1);
        const stats = await fs.promises.stat(filePath);
        res.setHeader('Allow', 'GET, POST, DELETE, PUT, HEAD, OPTIONS');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else if (req.method === 'TRACE') {
      try {
        const filePath = req.url.substring(1);
        const stats = await fs.promises.stat(filePath);
        res.setHeader('Allow', 'GET, POST, DELETE, PUT, HEAD, OPTIONS, TRACE');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else if (req.method === 'CONNECT') {
      try {
        const filePath = req.url.substring(1);
        const stats = await fs.promises.stat(filePath);
        res.setHeader('Allow', 'GET, POST, DELETE, PUT, HEAD, OPTIONS, TRACE, CONNECT');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method not allowed');
    }
  });

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

async function getServerUrl(name) {
  const response = await axios.get(`https://www.npmjs.com/package/package/${name}`);
  return response.data.homepage;
}

main();
