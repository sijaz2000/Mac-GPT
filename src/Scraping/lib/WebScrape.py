from bs4 import BeautifulSoup

# Read the HTML file
with open('MacalesterCourse.html', 'r') as file:
    html_content = file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Create a text file for output
with open('spring2024Courses.txt', 'w') as output_file:
    # Find all the <div> elements with the class "pb-detail-item-container" containing pbid-HTML_TEXT-container
    divs = soup.find_all('div', class_='pb-detail-item-container')

    for div in divs:
        a_tags = div.find_all('a')
        p_tags = div.find_all('p')

        # Extract and write the text within the <a> tags to the text file
        for a_tag in a_tags:
            output_file.write(f" {a_tag.text}\n")

        # Extract and write the text within the <p> tags to the text file
        for p_tag in p_tags:
            output_file.write(f" {p_tag.text}\n")
