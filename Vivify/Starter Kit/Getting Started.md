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
