# WUMBO TEMPLATE

## What is this?
This is the EVERYTHING all-in-one modchart template that I've been using and building up over the last few years.
I recently spent the last few weeks giving it a bit of an overhaul so it can be a lot friendlier to people just starting out modchart, and can be used with the most minimal of coding experience.

## Who is it for?
This template is geared towards (experienced) ***MAPPERS!!!*** 
***Not*** designers, 3D modelers, lighting techs, or comp-sci major turbo nerds.
While I did try to make it friendly for people that aren't familiar with code (and/or don't want to learn how to code), this is expected that you have a ***very*** in-depth knowledge of beat saber mapping in general, you're somewhat familiar with the info.dat/difficulty file formatting and structure, and that you know most of the common jargon around

The actual workflow of this is very barebones, with almost all features geared towards working with the playable objects (Note, Walls, Bombs, Etc.)
I tried to keep most things as close to the raw JSON syntax as possible (default difficulty file formatting and terms), with only a few minor changes to terms where I felt they would speed up workflows while still being obvious enough to understand. The reason to keep things the same and *not* simplify them is because having to memorize things three different times and refrence multiple documentations just to do one thing SUCKS.
With this you can look up both the documentation for the base game formating, or look at the Noodle/Chroma documentation, and everything will still make relative sense without having to do a bunch of mental gymnastics.


## Why is this over 3000 lines long?!?
Mappers (myself included), are **LAZY!** 

Most of us either don't like to, or can't remember every little bit of documentation, instruction, tip, or reference needed when working on things.
This script has everything all contained in a single package, and seperated into regions with their own indexed search terms that can quickly be CTRL+F'd to if you want to look something up.
Along with that, everything in there that you can look up has commented text explaining that specific thing, and even highlights some common tips/quirks related to it that you'd otherwise have to find out the hard way. 

Personally, I usually have two instances of this opened in VSC (right-click the script tab -> "split right")
The left window is my main "working" window, and right I use as my "I need to look up things up" / "CTRL+F" window. I also usually have the input/output difficulties open on that right tab as well, just so I can quickly make sure every exported properly and I didn't mess something up when working on mods.
I find this workflow saves a lot of time vs. having to constantly tab out to Chrome/Discord to reference other documentation.

The whole package is designed for a copy/paste/adapt style workflow, with ready to use examples/descriptions for just about every gameplay related feature available in Noodle/Chroma.
Every function used in there is also designed with various levels of complexity and a decent ammount of comments, so that over time you can learn how to pick them apart, and adapt them to your own weirdly specific needs.

If you find the comments and added info is just wayyyy too much yapping and clutter, you're free to delete anything you find unecessary. I just ask that you *please* take the time to read any comment that you delete before hand, as most of it is tips and tricks written and chosen based off of previous trial and error experience. They're only there to help with quality control/preventing future frustrations :)

I am also currently working on a modular version as well for the people that know a bit more about what they're doing. This will have all functions/defines/styling/setup/export/whatever handled by their own files, and the main "working" script is focused just around the stuff you wanna write without the added clutter being directly in your face.


## How do I use it?
Since this is still in the VERY early stages of release, I haven't made a proper Wiki yet.
In the mean time, here's the basics that you will need to get going

# Setup and Use:
## Installing required software:
Download and install both of these:
- Visual Studio Code: https://code.visualstudio.com/
- Node.JS: https://nodejs.org/
*We will download and setup the script in a bit! First we need to enable dev tools in game, and set up the map correctly!*

