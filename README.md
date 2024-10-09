<sub>[Github site](https://github.com/Smoosic/smoosic) | [change notes](https://smoosic.github.io/Smoosic/changes.html) | [application](https://smoosic.github.io/Smoosic/release/html/smoosic.html)<sub> 

![](https://imgur.com/jJ5utJm.gif)
# Build from source
To build, use `npm run build`.  Grunt is no longer required.

# What is Smoosic?
Smoosic is a music notation that runs in a web browser.  It supports the following features.

* scores with part extraction
* playback with instruments and samples
* real-time editing, even for large scores
* MIDI and MusicXML import and export.
* dynamic music library with links to scores, tags etc.  Inspired by iRealPro app 'ireal' format
* library mode for custom applications

Smoosic is highly dependent on the [Vexflow engraving library](https://github.com/0xfe/vexflow), although we currently use 
[our own branch at ](https://github.com/Smoosic/vexflow_smoosic).

See [changes](https://smoosic.github.io/Smoosic/changes.md) for changes, updates, initiatives etc.

There is a [demo application](https://smoosic.github.io/Smoosic/release/html/smoosic.html) that you can play around with that shows the capabilities.

## What's new in Smoosic?
This is a completely new Github project.  It contains 5 repositories (so far):

1. [vexflow_smoosic](https://github.com/Smoosic/vexflow_smoosic) repository contains the vexflow engraving library described above.
2. [SmoSounds](https://github.com/Smoosic/SmoSounds) library contains .mp3 samples used for audio playback.
3. [Smoosic](https://github.com/Smoosic/Smoosic) library is the source code for the application and associated library.
4. [SmoSchema](https://github.com/Smoosic/SmoSchema) contains the definition of the Serializable Music Objects that Smoosic 
uses to persist files. 
5. [Demos](https://github.com/Smoosic/Demos) is currently empty, but will contain libraries that show how to use Smoosic as a dependency for your own projects, and will also contain unit test files. 

## I'd like to help
I'd appreciate it!  Even if you are not a programmer, if you are interested in music and this project, you can contribute.

I am working on a Github project with associated issues.  Many of the issues involve programming, but not all.  If you find an issue that 
interests you, you can ask to join the Smoosic organization and submit a pull request.





 
