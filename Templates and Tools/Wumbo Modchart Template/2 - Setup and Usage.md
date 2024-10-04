# Script Setup/Overview

## Setup
- Drag the script (.js) file into the map folder (alongside the info.dat, ogg, and difficulty.dat files)
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
- bool -> `true/false` (or sometimes `1/0` respectively)
- number -> "int" = whole number `420`, "float" = number with decimal points `420.69`
- string -> literal words defined by `"quotation marks"`
- array -> any of the above, but in between square brackets - `[usedToJoinMultipleThingsTogether, seperated, byCommas]`

![image](https://github.com/user-attachments/assets/b60f4ffc-ef70-4783-b6b6-4ba58430328e)

- once you have everything set up there, feel free to collapse that section again with the arrow.

The only other regions you'll mainly be using are the "List of Available Functions", "Copy/Paste", and "DO YOUR DIRTY WORK HERE" >:3

Before we dive into those, let's take a second to figure out how to actually run this stupid thing and make it do stuff

## Usage - Running The Script

Before we run the script, it's usually a good idea to rename it to something relating to your map. This way when you come back to it, you have some idea of wtf it's for and what was going on. TO do this, head over to the explorer on the left, right click, and rename it to whatever you want.

![image](https://github.com/user-attachments/assets/ecec5a49-99de-4811-8e52-c462b5a1d465)

Now to run the script, right click on it again in the explorer, and hit the option for "Open in Integrated Terminal"
- you will see a new thingy pop up on the bottom!

![image](https://github.com/user-attachments/assets/ba15d055-6ed2-4244-96b6-d8e3c14554fb)

In the terminal that just opened up, type in `node nameOfYourScript`, and hit Enter

![image](https://github.com/user-attachments/assets/4a661c36-118b-4a49-819a-44ef27e02538)

The script should run sucessfully, and it should start yapping to you about a bunch of stuff in the logs.

Assuming you didn't change any settings, let's go over real quick what these do:

**Cringe Prevention:** Forces a lot of settings/options that are typically set by the player, but can lead to modcharts looking really janky, and sometimes even being completely unplayable depending on the map and current player settings. 

***The main settings changed here are:***
- JD -> "Bakes" the spawn offset (JD/RT) set in the maps info.dat, into every notes custom data individually.
    - This is done to prevent random jumpscares casued by things like JDFixer when used in a map with note animations
- NJS -> Same thing as above, but with NJS fixer.
- NJS and Offset values are typically chosen based on the information provided in the info.dat file (what you set for the dif in Chromapper)
- Scale -> Forces all notes to be the same default size, overriding user settings from mods like "BeatSaber+" and "Adaptable Notes"
    - This is to prevent issues where players would have small notes, but then as soon as the map sets the notes scale to the default "1", those notes randomly become MASSIVE
    - The scale is forced by giving all notes a "track" name, then creating an "AnimateTrack" event at the very start of the map to set their scale. That track name is logged just in case you ever decided to go looking for that event and need to change something about it.

For every item listed above, the script will typically pull the data from the `info.dat` (what you set for the specific difficulty in Chromapper). 
However, if you would like to override this, you can head over to the "SETUP" region of the script and adjust the values there under the "CringeFix" options. 

Simply replace "true" with any value of your choice, or set it to "false" for the default, non-forced behaviour.
- `ForceNJS`  = true / false / int 
- `ForceJD`   = true / false / int -> (int value = "Start Beat Offset")
- `ForceNoteScale` & `ForceBombScale` =  true / false / int / array
    - You can either set a single value of "1" to uniformly scale everything like a normal sane person... or if you're feeling a little *quirky*, you can input an array to individually set the `[x, y, z]` scaling values of every object.

![image](https://github.com/user-attachments/assets/9fd3f498-bc5f-4c11-a27c-1f526e39f40a)

***YIPPIEE!!!!!***
You ran the script and did some Noodle stuff without things exploding!
*(if things did explode... uhhh... dm me on Discord and I'll see if I can help you out lmao)*

...but I'm assuming you actually wanted to try doing something cool, so let's go over how to do that

## Usage - HOW TO MAKE COOL SHIT - Basics of Note Filtering and Functions

I'm going to try and be a little quicker with this one as a lot of the yapping is already written out in each sections comments, and I also have a VERY similar example of how everything works together from this map here: [Script from my map "FUN"](https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/e1cfa1e6fa5fd24508e94c0dfd71465c15f9e1f8/FUN/FunV3.js#L1253)

Before we dive into this, let's right click on the tab for our script at the top and hit the "Split Right" option. This makes things a lot easier to work with as you now have one window for working, and another for looking things up.

![image](https://github.com/user-attachments/assets/fa143a08-369a-4e5a-9cea-cdb40b0d4570)
 

### Note Filtering:
Note filtering is easily the most common thing you'll be doing with this script, and Noodle in general. It's the process of sampling notes, and telling the script what changes you want to make to them specifically.

To do this, use the right window we opened up, and head over to the `"Copy/Paste Glossary"` region, highlight the `--filtering` search term, and then hit `CTRL+F` to search for it.
- If it doesn't default to the correct spot, then just hit the up arrow in the search box on the top left

![image](https://github.com/user-attachments/assets/58a89819-7afc-4f9d-a828-bfc257ebffd2)

This will bring you to the relevant section with the copy/pasta needed to filter for notes and stuff. Copy the section of code that filters for notes in between two beats, and then paste it below into the "DO YOUR DIRTY WORK HERE" section

![image](https://github.com/user-attachments/assets/d709aced-8b0e-474f-9210-3b4198759365)

**For a quick breakdown of everything, let's go line by line looking at the screenshot below, and comparing to the final output on the right:**
1. Filters for notes with a "beat" or `"b"` value *greater than or equal to* `>=` 69, *and* `&&` a `"b"` value *less than or equal to* `<=` 420
    - The data for these notes is stored under the variable name "filteredNotes" -> `filteredNotes = (whatever this stuff is)`
2. *For each* object saved under that variable name `filteredNotes`, we're going to name it `note`, and do *this* with it *(line break)*
    - The term "object" describes anything contained within `{}`
    - Example: With the note data that you see in the right window, each note between the blue `{}` is called an "object"
3. Goes into the newly created note object `note.`, then into the customData object `customData.`, creates `noteJumpMovementSpeed`, and then assigns that a value of `420`
4. Does the same thing as above, but this time it creates a property for `noteJumpStartBeatOffset` and assigns that a value of `69`

![image](https://github.com/user-attachments/assets/3882580a-61e4-4724-a12e-2dd90fc08275)

There's a whole list of other properties both static, and animated that can be used with this besides just NJS and Offset changes. You can find these by just digging through the copy/paste section, or using the glossary, same as you did before.

### Basic Note Animations:
For now, let's just dig up the options for:
- Disabling the jump animation -> `note.customData.disableNoteGravity = true;`
- Creating an "animation" object in a note -> `note.customData.animation = {}`
- Dissolving a notes arrow -> `note.customData.animation.dissolveArrow = [[0,0], [1,0.5]];`

![image](https://github.com/user-attachments/assets/10cde72c-0782-49b1-b7e8-227677ba8ec1)

Going off of what we did before, each of these new lines follows the same concept. The only difference is that this time we had to create the "animation" object first, before we were able to put a new property in there.

Had we not put that animation object in there before trying to add something to it, the terminal would have given us an error similar to this:
- Note that the error message tells you exactly what the error is: `Cannot set properties of undefined`, and exactly which line it happened on: `3602`
- Knowing how to find and use this information will save you countless hours of time scrambling through various Discord help channels!

![image](https://github.com/user-attachments/assets/0de60ec2-b570-40ea-9d97-c7335f4855f4)

Currently, this dissolve is working backwards. It's starting at `0` (fully invsible) at time `0`, then transitioning to fully visible `1` at time `0.5` (exactly on beat).

We need to flip this so that the note spawns in with arrow fully visible (at time 0), and then midway through the notes life becomes invisible, before the player has a chance to read it.

To do this properly, we need to understand how the timing here works. The last value of each "keyframe" in that animation represents a point in the notes lifetime, from spawn to despawn.

Here's a list of these timings, and how they relate to the jump animation:
```
Context:
- Before 0 = note is flying in crazy fast from the distance, and is always a down note, on the bottom row
- Doubles will always spawn with blur on right, red on left
- Stacks/towers will spawn as a stack, but as close to the bottom as possible.

  0     = Note starts jump -> Spawn light flashes -> (this is the point where reaction time is usually calculated)
  0.125 = Note finishes rotating into correct cut direction
  0.25  = "Flip" animation has completed -> Known as the "half jump" -> Final "true" reaction time value (half of calculated)
  0.5   = Exactly on beat -> Anything past 0.5 is counted as a miss -> Make sure the player can hit note before this!!!!
  0.75  = Note speeds up -> Arrow despawns
  1     = Note is kill -> :'(

Fun fact: "0" is locked to world position and is known as the Jump Distance or "JD"
          "0.5" is directly under the players headset, and moves back and fourth with the player.
          "0.5000001" is a missed note.

Please remember that the player has arms in front of them, is holding 1m long sabers, the notes hitbox is twice as long as the note, and the player still needs time to process/react to those incoming notes!
```
![image](https://github.com/user-attachments/assets/f0f2f4e9-09d4-45f4-a778-5a3ad2446498)

With that knowledge bomb dropped, lets try to change up this animation to be more fitting.

**We know that:**
- Arrow should be relatively visible until the note has rotated into place at `0.125`
- We want the note invsible before it hits the player at `0.5`
- The final "reaction time" zone is at `0.25`

With that in mind lets change up the animation to be something like this:
```js
note.customData.animation.dissolveArrow = [[1, 0.125], [0, 0.375, "easeInOutCubic"]];
```
**This animation:**
- Spawns the arrow in fully *visible* `1`, and keeps it there until the `0.125` point in it's life
- In the second keyframe, has the arrow fully invisible `0`, at the `0.375` point.
- Uses an "InOut" style [easing](https://easings.net/) on the animation, so the peak speed of this animation happens at time `0.25` (aka the half jump)

I specifically chose the height of the animation to happen at `0.25` because the notes jump animation is directly synced to the songs BPM, offset, and "half jump duration".

If you have a note placed on every whole beat, and a "start beat offset" of 0, then that note will start it's jump animation exactly on beat and in sync with the songs BPM, as if it were a metronome. This means that the notes lifetime point of `0.25` will sync up exactly with every half beat! This is a very subtle thing that's not immediately noticeable, but ultimately leads to ***extremely*** satisfying note animations and easily reduces a lot of the "jank" that people typically feel when playing modcharts.
- Also, since I'm dumb and can't ever remember these values off the top of my head, [here's a handy little chart that I use with everything already laid out!](http://www.cleavebooks.co.uk/scol/equivf.htm)

Let's take a look at the final bit of code with some more reasonable values entered in for everything:

![image](https://github.com/user-attachments/assets/1e1c03ba-de31-4156-8b5a-85daf1ce1491)

As you can see above, the script ran correctly and all the info was properly spat out into the output file.

Most of the modcharting process while using this script will all be things similar to this. 
- Just copy the thing, paste it down, and adjust it to do what you need to do.

I ***highly*** recommend taking a read through the rest of the copy/paste stuff and reading through the comments to figure out what each thing does after you're done here!

## Usage - Using Functions for Common Repeat Tasks
Another thing worth mentioning is the use of **"Functions"**

Functions are kind of like "preset", but for code.

You start by giving the function a name, and a list of variables that can mean pretty much anything. Then inside the function you write all the code as you normally would, but then instead of writing in exact numbers and stuff directly, you instead replace those numbers with the variables written above. This lets you simply write out the function time, and then a few numbers, instead of having to re-write dozens of lines of code over and over again, just to change a couple values.

I've made a whole bunch of these in the script that you can find in the "List of Available Functions" region:

![image](https://github.com/user-attachments/assets/85c89b96-f1ba-4005-bcd5-493917064780)

To use them, simply copy/paste the one you want to use, and replace the variables with whatever values you want!

The example below grabs a bunch of notes in between beats 69 and 420, and assigns them a "track" based on their cut direction, and original input track name. Assuming no errors, the info for these generated track names are shown in the log below:

![image](https://github.com/user-attachments/assets/15163d7c-1fd2-4aee-9fb2-f43bdd19281a)

# ADVANCED STUFF

There's so much else here that I could actually stay up all night typing things out, but I'll jsut save that for when I actually work on the wiki.

In the mean time, [check out my video where I go over litrally every animation type used in Noodle, and when/how to use it](https://www.youtube.com/watch?v=nMHaPJ8o-Jk) (I'm specifically using this style of script btw)

[And my older examples of maps that have animations built using this same style of script.](https://github.com/Mawntee/BS-Modchart-Mapping-Files/blob/e1cfa1e6fa5fd24508e94c0dfd71465c15f9e1f8/FUN/FunV3.js#L1253)


If you're still reading this far... *omgthankyousomuchijustreallywanttoseepeoplemakingcoolstuffandstartplayingwithfunnynotegimmicksagainahhhh!!!!!!!!*

# AGAIN, IF YOU EVER HAVE ANY ISSUES MY DISCORD DM'S ARE ALWAYS OPEN FOR HELP WITH NOODLE STUFF!!!!!
