from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

class Resume(BaseModel):
    name: str
    email: str
    skills: List[str]

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/parse-resume")
def parse_resume(resume: Resume):
    try:
        # Placeholder for resume parsing logic
        parsed_data = {
            "name": resume.name,
            "email": resume.email,
            "skills": resume.skills
        }
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
