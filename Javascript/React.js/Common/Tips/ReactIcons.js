/*
React Icons
A fundamental part of any UI is the icons. Instead of including our own icons,
we’ll leverage the react-icons package from NPM. react-icons will give us access
to all the icons available in Font Awesome, Ionicons, Material Design, Github Octicons, and more.

As you’d expect, the API is pretty simple. You use a named import to import the
icon component you want then you can customize it via its props.

Importing
The import path is different depending on which icon set you want to use.
*/

// Font Awesome
import { FaIconName } from 'react-icons/fa'

// Material Design
import { MdIconName } from 'react-icons/md'

// Ionicons
import { IoIconName } from 'react-icons/io'

// Github Octicons
import { GoIconName } from 'react-icons/go'
/*
For a full list of the icons available, visit their site.

Customizing
The main 3 props you’ll use to customize each icon are size, color, and className.

size is an integer and allows you to change the size of the icon.
color is a string and allows you to set the color of the icon.
className is a string and allows you to apply a CSS class to the svg element that is rendered.
*/
