+++
title = "How to use VSCode to make Anki cards easily"
description = "Learn how to create Anki cards to learn programming, easily and quickly with VSCode"
date = 2022-04-30

[extra]
seo_title = "How to use VSCode to make Anki cards easily - Luis Martinez Web Developer"
featured_image = "cover-beautiful-render-card-deck.webp"
show_featured_image = true
+++

## Why a new post about Anki?

For the past years I've used Anki to learn programming effectively.

Since I became a web developer, I've added a few tools to my arsenal. So I thought about leveraging them to ease (and improve!) the creation of Anki cards.

Can I create new cards and add them to my deck faster? Can I make the code in the cards look nicer? Can I create the cards with my favorite text editor, VSCode? Can I ...?

![The answer is yes](/blog/anki-vscode/jotaro-yes.webp)

The answer is yes, yes and yes.

Let me show you what I found.

## How will it work?

We're going to connect our favorite text editor (*cough*) VSCode (*cough*) to Anki, as we will use it to create new cards. Why? Because with VSCode we can:

- Auto-format code
- Use snippets to create cards more quickly
- Use extensions that do some of the work for us

We will write our cards in a markdown file in VSCode, then we will run a command that adds the cards to our Anki deck. Simple, yet powerful.

## Install the stuff you need

### Install Anki desktop app (and setup an account)

First of all, if you didn't use Anki before, create an account here: [https://Ankiweb.net](https://Ankiweb.net)

You will use the same credentials to login in the Anki desktop app, and in the mobile app if you use it. The mobile app is optional but recommended since it's much more comfortable to study Anki on the phone.

Next, install the Anki desktop app: Go here [https://apps.Ankiweb.net](https://apps.Ankiweb.net) and click on the download button, then install the app for your operative system.

### In the Anki desktop app, install the addon AnkiConnect

The add-on AnkiConnect will *automagically* transfer Anki cards from VSCode to Anki.

Open the Anki app, and go to `Tools > Add-ons`.

Click on the Get Add-ons button, paste the code `2055492159` in the input and click ok. You should see AnkiConnect added to the list of add-ons

![Install AnkiConnect add-on](/blog/anki-vscode/install-ankiconnect-addon.webp)

> [!NOTE]
> If the code is wrong for whatever reason, you can get it from here: [https://Ankiweb.net/shared/info/2055492159](https://Ankiweb.net/shared/info/2055492159), or googling for AnkiConnect.

### Install VSCode

If you don't have VSCode installed, you will need to do so. Go here and do the thing [https://code.visualstudio.com](https://code.visualstudio.com)

## Download my repo

I've created a repo with everything configured so that you can just go and create cards in a breeze.

Download it from here: [https://github.com/luismartinezs/Anki](https://github.com/luismartinezs/Anki)

(click on the green "code" button)

If you use `git`, clone the project. If you don't (why not?), just download the zip file into your computer and unzip it. Then, open the project folder with VSCode.

> [!NOTE]
> When you open the project with VSCode, you might be prompted to install the recommended extensions. Accept it! If you don't receive that prompt, make sure you have the extensions that you need installed. The extensions needed are listed in `.vscode > extensions.json`

## Create new cards

In the repo there is a `README.md` file with a detailed explanation, you can read it but I'll give you here the short version so you get into creating cards quickly.

Follow me here.

Open the file `Anki.md`.

Type a `#` followed by the name of the Anki deck where you want to add your cards, e.g. `# My Dev Deck`.

![New Anki deck title](/blog/anki-vscode/new-deck-title.webp)

### Add cards with no code

To add a card, add two empty lines, and in the second one just type `anki`.

You should see two options.

Choose `anki-new-card` to add a card with no code.

![New card template](/blog/anki-vscode/new-card-template.webp)

The cursor will automatically position itself in the "front" so just write down the front part of the card (e.g. What is the programming language of the web?).

If you hit the `tab` key, the cursor will move to the "back". Write it down (e.g. JavaScript).

Then the `tab` key again will highlight the tag. Fill it up (e.g. js)

![Sample card](/blog/anki-vscode/sample-card.webp)

You can add multiple tags like so: `[#tag-1]() [#tag-2]()`. Mind the `#` symbol before the tag.

> [!NOTE]
> Leave a space in between tags! Otherwise, you'll get one single ugly-looking tag like `tag-1()[#tag-2]()`...

### Add cards with code blocks

If you want to have code in your card, add two more empty lines, type `anki` and select `anki-new-card-wth-code`.

You will see this:

![Anki card with code](/blog/anki-vscode/anki-card-with-code.webp)

The triple \` marks the start and end of a code block. In Anki, this will be replaced by a block of code. Syntax highlighting --fancy colors that make the code readable, also works!

Type the short label for the language, e.g. `html`, `css`, `js`, `ts`, etc. That will act as a tag too.

Hit tab to highlight the front, then the back. You got it. Or feel free to edit the text normally.

After creating your cards with and without code, you could end up with something like this, for example:

![Anki cards full example 1](/blog/anki-vscode/anki-cards-full-example-1.webp)

![Anki cards full example 2](/blog/anki-vscode/anki-cards-full-example-2.webp)

Obviously, it is possible to have a code block only in the front or only in the back.

## Auto-format the cards

Go to `View > Command Palette...` and type "format", then select `Format Document`. Or use the shortcut `Ctrl+Shift+I` (Linux, Windows). That should minimize the length of each line so that it fits the card on mobile.

> [!NOTE]
> Leave an empty line in between each part of the card, so that auto-formatting doesn't think they belong to the same paragraph and wrap them together.

## Add the new cards to your Anki deck

Almost done! You have your `Anki.md` file with the cards you want to add to your deck. In the first line, after the `#`, you wrote the name of your deck (if it doesn't exist, Anki will create it).

Open the Anki desktop app, if it isn't open already.

Go back to VSCode and open the command palette (`ctrl+shift+P`), or `View > Command Palette...`

Then, type `Anki`, and select `Send to own Deck`. The new cards should show up in your deck, and the code blocks should look nicely!

> [!NOTE]
> If you get an error like this: `connect ECONNREFUSED 127.0.0.1:8765`, try to restart the Anki app

Happy studying!

## References

- Read the `README.md` file in my repo [https://github.com/luismartinezs/anki](https://github.com/luismartinezs/anki)
- Read the documentation of the Anki VSCode extension [https://github.com/jasonwilliams/Anki](https://github.com/jasonwilliams/Anki)
