import { Router, Request, Response } from 'express';
import { saveInteraction, getInteractions } from '../services/interactionService';

const router = Router();

interface InteractionRequest {
    city: string;
    userId: string;
    interactionType: string;
}

router.post('/', async (req: Request<any, any, InteractionRequest>, res: Response): Promise<void> => {
    const { city, userId, interactionType } = req.body;

    if (!city || !userId || !interactionType) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    try {
        await saveInteraction(city, userId, interactionType);
        res.status(200).json({ message: 'Interaction saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save interaction' });
    }
});

// Get interactions for a city
router.get('/:city', async (req: Request, res: Response): Promise<void> => {
    const city = req.params.city;

    try {
        const interactions = await getInteractions(city);
        res.json(interactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch interactions' });
    }
});

export default router;