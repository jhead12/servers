mcp_servers = {
    "memory": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    },
    "git": {
        "command": "uvx",
        "args": ["mcp-server-git", "--repository", "path/to/git/repo"]
    },
    "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
            "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
        }
    },
    "postgres": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
}

mcp_clients = {
    "claude-desktop": {
        "config": {
            "mcpServers": mcp_servers
        },
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/client-claude-desktop"]
    }
}