## Game Setup:
### Launch arguments:
- `-aerolunaisthebestmodder` -> Enables dev tools such as ["ReLoader"](https://github.com/Aeroluna/Heck/wiki/ReLoader), so you can refresh and see changes in a map, without needing to go back to the menu.
- `--verbose` -> Enables the console window which will display any errors and stuff (red/purple text) that Chroma/Noodle will yell at you when you inevitably break something.
- `fpfc` -> Allows you to use the game and fly around in desktop mode, without needing a VR headset. (First Person Free cam)

**To set these in Steam:**
- Right click on the game in your library
- Add each argument to the "Launch Options" text box under the "General" tab

**How to use in BSManager:**
- Click both boxes for "FPFC Mode" and "Debug Mode" so that they have a rainbow highlight
- Select the "Advanced launch" button below, and then enter in the text for `-aerolunaisthebestmodder`

### Other Configs:
These you can find in your UserData foler.

**Camera2:** 
I personally find it quite useful to create a unique Cam2 camera for FPFC.
You can do this by clicking on the camera 2 tab, creating a new camera like you normally would, but adjust it's settings so that there is no z offset, it's visibility see's everything at max distance, and then settings it's "scenes" to only be active in FPFC. For a more accuracte representation of what a player would see in headset, I recommend lowering the FOV to something around the 70-80 range. 
Personally, I have multiple cameras set up to unique scenes, and each scene having it's own keybind. One camera is a low FOV around the 65 range, and the other is my main FPFC camera at 85 fov.
Check out the Camera2 documentation for more info on how to set that up.
- [General settings and useful info (above FAQ)](https://github.com/kinsi55/CS_BeatSaber_Camera2/wiki)
- [Custom Scenes](https://github.com/kinsi55/CS_BeatSaber_Camera2/wiki/Scenes#custom-scenes)
- If you just want to create a new camera, just do it by following the buttons in-game as you normally would. Move the new camear to the top layer, and set the scenes from the middle window "scene" tab.
- I also recommned setting the "smoothing" values to something CRAZY high like 99999 if you plan on using RUE for environment work, or if your'e using any kind of FPFC Toggle.

**SiraUtil:** ("FPFCToggle" and "SongControl")
- `"CameraFOV"` Ignore if using Cam2, set if using base game camera
- `"MoveSensitivity"` WASD move speed
- `"MouseSensitivity"` Mouse look sensitivity
- `"ToggleKeyCode": "F"` Keybind used to toggle in/out of FPFC mode
- `"LockViewOnDisable": true` Same thing as smoothing mentioned above in Cam2 settings
- `"Ignore"` Ignores the FPFC launch argument, useful to quickly swap between headset/desktop
- `"SongControl"` Keybinds for when you're actually in a song

**Chroma:**
- `"PrintEnvironmentEnhancementDebug"` When "true" will log all environment object data while playing any map with a "Chroma" requirement or suggestion. These logs can be found in the "logs" folder under `_latest.log`
You can also find a dump of a bunch of ready made and organized log files here: https://github.com/UGEcko/Chroodle/tree/main/ChromaLogs

**Heck:** (ReLoader)

These contain all the settings for the previously mentioned "ReLoader" debug tool.

***Note:*** *All these keybinds work without requiring you to actually pause the game! You're free to scrub back and fourth, set new "in" points, and reload the map from those points at any time while the song is playing! Just keep in mind that "hot reloading" with spacebar only works with playable objects and lighting events. Environment enhancements, Chroma Geometry, and some custom events might not work correctly with hot reloads. If something seems off, restart the level to reload the scene, if it still seems off, back out to the menu and refresh completely to check.*
*"Hot reloads" do* ***NOT*** *count as full refreshes! Once you back out to the menu, you will have to refresh the song as normal by hitting "R" for a quick song refresh, or "CTRL+R" for a full playlist refresh.*

Anyway, most of these options are self explanatory, but just to clear things up, here's what the default keybinds do:
- `Space` Hot reloads all playable objects and lights (excluding geometry and/or environment enhancements) from the current start time.
- `Left CTRL` Sets a new "start time"
- `Arrow Keys L + R` Skips forward or back throughout the song x amount of beats defined by the  `"ScrubIncrement"` setting (Default 5.0)

***Note:*** *You can only scrub back to and/or reload what is alread loaded by the game in practice mode. If you start the song at 30s in practice mode, and scrub back to 10s, you aren't going to see anything. This is normal. Best practice is to always start at 0s, then use the arrow keys to scrub forward, and the CTRL key to set your "in" point with ReLoader instead.*