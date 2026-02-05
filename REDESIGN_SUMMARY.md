# ROSO Esports - NRG.gg-Inspired Redesign

## Overview
This redesign transforms the ROSO Esports website to mirror the aesthetic and functionality of nrg.gg, featuring a bold, modern, gaming-oriented look with vibrant color palettes and interactive elements.

## Design System

### Color Palette (NRG.gg Inspired)
- **Luxor Gold**: `#AE812E` - Primary brand color for logos, buttons, and accents
- **Gold Light**: `#D4A853` - Secondary gold for gradients
- **Burnt Umber**: `#833425` - Tertiary brand color
- **Vibrant Orange**: `#FF6B35` - Accent color for highlights and CTAs
- **Orange Bright**: `#FF8C42` - Secondary orange for gradients

### Typography
- **Headers**: Oswald (Bold, 700-900 weight) - High-impact, gaming-style font
- **Body**: Poppins (300-900 weight) - Modern, clean sans-serif

### Layout Features
1. **Sticky Navigation**: Fixed header with blur backdrop and gold border accent
2. **Hero Section**: Full-screen with gradient text and parallax effects
3. **Grid Layouts**: Modular card-based sections for teams, news, and partners
4. **Responsive Footer**: Multi-column layout with organized links

## Interactive Features

### JavaScript Enhancements
1. **Smooth Scrolling**: Navigation links smoothly scroll to sections
2. **Parallax Effects**: Hero section moves at different speeds while scrolling
3. **Scroll Animations**: Elements fade in as they enter viewport
4. **Stat Counters**: Numbers animate from 0 to target value
5. **3D Card Tilt**: Team cards tilt based on mouse position
6. **Newsletter Animation**: Celebration particles on form submission
7. **Mouse Trail**: Subtle particle trail following cursor

### Configuration
All magic numbers are extracted to a configuration object:
```javascript
const CONFIG = {
    PARTICLE_MIN_VELOCITY: 5,
    PARTICLE_SPREAD_MULTIPLIER: 30,
    PARTICLE_UPWARD_BIAS: -50,
    CARD_TILT_SENSITIVITY: 20,
    MOUSE_TRAIL_INTERVAL: 50
};
```

## Responsiveness

### Breakpoints
- **Desktop**: > 1024px - Full layout with all features
- **Tablet**: 768px - 1024px - Adjusted grid layouts
- **Mobile**: < 768px - Single column layout, hidden nav menu
- **Small Mobile**: < 480px - Optimized typography and spacing

## File Structure

```
/roso
├── index.html          # Main HTML structure
├── style.css           # NRG.gg-inspired styles (14KB)
├── app.js              # Interactive features (13KB)
├── .gitignore          # Excludes old design files
├── styles.css          # (Legacy - excluded from git)
└── script.js           # (Legacy - excluded from git)
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- CSS-based animations for smooth 60fps
- RequestAnimationFrame for scroll effects
- Throttled event handlers to prevent performance issues
- Optimized Google Fonts loading

## Security
- No vulnerabilities detected by CodeQL
- No external dependencies beyond Google Fonts
- All interactive features use safe DOM manipulation

## Future Enhancements
- Add mobile hamburger menu
- Implement actual team rosters
- Connect newsletter form to backend
- Add more team-specific content
- Integrate with CMS for news updates
