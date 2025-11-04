# -*- coding: utf-8 -*-
{
    'name': 'Brand Carousel Snippet',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'summary': 'Infinite scrolling carousel for brand logos',
    'description': """
        Add an infinite scrolling carousel to your website with customizable brand logos.
        Features:
        - Infinite smooth scrolling animation
        - Fully customizable from CMS (images, speed, size, spacing)
        - Responsive design
        - Easy to add/remove brands
    """,
    'author': 'dracudev',
    'depends': ['website'],
    'data': [
        'views/snippets.xml',
        'views/options.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_brand_carousel/static/src/scss/brand_carousel.scss',
            'website_brand_carousel/static/src/js/brand_carousel.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
