import asyncio
from importlib.util import module_from_spec
import subprocess
import json
# Load the JSON file containing Minecraft client configurations
with open('clients.json', 'r') as file:
   mcp_clients = json.load(file)

# Create instances of McpServer for each client configuration
server_instances = {client: McpServer(client['config']) for client in mcp_clients.values()}

async def main():
    # Start all servers in parallel
    await asyncio.gather(*[server.start() for server in server_instances.values()])

if __name__ == "__main__":
    # Load the JSON file containing Minecraft client configurations
    with open('clients.json', 'r') as file:
        mcp_clients = json.load(file)

    # Create instances of McpServer for each client configuration
    server_instances = {client: McpServer(client['config']) for client in mcp_clients.values()}

    # Start all servers in parallel
    asyncio.run(main())