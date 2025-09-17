# Flashcard Study App 📚✨

A Spring Boot + Thymeleaf based flashcard study application.  
Users can **add, edit, delete, view flashcards** and also take a **quiz mode** with multiple-choice questions and automatic scoring.

---

## 🚀 Features
- Add, edit, delete flashcards
- View all flashcards in a neat list
- Quiz mode with **4 options per question** and score calculation
- Preloaded flashcards on startup
- Responsive **classic styled UI**

---

## 🛠️ Tech Stack
- Java 23
- Spring Boot 3.2
- Spring Data JPA (H2 in-memory DB)
- Thymeleaf (for UI templates)
- CSS (custom styling)

---

## ▶️ How to Run
1. Clone this repo or unzip the project.
2. Open in **IntelliJ IDEA** or any IDE.
3. Run the main class:
FlashcardStudyProjectMavenApplication.java

4. Open the app in browser:  
👉 [http://localhost:8080](http://localhost:8080)

---


## 📂 Project Structure
src/main/java/com/example/flashcard/
├── controller/ # Controllers
├── model/ # Entities
├── repository/ # Repositories
├── service/ # Services
└── FlashcardStudyProjectMavenApplication.java
src/main/resources/
├── templates/ # Thymeleaf HTML pages
└── static/ # CSS (style.css)

---

## 📝 Notes
- Database: **H2 in-memory** (auto resets on restart)
- Change DB to MySQL/Postgres easily by editing `application.properties`

---
✨ Built with ❤️ using Spring Boot + Thymeleaf
