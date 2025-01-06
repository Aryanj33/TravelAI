# TravelAi
TravelAi is an intelligent travel planner that simplifies your travel planning process. It helps users by providing a detailed itinerary of a destination and offers seamless options to add hotels and flights to a personalized cart for easy reference and booking.




## Features
- **Itinerary Generation**: Automatically generates a detailed itinerary for your chosen destination, keeping in mind your return and departure details.
- **Personalized Trip Planning**: Asks for your trip company (e.g., solo, family, friends) and the type of trip you are planning (e.g., leisure, adventure, business) to tailor the itinerary accordingly.
- **Edit Itinerary**: By clicking edit in the itinerary section, you can customize your travel plans to suit your preferences.
- **Hotel Booking**: View and add hotels to your cart for easy comparison and booking.
- **Flight Selection**: Browse available flights and add your preferred options to the cart.
- **Dynamic Cart System**: Add or remove hotels and flights with a user-friendly toggle system.
- **Responsive Design**: Optimized for all devices, ensuring a smooth user experience on mobile, tablet, and desktop.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Flask (Python) with SQLite for database management
- **Styling**: CSS3, with responsive design principles
- **State Management**: React hooks for managing cart and itinerary data
- **APIs**: Integrated APIs for fetching flight and hotel details
- **Data Sources**: Utilized Gemini and TripAdvisor for hotel and flight data

## Installation
To set up and run TravelAi locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TravelAi.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TravelAi
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Navigate to the backend directory:
   ```bash
   cd backend
   ```

5. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Run the backend server:
   ```bash
   python app.py
   ```

7. Return to the root directory and start the frontend development server:
   ```bash
   cd ../
   npm start
   ```

8. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage
1. Select your destination and view the generated itinerary.
2. Edit your itinerary to customize your travel plans.
3. Browse through the recommended hotels and flights.
4. Add your preferred options to the cart.
5. Review your cart for finalizing your travel arrangements.

## Dynamic Cart System
The cart allows you to toggle items (hotels and flights) dynamically. When an item is added, the button text changes to "Remove from Cart," and when removed, it reverts to "Add to Cart."

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature/fix bug"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Happy Travels with TravelAi!

