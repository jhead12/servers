import requests
from schema import schema

def main():
    # Define a function to execute a query against the GraphQL server
    def execute_query(query, variables=None):
        result = schema.execute(
            query,
            variable_values=variables,
        )
        return result.data

    # Example query and variables
    query = '''
        query Hello($name: String) {
            hello(name: $name)
        }
    '''

    variables = {'name': 'Alice'}

    # Execute the query
    data = execute_query(query, variables)

    # Print the result
    print(data)

if __name__ == '__main__':
    main()