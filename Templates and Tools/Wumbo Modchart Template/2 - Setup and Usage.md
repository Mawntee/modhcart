# Script Setup/Overview

## Setup
- Drag the script (.js) file into the map folder alongside the info.dat, ogg, and difficulty.dat files
- Open Visual Studio Code, Navigate to `File` -> `Open Folder...`, and then select your map folder.
  - If it asks you if you trust whatever, just blindly slap the yes button. You can trust me :3

Now that it's open, lets take a quick look around and figure out what everything is.

## Overview - Visual Studio Code
### Navigation and Formatting:
On the left you will see the navigation stuff. Your main focus is the "Explorer" tab in the top left corner, under the blue logo.

![image](https://github.com/user-attachments/assets/8a13ebb7-42ad-42af-8346-76f472629210)

From this tab you can select the script, or any of the difficulty files and see the raw data that makes up all stuff in a Beat Saber map.

For the sake of example here, lets take a quick look at the difficulty files first. I'm going to open up my "input" difficulty, which in this case is my `ExpertPlusLawless.dat`.

![image](https://github.com/user-attachments/assets/619d1091-b3d5-48bd-9ff5-6018a8cbc712)


In most cases you will be greeted with something that might look like a giant wall or line of grey text. If that's the case, head down to the bottom right and look for something that says "DAT", "JSON", or "Plain Text". (When you hover over it, it will say "Language Mode")

![image](https://github.com/user-attachments/assets/f4a2c590-1e7c-4ff4-98da-f36f3b3cca20)

Click this, and in the drop down that has appeared from the top middle, type in "JSON" and hit enter.

![image](https://github.com/user-attachments/assets/bd2acaec-5df5-46ef-b688-a942b30d19e6)

Now click anywhere in the middle document that's open, and hit `ALT + SHIFT + F` to format the difficulty file into something you can actually read (this may take a second).

You should have something that looks like this:

![image](https://github.com/user-attachments/assets/623d5585-5ae9-41cd-a507-e8442582d073)

That white dot in the top tab is there to remind you that you haven't saved, and you should probably hit `CTRL + S` to do so.

*This white dot will haunt you, make you feel stupid, and cause you immense pain for the rest of you modcharting journey. This is normal.* 

*Remember to save your work often, and that you can't actually run the script unless you save first.*

Also, since you're here, you should take a second to dig through the difficulty file and get yourself familiar with it if you haven't already. You can click the little drop down arrows beside each category to hide/show information inside of each object.

![image](https://github.com/user-attachments/assets/c2548207-f0ba-4655-b33f-d53d21a5218c)

For information about what everything in here means, you can check out the map format section in the BSMG mapping Wiki (3.0.0): https://bsmg.wiki/mapping/map-format/beatmap.html#summary

## Overview - The Script
Now that you kinda know your way around the place, let's take a quick look at the script.

Upon clicking it, you'll probably see a massive wall of green text. Anything green is called a "comment" and is completely ignored when the script runs. Comments are only there to give *you* information about things going on in the code. In this case I've used *(arguably too many)* comments to section things off, yap about anything that might be confusing, and/or provide helpful information and context to certain things.

Take a second to read everything up until the region labeled as "IGNORE - Nerd stuff inside", then head back up to follow the instructions written on line 9

![image](https://github.com/user-attachments/assets/d9720182-50d7-4939-bcb7-6ceb6a746c91)

Once you have followed the steps on line 9, the script should look something like this:

![image](https://github.com/user-attachments/assets/778228e8-d17a-4796-b382-2db29fd7f762)

As you can see, there's a lot of stuff, but most of it you can simply ignore :)

Similarly to how we closed up sections in the difficulty files using the arrows, we're going to do the same here for each region, starting with the "INITIAL SETUP".

Take your time to look through the options and settings, and change whatever you need to change.
Most options will either be a: 
- bool -> `true/false` or sometimes `0/1`
- number -> "int" = whole number, "float" = number with decimal points
- string -> literal words defined by `"quoation marks"`
- array -> any of the above, but in between square brackets - `[usedToJoinMultipleThingsTogether, seperated, byCommas]`

![image](https://github.com/user-attachments/assets/b60f4ffc-ef70-4783-b6b6-4ba58430328e)

Once you have everything set up there, feel free to collapse that section again with the arrow.

The only other regions you'll mainly be using are the "List of Available Functions", "Copy/Paste", and "DO YOUR DIRTY WORK HERE" >:3








