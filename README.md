# VITAL

VITAL is a hospital appointment scheduler for patients to be able to book appointments with providers if they are a hospital member. Patients are able to book available times, send a message to their providers before their appointment with symptoms, concerns, medications, etc., keep track of their doctor’s recommendations during their appointments, and view/edit/delete both their messages and recommendations.

Created by Srija Gadiraju & Senay Tilahun

Design Document: [here](https://docs.google.com/document/d/1WbJf9y3eyiVDzyMLi3fp7mMP7u2sID_RajBZ9RVvzyk/edit?usp=sharing)

Slides: [here](https://docs.google.com/presentation/d/159Q970wUppgrnvJBeWqMwolbRyurYfYSv0ajo7fmWYc/edit?usp=sharing)

## Demo

Walkthrough Video: [here](https://youtu.be/_JvaXSXABQ4)

Website Link: [here](https://vital-stqk.onrender.com)

## Screenshots

<img width="800" alt="homepage screenshot" src="./front/src/assets/homepage.png">

<img width="800" alt="how it works screenshot" src="./front/src/assets/hiw.png">

<img width="800" alt="Register page screenshot" src="./front/src/assets/register.png">

<img width="800" alt="Login page screenshot" src="./front/src/assets/login.png">

<img width="800" alt="Patient portal page screenshot" src="./front/src/assets/potal.png">

<img width="800" alt="Apt confirmation page screenshot" src="./front/src/assets/confirm.png">

<img width="800" alt="Notes page screenshot" src="./front/src/assets/notes.png">

## Class reference

Link: https://johnguerra.co/classes/webDevelopment_fall_2023/

## Installation

To set up Vital, you'll need the following:

Clone the repository:

```
git clone https://github.com/srijagadiraju/VITAL
```

Navigate to the root directory:

```
cd VITAL
npm install
cd front
npm install
npm run build
cd..
npm start
```

### Dependencies:

#### Backend server

```
"body-parser": "^1.20.2",
"cookie-parser": "~1.4.4",
"debug": "~2.6.9",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"express-session": "^1.17.3",
"http": "^0.0.1-security",
"mongodb": "^6.2.0",
"morgan": "~1.9.1",
"passport": "^0.6.0"
```

#### frontend dependencies

```
"dotenv": "^16.3.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.48.1",
"react-icons": "^4.11.0",
"react-router-dom": "^6.18.0"
```

To install these dependencies, you can run the command above once you've cloned the repo

## Usage

```
- Vital offers the following features:

- Register/Login Page: Sign in to be directed to appointment portal page.

- Filter: Use filter on appointment portal page to narrow down search to specific department, time, date, or doctor.

- Send A Message To Doctor: After selecting an appointment, you can directly message that doctor with symptoms, concerns, etc.

- Recommendations: You can use the Appointment Notes page during appointments to write down doctor's recommendations, lifestyle changes, medication usages, etc.
```

## Features

- Home Page/Unauthenticated page
  -- Hero, explains what Vital is, how it works, and CTAs to join
- Login/Register Page
- Patient Portal page
  -- Main Page with all appointments and choosing departments with search bar
  -- Patients can filter through all appointments and choose the time/date that is best for their schedule
- Appointment confirmation page
  -- View confirmed appointment with selected provider
  -- Patients can add messages, edit messages, or delete messages for their doctors before their visit with symptoms, concerns, and other health problems
- Appointment Tracker Page
  -- Patients are able to keep track of their doctors’ recommendations, medication usages, and other things discussed with their doctors during their appointments
  -- Patients can look back at and update these entries at any point to keep track of the recommendations and can delete their notes whenever

## Configuration

There are no specific configuration requirements for Vital. The project is designed to be straightforward to set up and use.

## License

This project is licensed under the MIT License.
