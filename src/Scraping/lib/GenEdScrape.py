from bs4 import BeautifulSoup

# Read the HTML content from the file or a string containing the HTML
with open('genEdFall2023.html', 'r') as file:
    html_content = file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Find all tables in the HTML
tables = soup.find_all('table')
with open('GedEdFall2023.txt', 'w') as output_file:
    for table in tables:
        # Extract the data-id attribute
        data_id = table.get('data-id', 'Data ID Not Found')

        # Initialize a list to store the scraped table data
        table_data = []

        # Iterate through the rows of the table
        for row in table.find_all('tr'):
            cells = row.find_all('td')
            if cells:
                # Extract the text from each cell and store it in the table_data list
                row_data = [cell.get_text(strip=True) for cell in cells]
                table_data.append(row_data)

        # Print the data-id, and scraped table data
        print(data_id)
        output_file.write(f" {data_id}\n")
        for row_data in table_data:
            print('\t'.join(row_data))  # Printing the table data, tab-separated
            output_file.write(f" {row_data}\n")


