# Buncha random links that I have bookmarked, and consistently go back reference in just about every map that I make.

### Documentation:
- [Heck - Main](https://github.com/Aeroluna/Heck/wiki/) - Main documentation hub for everything related to the Heck suite of mods
- [BSMG Intermediate Mapping Guide](https://bsmg.wiki/mapping/intermediate-mapping.html) - Might seem redundant, but covers a lot of concepts that only get emphasized when creating notemods with Noodle. Everyone, please check this out.
- [Map Formatting](https://bsmg.wiki/mapping/map-format/beatmap.html) - Breakdown of what all the funny letters mean in a maps difficulty file
- [Chroma Logs](https://github.com/UGEcko/Chroodle/tree/main/ChromaLogs) - List of regex lookups for environment objects from the Chroma output logs.
- [Video: My Chromapper/PropEdit guide](https://www.youtube.com/watch?v=FXcnebgOLpA) - Shows how to setup the plugin, and every single non-animation Noodle related feature you can do in Chromapper w/o requiring any scripting
- [Video: Chromapper/PropEdit - Merged notes](https://www.youtube.com/watch?v=76GHNW0ybo8) - First minute covers basic path animations directly on objects (useful for DA/GN type effects) - Otherwise, it's a slightly niche gameplay gimmick
- [Video: Heck Animation Overview](https://www.youtube.com/watch?v=nMHaPJ8o-Jk) - Slightly rough video, but this covers every style of animation possible with Noodle/Chroma w/ examples. 
Please, **Please** watch this last one before starting **any** animation project with Noodle or Chroma! Then come back to revist after getting somewhat familiar with animations. Thanks in advance <333

### Helpful Tools & References:
- [Equivalent Fractions Table](http://www.cleavebooks.co.uk/scol/equivf.htm) - EXTREMELY useful for timing and syncing [path animations](https://github.com/Aeroluna/Heck/wiki/Animation#assignpathanimation) along with the the games base jump animations/bpm.
- [Easings Examples](https://easings.net/) - Showcase of many available easing types -> only ones missing are "easeStep" (sudden snap from A to B) and "easeLinear" (relatively useless / is the default animation type when left undefined)
- [Kivals Mapping Utility](https://kivalevan.me/BeatSaber-MappingUtility/) - I mostly use this for the NJS calculator, but it has many other tools such as: Effective BPM & Time Precision, Color Picker/Exporter, Score Calculator, Diff SPS Difference, In-game Diff Label Generator, and a Random Pattern Generator
- [Swifter's ReMapper](https://github.com/Swifter1243/ReMapper) - An INSANELY overpowered and over engineered framework for working with the Heck suite. Has a simplified sytanx, plenty of utilities and functions mostly based around Chroma and environment effects, including a Blender static/animation scene exporter.
  - I HIGHLY recommend this for anyone focusing more on visuals vs. notemod effects. It requires some *minimal* coding expreience, and can be *slightly* difficult to debug due to differing syntax, but it's where I push most people to when they ask how to make these things!

### Map/Script examples.
NOTE: Most of these are old V2 and outdated, but many of the concepts (other than fake notes/syntax) still apply to modern modcharting.
      For any of my charts, look for a region titled: "Do your dirty work here" (usually near the bottom, after the helper functions region) in the '.js' file for the actual bits whcih create the animations/map effects.
Personal:
- [v2] [Small Shock](https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main/Small%20shock) - Extremely basic note scale example -> [Beatsaver link](https://beatsaver.com/maps/10636)
- [v2] [How Low Can You Smash, Bro?](https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main/How%20Low%20Can%20You%20Smash%20Bro) - Random assortment of basic note animations -> [Beatsaver link](https://beatsaver.com/maps/10583)
- [v2] [C18H27NO3](https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main/C18H27NO3) - More complex, and effect diverse map -> [Beatsaver link](https://beatsaver.com/maps/17d7e) | [Video](https://www.youtube.com/watch?v=5xA3iR5v-Rk)
- [V3] [Fun!](https://github.com/Mawntee/BS-Modchart-Mapping-Files/tree/main/FUN) - First V3 modchart, very simplistic notemods, njs changes, and arc strobing/flickering effects.
Other Mappers:
- [Swifter](https://github.com/Swifter1243/MapScripts) - TS -> Collection of previous open source map scripts, mostly using his ReMapper framework
- [StormPacer](https://github.com/StormPacer/Noodle-Maps) - JS
- [Jevk](https://github.com/Jevk/JevkMaps) - JS -> all outdated V2, but still could be a decent ref
- [Totally Balloon](https://github.com/Infinit3/le-monke-maps) - TS -> Has a few Blender examples in there as well!
- [TzurS11](https://github.com/TzurS11/NoodleScript/tree/main/Examples/Scripts) - JS -> all outdated V2/ScuffedWalls, but still could be a decent ref

### Discord Servers:
- [Heck](https://discord.gg/rrZf3kapeh)
- [Beat Saber Mapping](https://discord.gg/ArT4BTQ)
- [Beat Saber Modding Group](https://discord.gg/beatsabermods)
- [My Personal Server](https://discord.gg/3P9HzE33)
