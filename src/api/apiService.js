import axios from 'axios';

export const getTravelInfo = async (from, destination, startDate, endDate) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/generate-itinerary', {
            from,
            destination,
            startDate,
            endDate
        });
        return response.data.itinerary;
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        return "Failed to generate itinerary.";
    }
};
