// src/mcp/index.js
const mcp = require('@modelcontextprotocol/server-filesystem');
const mcp = require('@modelcontextprotocol/server-puppeteer ');
const mcp = require('@modelcontextprotocol/server-llm');    
const mcp = require('@modelcontextprotocol/server-postgres  ');

class McpServer {
  constructor(config) {
    this.config = config;
    this.serverInstance = null;
  }

  async start() {
    if (!this.serverInstance) {
      try {
        this.serverInstance = await mcp.start(this.config);
        console.log('MCP server started');
      } catch (error) {
        console.error('Error starting MCP server:', error);
      }
    }
    return this.serverInstance;
  }

  async stop() {
    if (this.serverInstance) {
      try {
        await this.serverInstance.stop();
        console.log('MCP server stopped');
      } catch (error) {
        console.error('Error stopping MCP server:', error);
      }
    }
  }
}

module.exports = McpServer;