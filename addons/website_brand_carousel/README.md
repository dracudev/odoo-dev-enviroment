# Brand Carousel Snippet for Odoo 18

## Description

A fully customizable infinite scrolling carousel component for Odoo CMS that displays brand logos with smooth animations. Perfect for showcasing partners, clients, certifications, or any brand imagery on your website.

## Features

- **Infinite Smooth Scrolling**: Seamless loop animation that never stops
- **Fully Customizable**: Control every aspect from the Odoo CMS editor
- **Easy Brand Management**: Add, remove, or replace logos with simple clicks
- **Responsive Design**: Automatically adapts to all screen sizes
- **Multiple Style Options**: Grayscale filters, background colors, and more
- **Interactive**: Optional pause on hover, clickable logos with links
- **Performance Optimized**: Lightweight and smooth animations

## Customization Options

All settings are accessible directly from the Odoo Website Builder:

### Animation Settings

- **Speed Control**: Choose from Very Fast to Very Slow (10s - 60s)
- **Pause on Hover**: Enable/disable animation pause when hovering

### Visual Settings

- **Logo Height**: 40px to 120px (5 preset sizes)
- **Logo Spacing**: 20px to 100px (5 preset spacings)
- **Grayscale Filter**: Convert logos to grayscale with color on hover
- **Background Style**: None, Light, Dark, Primary, or Secondary color

### Individual Logo Settings

- **Custom Images**: Replace placeholder with your brand logos
- **Links**: Make logos clickable to link to partner websites
- **Alt Text**: Add accessibility-friendly descriptions

## Installation

1. **Copy the module** to your Odoo addons directory:

   ```bash
   cp -r website_brand_carousel /path/to/odoo/addons/
   ```

2. **Restart Odoo** to detect the new module:

   ```bash
   docker-compose restart odoo
   ```

3. **Update Apps List**:

   - Go to Apps menu
   - Click "Update Apps List"
   - Search for "Brand Carousel Snippet"

4. **Install the module**:
   - Click Install

## Usage

### Adding the Carousel to Your Page

1. Open your website in **Edit** mode
2. Click **Blocks** in the editor
3. Navigate to **Structure** section
4. Drag the **Brand Carousel** snippet onto your page
5. Click **Save**

### Customizing the Carousel

1. **Click on the carousel** section to select it
2. Open the **Customize** panel (right sidebar)
3. Adjust settings:
   - Animation Speed
   - Logo Height
   - Logo Spacing
   - Grayscale effect
   - Pause on Hover
   - Background Style

### Adding/Removing Brands

1. **In Edit mode**, click on the carousel
2. To **add a logo**:
   - Click on an existing logo
   - Click the **+** icon to duplicate
   - Or manually add `<div class="brand-item">` with an `<img>` inside
3. To **remove a logo**:
   - Click on the logo
   - Press Delete key
4. To **replace an image**:
   - Click on the logo
   - Click **Replace** in the image toolbar
   - Upload or select your new brand logo

### Adding Links to Logos

1. Click on a brand logo
2. Click the **Link** button in the toolbar
3. Enter the URL
4. Choose to open in new tab (recommended)
5. Save

## Best Practices

### Image Requirements

- **Format**: PNG with transparent background (recommended) or SVG
- **Size**: Maximum width 200-300px for best performance
- **Height**: Images will auto-scale, but upload at consistent heights
- **File Size**: Keep under 100KB per image

### Number of Logos

- **Minimum**: 4-6 logos for smooth animation
- **Recommended**: 8-12 logos for best visual effect
- **Maximum**: No hard limit, but keep reasonable for performance

### Speed Settings

- **Fast sites**: Use "Normal" or "Fast" speed
- **Professional sites**: Use "Slow" or "Normal" speed
- **Many logos**: Use "Slow" to give viewers time to see each one

### Styling Tips

- Use grayscale for a modern, cohesive look
- Match background color to your site's theme
- Keep logo spacing consistent with your design language
- Test on mobile devices to ensure readability

## Technical Details

### File Structure

```tree
website_brand_carousel/
├── __init__.py
├── __manifest__.py
├── views/
│   ├── snippets.xml          # Snippet template
│   └── options.xml            # CMS configuration panel
├── static/
│   └── src/
│       ├── scss/
│       │   └── brand_carousel.scss    # Styles
│       ├── js/
│       │   └── brand_carousel.js      # Functionality
│       └── img/
│           ├── placeholder-logo.svg    # Default logo
│           └── snippet_thumbnail.svg   # Builder thumbnail
```

### CSS Classes

- `.s_brand_carousel` - Main section container
- `.brand-carousel-wrapper` - Overflow container with gradient mask
- `.brand-carousel-track` - Animated track containing logos
- `.brand-item` - Individual brand container
- `.brand-logo` - Logo image styling

### Data Attributes

- `data-animation-speed` - Animation duration in seconds
- `data-logo-height` - Logo height in pixels
- `data-logo-spacing` - Space between logos in pixels
- `data-grayscale` - Enable/disable grayscale filter
- `data-pause-on-hover` - Enable/disable pause on hover

## Troubleshooting

### Carousel not appearing

- Ensure module is installed and activated
- Clear browser cache
- Restart Odoo server

### Animation not smooth

- Reduce number of logos
- Check CSS animation support in browser
- Ensure images are optimized

### Logos too small/large on mobile

- The carousel automatically adjusts for mobile
- Check your logo source images aren't too small
- Adjust the Logo Height setting

### Gaps in animation loop

- Ensure you have at least 4-6 logos
- The JavaScript automatically duplicates items for seamless loop

## Updates

### Version 1.0.0

- Initial release
- Infinite scroll animation
- Full CMS customization
- Responsive design
- Grayscale and hover effects

## License

This module is distributed under the GNU Lesser General Public License v3.0 (LGPL-3), which means:

- **You are free to use** this module for any purpose, commercial or non-commercial
- **You must include** the license and copyright notice
- **You must document changes** made to the code
- **You must provide access** to the modified source code when distributed
- **You can use it in proprietary software** as long as you comply with the LGPL terms
- **Any modifications** must also be licensed under LGPL-3 or compatible license

For full license details, see: <https://www.gnu.org/licenses/lgpl-3.0.en.html>

## Support

For issues, questions, or contributions, please contact your development team.

## Credits

Developed for Odoo 18.0 CMS
