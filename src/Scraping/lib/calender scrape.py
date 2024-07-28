from bs4 import BeautifulSoup

# Read the HTML content from the file or a string containing the HTML
with open('spring2024.html', 'r') as file:
    html_content = file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Find the table within the <div>
table = soup.find('table')

# Initialize a list to store the scraped data
data = []
with open('spring2025.txt', 'w') as output_file:
    # Iterate through the rows of the table
    for row in table.find_all('tr'):
        cells = row.find_all('td')
        if cells:
            # Extract the text from each cell and store it in the data list
            row_data = [cell.get_text(strip=True) for cell in cells]
            data.append(row_data)
            output_file.write(f" {row_data}\n")
