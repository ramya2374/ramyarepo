const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const events = [
    { id: 'Eve001A', name: 'Event One', date: '2024-10-25', time: '10:00 AM', place: 'Community Park', description: 'Celebrate the autumn harvest with local vendors, fresh produce, and family-friendly activities. Enjoy live music, craft booths, and delicious food from farm-to-table stalls.' },
    { id: 'Eve002A', name: 'Event Two', date: '2024-10-26', time: '11:00 AM', place: 'Convention Center', description: 'Join us for a day of showcasing the latest advancements in technology. Explore innovative products, attend workshops, and network with industry leaders. Ideal for tech enthusiasts and professionals alike!' },
    { id: 'Eve003A', name: 'Event Three', date: '2024-10-27', time: '12:00 PM', place: 'Grand Ballroom', description: 'Experience a magical evening filled with holiday cheer! Enjoy a gourmet dinner, live entertainment, and a silent auction, all in support of local charities. Dress in your finest winter attire!' },
    { id: 'Eve004A', name: 'Event Four', date: '2024-10-28', time: '1:00 PM', place: 'City Art Gallery', description: 'Sip and savor at our annual Art & Wine Festival! Sample exquisite wines from local vineyards while browsing stunning artworks by talented artists. Enjoy live painting demonstrations and food pairings throughout the day.' },
    { id: 'Eve005A', name: 'Event Five', date: '2024-10-29', time: '2:00 PM', place: 'Downtown Community Center', description: 'Discover new ways to enhance your well-being! Participate in health screenings, fitness classes, and informative workshops led by health professionals. Bring the whole family for a day of health, fun, and wellness tips!' }
];

// Endpoint to get event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;
    const event = events.find(e => e.id === eventId);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
