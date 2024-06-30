

    readme_content = f"""
# Student Course Management

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
