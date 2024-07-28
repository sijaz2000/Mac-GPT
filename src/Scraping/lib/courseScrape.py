import csv
from bs4 import BeautifulSoup

# Read the HTML file
with open('fall2023course.html', 'r') as file:
    html_content = file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Create a CSV file for output
with open('fall2023course.csv', 'w', newline='', encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file)

    # Write header row
    csv_writer.writerow(['Course Code', 'Course Title', 'Meeting Info', 'Instructor', 'Seats Available', 'Max Enrollment', 'Additional Details', 'Paragraph Text'])

    # Find all the <span> elements with the class "pb-detail" containing pbid-DATA_HTML_TEXT or pbid-DATA_HTML_TEXT2
    spans = soup.find_all('span', class_='pb-detail')

    for span in spans:
        # Extract data from <td> tags if available
        td_tags = span.find_all('td')
        course_code = course_title = meeting_info = instructor = seats_available = max_enrollment = ''

        if len(td_tags) >= 6:
            course_code = td_tags[0].text.strip()
            course_title = td_tags[1].text.strip()
            meeting_info = td_tags[2].text.strip()
            instructor = td_tags[3].text.strip()
            seats_available = td_tags[4].text.strip()
            max_enrollment = td_tags[5].text.strip()

        # Extract additional details from <p> and <a> tags within the <span>
        additional_details = '\n'.join([p.text.strip() for p in span.find_all('p')])
        additional_details += '\n'.join([a['href'].strip() for a in span.find_all('a', class_='BookstoreLink')])

        # Extract text from <p> tag
        paragraph_text = '\n'.join([p.text.strip() for p in span.find_all('p')])

        # Write a row to the CSV file
        csv_writer.writerow([course_code, course_title, meeting_info, instructor, seats_available, max_enrollment, additional_details, paragraph_text])
