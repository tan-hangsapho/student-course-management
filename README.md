def generate_readme():
    project_name = "Student Course Management"
    description = "A project to manage student courses with CRUD and search functionalities for students and courses."
    features = [
        "CRUD operations for students",
        "CRUD operations for courses",
        "Search functionality for students",
        "Search functionality for courses"
    ]
    dependencies = "yarn install"
    start_command = "yarn start:dev"
    technologies = ["Node.js", "Express.js", "MongoDB"]
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

{description}

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
