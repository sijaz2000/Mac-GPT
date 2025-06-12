
# Mac-GPT
**An OpenAI Assistants API-powered chatbot capable of answering questions related to Macalester College.**
The chatbot solves a simple problem: No need to go through webpage after webpage to find information regarding a course, a professor, or when the vacation starts!


 
## Technologies


### OpenAI Assistants API:
- Allows creation of custom LLMs from your own sources
- Can be trained by providing text files through the API's UI

### Frontend:
- **React.js**: Used for event handling
- **FluentUI**: Used for buttons
- **ChatScope**: Used for messaging interface
- **HTML/CSS**: Used for component placement and animations

### Backend:
- **Express.js**: Used to create our server and communicate with the OpenAI API

### Web Scraping:
- **BeautifulSoup**: A Python library, which was used to scrape data from Macalester's suite of websites

### Database:
- **Google Firebase**: Firebase was used to store each unique user's chat history

### Additional:
- **Google OAuth**: To ensure that only `@macalester.edu` accounts can log in



## Demo: Course Planning

Mac-GPT is capable of looking at major or minor requirements and advice the user on what courses need to be taken in order to complete a certain major or minor. Moreover, it is capable of giving exact course codes and determining whether it is available in a specific semester or not.





## DISCLAIMER!

As we, the developers, were still college students, we were unable to keep paying for the OpenAI API. However, once we start making **$$$** we plan to reactivate our LLM and continue working to make it better.
