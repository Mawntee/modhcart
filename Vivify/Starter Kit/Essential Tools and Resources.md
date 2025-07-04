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

**[hfcRed's Animation Repathing](https://github.com/Thryrallo/VRC-Avatar-Performance-Tools)** `[Recommended]` <br>
>Tool that automates repathing for animation clips as you shuffle things around in the hierarchy
>- *I can't stress how much of a life saver this one is for working on Vivify maps omfg*

**[~~Deadrith's~~ OpenVRCTools Scripts](https://github.com/Dreadrith)** `[Recommended]` <br>
> Many small but incredibly useful tools and changes that honestly should be included with the Unity Editor <br>
>- [MOVED HERE TO THIS VCC LISTING](https://openvrctools.github.io/VPMRepo/) - Click the three dots beside each item and "Download as Zip"
>- ~~[HierarchyPlus](https://github.com/Dreadrith/HierarchyPlus)~~ - *Hierarchy window improvements such as component icons, guide lines, row coloring, and customization settings* <br>
>- ~~[Smart Hierarchy](https://github.com/Dreadrith/Smart-Hierarchy)~~ - *Even more improvements to the Hierarchy window* <br>
>- ~~[Texture Utility](https://github.com/Dreadrith/Unity_TextureUtility)~~ - *Tool for common/basic texture edits and texture packing* <br>
>- ~~[Copy/Cut/Paste](https://github.com/Dreadrith/Unity_CopyCutPaste)~~ - *Adds in the basic options of copy/cut/paste that are missing for some stupid reason* <br>
>- ~~[Animation Hierarchy Editor](https://github.com/Dreadrith/Unity-Animation-Hierarchy-Editor)~~ - *Easily refactor hierarchy of animation clips*

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
