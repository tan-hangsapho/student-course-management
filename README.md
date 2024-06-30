def generate_readme():
    project_name = "Student Course Management"
    description = ("A comprehensive web application designed to manage student courses, featuring CRUD "
                   "(Create, Read, Update, Delete) operations and advanced search functionalities. Built using "
                   "Node.js, Express.js, and MongoDB, this project provides an efficient and user-friendly interface "
                   "for managing educational data.")
    introduction = ("The Student Course Management project is a robust solution for educational institutions to "
                    "efficiently handle student and course information. This application allows administrators to "
                    "perform CRUD operations on student and course records and offers powerful search capabilities "
                    "to quickly locate specific data. Leveraging the power of Node.js for the backend, Express.js for "
                    "the server framework, and MongoDB for the database, this project ensures scalability, reliability, "
                    "and ease of use.")
    features = [
        "CRUD operations for students",
        "CRUD operations for courses",
        "Search functionality for students",
        "Search functionality for courses"
    ]
    technologies = [
        "Node.js: JavaScript runtime",
        "Express.js: Node.js web application framework",
        "MongoDB: NoSQL database for storing student and course data",
        "Jest: JavaScript testing framework"
    ]
    dependencies = "yarn install"
    start_command = "yarn start:dev"
    license_type = "MIT"
    contact_email = "your-email@example.com"

    readme_content = f"""
# {project_name}

{description}

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

{introduction}

## Features

{"".join(f"- {feature}\n" for feature in features)}

## Technologies

The project is built using the following technologies:
{"".join(f"- {tech}\n" for tech in technologies)}

## Installation

To get started with the {project_name} project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/tan-hangsapho/student-course-management.git
    cd student-course-management
    ```

2. **Install dependencies**:
    ```sh
    {dependencies}
    ```

## Usage

To run the project in development mode:
```sh
{start_command}
