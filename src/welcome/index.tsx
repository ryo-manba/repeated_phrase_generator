import '../global.css';
import { createRoot } from 'react-dom/client';
import Welcome from './Welcome';

createRoot(document.getElementById('root') as HTMLElement).render(<Welcome />);
