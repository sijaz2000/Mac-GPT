from bs4 import BeautifulSoup

# Read the HTML file
with open('admission.html', 'r', encoding='utf-8') as html_file:
    html_content = html_file.read()

# Parse the HTML content with Beautiful Soup
soup = BeautifulSoup(html_content, 'html.parser')

# Extract all the text from the HTML
all_text = soup.get_text()

# Define the output file name
output_file_name = 'admission.text'

# Write the extracted text to the output file
with open(output_file_name, 'w', encoding='utf-8') as output_file:
    output_file.write(all_text)

print(f'All text has been scraped and saved to "{output_file_name}"')
