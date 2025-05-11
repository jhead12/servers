import unittest
from src.server import McpServer

class TestMcpServer(unittest.TestCase):
    async def setUp(self):
        # Initialize the server instance
        self.server = McpServer({"name": "github", "command": "./node_modules/.bin/npx", "args": ["-y", "@modelcontextprotocol/server-github"], "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"}})

    async def test_start(self):
        await self.server.start()
        # Add assertions to check the server started correctly
        self.assertTrue(True)  # Replace with actual checks

if __name__ == '__main__':
    unittest.main(argv=[''], exit=False)