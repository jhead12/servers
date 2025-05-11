import argparse

def process_data():
    # Placeholder function to process data
    print("Processing data...")

def main():
    parser = argparse.ArgumentParser(description='Command-line tool for MCP Custom')
    parser.add_argument('command', help='Subcommand to execute')

    args = parser.parse_args()

    if args.command == 'process':
        process_data()
    else:
        parser.print_help()

if __name__ == '__main__':
    main()