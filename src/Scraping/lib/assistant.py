from openai import OpenAI
import shelve
from dotenv import load_dotenv
import os
import time

load_dotenv()
OPEN_AI_API_KEY = os.getenv("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")
client = OpenAI(api_key=OPEN_AI_API_KEY)


# --------------------------------------------------------------
# Upload file
# --------------------------------------------------------------
def upload_file(path):
    # Upload a file with an "assistants" purpose
    file = client.files.create(file=open(path, "rb"), purpose="assistants")
    return file


# file = upload_file("../data/airbnb-faq.pdf")


# --------------------------------------------------------------
# Create assistant
# --------------------------------------------------------------
def create_assistant(file):
    """
    You currently cannot set the temperature for Assistant via the API.
    """
    assistant = client.beta.assistants.create(
        name="Mac-GPT",
        instructions="This GPT will answer questions exclusively about Macalester College and will not provide answers for other kinds of questions. It will answer questions about courses, holidays, history of the college, and college programs. It will also help build a course plan based on the courses and the requirements of the major that the customer is asking about. For example, if the customer is asking about the computer science major at macalester college, the GPT will give a vourse plan that meets all the major requirements and all relevant courses taken over the course of the student's 4 years at Macalester. Be mindful of pre requisites.",
        tools=[{"type": "retrieval"}],
        model="gpt-4-1106-preview",
        file_ids=[file.id],
    )
    return assistant


# assistant = create_assistant(file)


# --------------------------------------------------------------
# Thread management
# --------------------------------------------------------------
def check_if_thread_exists(wa_id):
    with shelve.open("threads_db") as threads_shelf:
        return threads_shelf.get(wa_id, None)


def store_thread(wa_id, thread_id):
    with shelve.open("threads_db", writeback=True) as threads_shelf:
        threads_shelf[wa_id] = thread_id


# --------------------------------------------------------------
# Generate response
# --------------------------------------------------------------
def generate_response(message_body, wa_id, name):
    # Check if there is already a thread_id for the wa_id
    thread_id = check_if_thread_exists(wa_id)

    # If a thread doesn't exist, create one and store it
    if thread_id is None:
        print(f"Creating new thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.create()
        store_thread(wa_id, thread.id)
        thread_id = thread.id

    # Otherwise, retrieve the existing thread
    else:
        print(f"Retrieving existing thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.retrieve(thread_id)

    # Add message to thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=message_body,
    )

    # Run the assistant and get the new message
    new_message = run_assistant(thread)
    print(f"To {name}:", new_message)
    return new_message


# --------------------------------------------------------------
# Run assistant
# --------------------------------------------------------------
def run_assistant(thread):
    # Retrieve the Assistant
    assistant = client.beta.assistants.retrieve("asst_Xr7WSp8Vcpp3XPwNBg45WN57")

    # Run the assistant
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
    )

    # Wait for completion
    while run.status != "completed":
        # Be nice to the API
        time.sleep(0.5)
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

    # Retrieve the Messages
    messages = client.beta.threads.messages.list(thread_id=thread.id)
    new_message = messages.data[0].content[0].text.value
    print(f"Generated message: {new_message}")
    return new_message


# --------------------------------------------------------------
# Test assistant
# --------------------------------------------------------------

new_message = generate_response("What are the macalester calender for spring 2024", "123", "Tenzin")