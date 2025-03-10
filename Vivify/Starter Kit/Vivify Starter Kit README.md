# Mawntee's Vivify Starter Kit™
### If it's your first time here, skip on over to the "Getting Started" section!

## What is this?
This is a list of resources I frequently use when creating Vivify maps, and a slightly more in-depth version of the [official Heck documentation](https://heck.aeroluna.dev/vivify/getting-started-with-vivify/). <br>
I'm also including instructions for some tools that I think are essential to have/use, as well as instructions for some common questions and/or things that might not be so obvious to first timers. <br>

If you find yourself often coming back here to look up something sepcific (CTRL+F btw), are thinking that something written here is a bit too vague and should be expanded on, or if you have a bit of knowledge that you think is important enough to have it's own dedicated section here, shoot me a DM on Discord `@Mawntee` and I'll add it in as it's own unique part :)
<br>


## Useful Tools and Resources
In no particular order, here's a list of common things I use in just about every Vivify/Unity project:
<br>

### KNOWLEDGE DUMPS:
#### Important and/or otherwise niche info surrounding Vivify, asset creation for Beat Saber, or VR/Unity in general

<br>

**[CNLohr's Shadertrixx](https://github.com/cnlohr/shadertrixx)** <br>
>Massive knowledge dump of VR specific Unity tricks, mostly surrounding shaders and asset bundle cheeses <br>

**[Pema99's Shader knowledge](https://github.com/pema99/shader-knowledge)** <br>
>Even more obscure Unity VR and VRChat specific shader knowledge

**[Awesome Opensource Unity](https://github.com/StefanoCecere/awesome-opensource-unity)** <br>
>A metric f*ckton of unity packages, assets, and articles for tips/good practices!

**[PasteBin of Beat Saber's global properties ](https://pastebin.com/XKmuwJZz)**
>Dump of every shader property that (might) possibly be set or controlled through outside scripts and what shader it's found in. <br>
>Try to avoid using these as uniform properties in your own shaders if you run in to weird issues that seem out of your control
>>*...or you attempt to abuse them with Vivify by using events such as "[SetGlobalProperty](https://heck.aeroluna.dev/vivify/events/#setglobalproperty)" ;)*

**Frick it I'm not typing descriptions anymore. Here's a bunch more shit with descriptive enough titles lol** <br>
> [Unity shader fundamentals](https://docs.unity3d.com/Manual/SL-VertexFragmentShaderExamples.html) <br>
> [Quick reference for HLSL](https://developer.download.nvidia.com/cg/index_stdlib.html) <br>
> [Unity's built-in shader variables](https://docs.unity3d.com/Manual/SL-UnityShaderVariables.html) <br>
> [The common built-in header for unity-provided functions](https://github.com/TwoTailsGames/Unity-Built-in-Shaders/blob/master/CGIncludes/UnityCG.cginc) <br>
> [Defining parameters for your shader/material](https://docs.unity3d.com/Manual/SL-Properties.html) <br>
> [Unity surface shader examples](https://docs.unity3d.com/Manual/SL-SurfaceShaderExamples.html) <br>
> [List of intrinsic functions](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions) <br>
> [List of all pragmas that you can use in shaders. Become familiar with these!](https://docs.unity3d.com/Manual/SL-PragmaDirectives.html)

<br>

### ASSETS: 
#### List of essential or incredibly useful assets for Beat Saber, VRChat, and general Unity/VR use.
_Assume all assets are free unless marked with_ `[P]`

>Note: Most assets will likely require some kind of conversion to be used in Beat Saber. <br>
>
>This is usually just something simple like setting the output alpha to 0, or adding `ColorMask RGB` to your SubShader. <br>
>(if you go in-game and see that you just got flashbanged and everything is blindingly white, this is what i'm talking about lmao)

<br>

**[Swifter's Vivify Template](https://github.com/Swifter1243/VivifyTemplate)** `[ESSENTIAL]`
>Automatically handles:
>- Project setup and bundle exporting for all PC/Quest versions from a single project, <br> 
>- Render layer standardization following ([CameraUtils](https://github.com/Reezonate/CameraUtils)) <br>
>- Various other utilities & examples <br>

**[Swifter's ReMapper](https://github.com/Swifter1243/ReMapper)** `[Recommended]` <br>
> Extremely powerful and over-engineered Typescript framework for creating Chroma/Noodle/Vivify charts. <br>
>
> *This is my recommended upgrade from my modchart template for anyone that's even mildy comfortable with Heck and/or coding in JS*

**[Unity Animation Window](https://github.com/Swifter1243/UnityAnimationWindow)** `[Recommended]` <br>
>Better animation window featuring bugfixes, missing features, and audio timing tools

**[Poiyomi's Shaders](https://www.poiyomi.com/)** `[Recommended]`<br>
>Currently the only general shader package with full Beat Saber lighting, bloom, and fog support, as well as AudioLink.
>*"Pro" version available for [Patreon supporters](https://www.patreon.com/c/Poiyomi)* `[P]`
>>***IMPORTANT:** Remember to lock-in your optimized shader versions!* <br> *Using this shader outside of VRC will **not** automatically lock in materials on export!*

**[Beat Saber Shader Tools](https://github.com/whatdahopper/BeatSaberShaderTools)** <br>
>.cginc to allow custom shaders to interact with Beat Saber's custom bloomfog and lighting system

**[Shadeview 2.0](https://github.com/ovsky/shadeview-2.0)** `[Recommended]`<br>
>Visual Studio Code plugin to allow full support for GLSL, HLSL, ShaderLab, and Compute Shaders all within the VSC IDE

**[Beat Saber AudioLink](https://github.com/Aeroluna/BSAudioLink)** <br>
>Lets your shaders react to the in-game music, as well as a buttload of other very useful shader features!
>- *[Modified UnityPackage available in release 1.0.0](https://github.com/Aeroluna/BSAudioLink/releases/tag/v1.0.0)* w/ [setup video](https://streamable.com/0rslbg)
>- *[Documentation for shader creators](https://github.com/llealloo/audiolink/tree/master/Docs)*
>>Note: *No Udon support - Currently only support for texture/cginc features, excluding global strings and media states <br> (media states can be set through Heck modifier bases)* 

**[Deadrith's Scripts](https://github.com/Dreadrith)** `[Recommended]` <br>
> Many small but incredibly useful tools and changes that honestly shoudl be included with the Unity Editor <br>
>- [HierarchyPlus](https://github.com/Dreadrith/HierarchyPlus) - *Hierarchy window improvements such as component icons, guide lines, row coloring, and customization settings* <br>
>- [Smart Hierarchy](https://github.com/Dreadrith/Smart-Hierarchy) - *Even more improvements to the Hierarchy window* <br>
>- [Texture Utility](https://github.com/Dreadrith/Unity_TextureUtility) - *Tool for common/basic texture edits and texture packing* <br>
>- [Copy/Cut/Paste](https://github.com/Dreadrith/Unity_CopyCutPaste) - *Adds in the basic options of copy/cut/paste that are missing for some stupid reason* <br>
>- [Animation Hierarchy Editor](https://github.com/Dreadrith/Unity-Animation-Hierarchy-Editor) - *Easily refactor hierarchy of animation clips*

**[Thry's Avatar Performance Tools](https://github.com/Thryrallo/VRC-Avatar-Performance-Tools)** `[Recommended]` <br>
>Tool to view texture/mesh size, VRAM usage, and easily compress/reformat all textures in a prefab
>- *Designed for VRC, but can be used anywhere. Navigate to `Thry` -> `Avatar` -> `VRAM`. In the pop-up, drop in your prefabs root Game Object*

**[Curve Master](https://assetstore.unity.com/packages/tools/animation/curve-master-252505)** <br>
>`[P]` Better keyframe editing & manipulation for people used to animation curves in other software such as Blender or After Effects <br>

**[opengameart.org](https://opengameart.org/)** <br>
>Large collection of free game assets. A few of which I feel are essential and have in all of my projects: <br>
>- [Noise Textures](https://opengameart.org/content/noise-texture-pack) <br>
>- [Gradient Textures](https://opengameart.org/content/gradient-texture-pack)

**[Unity AutoSave](https://github.com/aniruddhahar/Unity-Autosave)** <br>
>Pretty self explanatory

**[Stereo Cancer](https://github.com/xwidghet/StereoCancer)** <br>
>Open source post processing effects designed for VR use
>NOTE: These effects require the use of a GrabPass and possibly depth maps which are both EXPENSIVE and can easily DROP FPS! <br>
> PLEASE consider converting individual effects for use with Vivify [Blit Events](https://heck.aeroluna.dev/vivify/events/#blit), or asking someone that knows how!

**[Cancer Space](https://github.com/AkaiMage/VRC-Cancerspace)** <br>
>Same as above ^
>*(same warnings as above too)*

**[Netri's Unity Shaders](https://github.com/netri/Neitri-Unity-Shaders)** <br>
>Collection of shaders designed for Unity3D and VRChat.

**[Mesh Combiner](https://assetstore.unity.com/packages/tools/modeling/mesh-combiner-157192)** `[Recommended]` <br>
>Having many unique mesh renderes with their own material slots in your scene is LAGGY!!!! <br>
>Use this to combine multiple mesh's that share the same material to save on FPS and file size :)

**[ProBuilder](https://unity-technologies.github.io/procore-legacy-docs/probuilder/probuilder2-gh-pages/)** <br>
>Utility for modeling things directly within Unity instead of having to export from Blender <br>
>[[video guide](https://www.youtube.com/watch?v=a8JOk8nuK0k)]

<br>

# Getting Started
## Creating The Project:

**If you haven't already, install [Unity Hub](https://unity.com/download), as well as the LTS Editor versions:** <br>
[2019.4.28f1](https://unity.com/releases/editor/whats-new/2019.4.28#installs) (PC - Steam/Quest Link) <br>
[2021.3.16f1](https://unity.com/releases/editor/whats-new/2021.3.16) (Android - Quest Standalone) <br>
> A Unity 2021 install is required for Quest due to bugs in Unity 2019 that prevent properly building asset bundles.

**Once installed, select the drop down from the top for Unity version "2019.4.28f1"**:
![image](https://github.com/user-attachments/assets/54c0bb90-e72f-44ac-9fc6-a3e757e23fb3) <br>
> We use this version because as it's not possible to build with backwards compatibility from 2021 (game versions beyond 1.29.1), <br>
> however, it is possible to build with *forwards* compatibility from Unity 2019 (OpenVR) to Unity 2021 (OpenXR).

**From here, select "3D", give your project a name, set a destination folder, and hit "Create Project":** <br>
I personally prefer to keep my project inside the map folder (alongside the info.dat and difficulty files) for simplicity. <br>
![image](https://github.com/user-attachments/assets/f255af8b-6919-414b-a451-18881fe8a397) <br>

**While you're waiting for that to marinate, head over to Swifter's GitHub and yoink the latest release of his Viviy Template from the `"Releases"` section on the right:**
![image](https://github.com/user-attachments/assets/f03931ab-d01d-48d3-b493-2e3e2f8f6635) <br>

**Once the `.UnityPackage` file is downloaded, you can import it into Unity:** <br>
To do this you can either drag the file directly into the assets folder in your Project browser on the bottom left, <br>
or you can go to the dropdowns at the top and select `Assets` -> `Import Package` -> `Custom Package` and then find the `.UnityPackage` you just downloaded. <br>
![image](https://github.com/user-attachments/assets/0fbcb701-b4c0-469b-af3e-af5f4ce9c513) <br>

<br>
<br>
<br>
<br>
<br>

SHit. uhhhh.... <br>
This going to sound crazy but midway through writing this I accidnetally bit into a chicken bone and half my permanent retainer popped out. <br>
I'm gunna stop writing properly here and kidna speedrun the rest lmao <br>

<br>
<br>
<br>
<br>
<br>

### TLDR for the rest:

Hit the Vivify Drop down, then slap that "setup project" button. Let it do it's thing. <br>
![image](https://github.com/user-attachments/assets/1e087a80-7f23-4ddd-9e70-d0397c222d54)<br>

If it throws a single red error in the console about Blender and FBX's or whatever, just ignore that and hit "clear" in the top left of the console. <br>
![image](https://github.com/user-attachments/assets/602dc66e-28aa-492a-97f5-0bf8614c1e11) <br>

Next, Go back to the Vivify drop down and open the Build -> Build Configuration Window. <br>

From here, select the versions you would like in your final export, and the current working version you're using. <br>
> 1.29.1 will select `Windows 2019`, anything past 1.29.1 will use `Windows 2021` <br>
Finally, select the output destination which should in most cases just be your map folder.

<br>

### As for some tips and actually making stuff: <br>
If you peep the top right of Unity, there's a "Render Layers" thing. Make sure you put the appropriate objects on the right layers so that the game cameras (Camera2, base game smooth cam, headset cameras, etc) don't freak tf out. <br>
![image](https://github.com/user-attachments/assets/35068501-acee-449e-a6a3-29b4ee8614ab) <br>
Check your objects for any unecessary colliders and yeet those because those mfs are expensive on performance. <br>
![image](https://github.com/user-attachments/assets/39e2261a-f577-454b-908e-3440cd57bca5) <br>

To actually make a prefab grab something from your Hierarchy on the left, then drag that hoe down somewhere into your projects Assets folder. <br>
I usually make a few subfolders that are something like `"Assets/Mawntee/Prefabs"` for my prefabs, and `"Assets/Mawntee/Materials"` for Blit materials and stuff like that. <br>
![image](https://github.com/user-attachments/assets/4aecbf2c-97d9-4b1c-b79b-f8bdeb4c022e) <br>

Once you have a prefab made, you can assign it to a bundle in the bottom of the inspector window on the right. <br>
You should just have to make a new one called "bundle", and then once that's made you can add everything else into that.
![image](https://github.com/user-attachments/assets/d8dd5a8e-cb78-4c81-b998-98707470006d)<br>
![image](https://github.com/user-attachments/assets/ac4e7f83-5cc7-42b1-82fd-5ea25fe55044) <br>

Anything from the project browser that you add to "bundle" will get exported and can be used in your map. This includes prefabs, materials, textures, audio, whatever. <br>
>Swifter has included a friendly little asset info JSON file that contains info for all the assets exported. <br>
This has your CRCs required for the info.dat, list of materials and their properties, all the paths to prefabs, textures, materials, whatever. Def check out that thing if you like saving time! 

<br>

When you're ready to build for testing, you can hit the "Vivify" drop down, "Build", and "Build Uncompressed", <br>
or you can simply just hit `F5`. 
> **IMPORTANT:** If you're using any Poiyomi materials **LOCK IN YOUR SHADERS BEFORE BUILDING, OR I WILL FIND YOU.**

<br>
<br>
<br>
<br>

uhhh I thijnk that's it! Good luck! <br>
I'll do the rest of this properly when I'm not getting stabbed in the mouth my dentistry equipment!






