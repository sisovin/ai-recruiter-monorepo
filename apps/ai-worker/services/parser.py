import re
from typing import Dict

def parse_resume(resume_text: str) -> Dict[str, str]:
    """
    Parses the given resume text and extracts relevant information.

    Args:
        resume_text (str): The text content of the resume.

    Returns:
        Dict[str, str]: A dictionary containing the parsed resume data.
    """
    parsed_data = {}

    # Extract name
    name_match = re.search(r"Name:\s*(.*)", resume_text)
    if name_match:
        parsed_data["name"] = name_match.group(1)

    # Extract email
    email_match = re.search(r"Email:\s*(.*)", resume_text)
    if email_match:
        parsed_data["email"] = email_match.group(1)

    # Extract skills
    skills_match = re.search(r"Skills:\s*(.*)", resume_text)
    if skills_match:
        parsed_data["skills"] = skills_match.group(1).split(", ")

    return parsed_data
